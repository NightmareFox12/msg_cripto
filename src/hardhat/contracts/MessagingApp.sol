// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MessagingApp {

  struct Message {
    address sender;
    address receiver;
    string content;
    uint256 timestamp;
    bool isRead;
  }

  struct Profile {
    string nickname;
    uint8 idImage;
  }

  event MessageSent(
    address indexed sender,
    address indexed receiver,
    uint256 indexed messageId,
    uint256 timestamp
  );

  event MessageRead(
    address indexed sender,
    address indexed receiver,
    uint256 indexed messageId
  );

  event NotificationSent(
    address indexed receiver,
    uint256 indexed messageId,
    uint256 timestamp
  );

  mapping(address => mapping(address => Message[])) internal AllMessages;
  mapping(address => mapping(address => uint256)) internal unreadCount;
  mapping(address => mapping(address => uint256)) internal lastReadMessageId;
  mapping(address => address[]) internal chatAddressesSenders;
  mapping(address => address[]) internal chatAddressesReceivers;
  mapping(address => Profile) internal profile;

  address internal owner;

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can perform this action");
    _;
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  function sendMessage(address _receiver, string memory _text) public {
    require(msg.sender != _receiver, "Cannot send message to yourself");
    require(_receiver != address(0),"No troll!");

    // bytes32 _encryptedContent = keccak256(abi.encodePacked(_text));
    bool chatExists;

    for (uint i = 0; i < chatAddressesSenders[msg.sender].length; i++) {
      if (chatAddressesSenders[msg.sender][i] == msg.sender) {
        chatExists = true;
        break;
      }
    }

    for (uint256 i = 0; i < chatAddressesReceivers[_receiver].length; i++) {
      if (chatAddressesReceivers[_receiver][i] == msg.sender) {
        chatExists = true;
        break;
      }
    }

    if (!chatExists) {
      chatAddressesReceivers[_receiver].push(msg.sender);
      chatAddressesSenders[msg.sender].push(_receiver);
    }

    AllMessages[msg.sender][_receiver].push(
      Message({
        sender: msg.sender,
        receiver: _receiver,
        content: _text,
        timestamp: block.timestamp,
        isRead: false
      })
    );

    emit MessageSent(
      msg.sender,
      _receiver,
      AllMessages[msg.sender][_receiver].length - 1,
      block.timestamp
    );
    unreadCount[_receiver][msg.sender]++;
    // emitNotification(_receiver, messages[msg.sender][_receiver].length - 1);
  }

  function getAllChatsReceiver() public view returns (address[] memory) {
    address[] memory allChatsAddressReceivers = new address[](chatAddressesReceivers[msg.sender].length);

    for (uint i = 0; i < chatAddressesReceivers[msg.sender].length; i++) {
      allChatsAddressReceivers[i] = chatAddressesReceivers[msg.sender][i];
    }
    return allChatsAddressReceivers;
  }

  function getAllChatsSender() public view returns (address[] memory) {
    address[] memory allChatsAddressSenders = new address[](chatAddressesSenders[msg.sender].length);

    for (uint i = 0; i < chatAddressesSenders[msg.sender].length; i++) {
      allChatsAddressSenders[i] = chatAddressesSenders[msg.sender][i];
    }
    return allChatsAddressSenders;
  }

  function getMessages(address _receiver) public view returns (Message[] memory, Message[] memory) {
    require(msg.sender != _receiver, "receiver can not be yourself");
    return (AllMessages[msg.sender][_receiver],AllMessages[_receiver][msg.sender]);
  }

  function getProfile(address _address) public view returns (Profile memory) {
    return profile[_address];
  }

  function setProfile(string memory _nickname,uint8 _idImage) public {
    profile[msg.sender] = Profile(_nickname,_idImage);
  }

  // Función para marcar un mensaje como leído
  // function markMessageAsRead(
  // 	address _sender,
  // 	address _receiver,
  // 	uint256 _messageId
  // ) external isAuthenticated messageExists(_sender, _receiver, _messageId) {
  // 	require(
  // 		msg.sender == _receiver,
  // 		"Only the receiver can mark a message as read"
  // 	);
  // 	messages[_sender][_receiver][_messageId].isRead = true;
  // 	emit MessageRead(_sender, _receiver, _messageId);
  // 	unreadCount[_receiver][_sender]--;
  // 	lastReadMessageId[_sender][_receiver] = _messageId;
  // }

  // Función para obtener el número total de mensajes no leídos
  // function getUnreadCount(address _sender,address _receiver) public view returns (uint256) {
  // 	return unreadCount[_sender][_receiver];
  // }

  // Función para enviar notificación al receptor de un mensaje
  // function emitNotification(address _receiver, uint256 _messageId) private {
  // 	emit NotificationSent(_receiver, _messageId, block.timestamp);
  // }

  // 	// Función para eliminar un mensaje
  // 	function deleteMessage(
  // 		address _sender,
  // 		address _receiver,
  // 		uint256 _messageId
  // 	) external isAuthenticated messageExists(_sender, _receiver, _messageId) {
  // 		require(
  // 			msg.sender == _sender || msg.sender == _receiver,
  // 			"You are not allowed to delete this message"
  // 		);
  // 		delete messages[_sender][_receiver][_messageId];
  // 	}

  // 	// Función para obtener una lista de todos los mensajes enviados por un usuario
  // 	function getSentMessages(
  // 		address _sender,
  // 		address _receiver
  // 	) external view returns (Message[] memory) {
  // 		return messages[_sender][_receiver];
  // 	}

  // 	// Función para obtener una lista de todos los mensajes recibidos por un usuario
  // 	function getReceivedMessages(
  // 		address _sender,
  // 		address _receiver
  // 	) external view returns (Message[] memory) {
  // 		return messages[_receiver][_sender];
  // 	}

  // 	// Función para eliminar todos los mensajes de una conversación
  // 	function deleteConversation(
  // 		address _sender,
  // 		address _receiver
  // 	) external isAuthenticated {
  // 		delete messages[_sender][_receiver];
  // 		delete messages[_receiver][_sender];
  // 	}

  // Función para responder a un mensaje específico
  // function replyToMessage(address _receiver,bytes memory _encryptedContent,bytes memory _proof,uint256 _originalMessageId) external isAuthenticated {
  // 	bytes32[] memory merkleProof = new bytes32[](_proof.length / 32 + 1);

  // 	for (uint256 i = 0; i < _proof.length / 32; i++) {
  // 		bytes32 value;
  // 		assembly {
  // 			value := mload(add(_proof, add(32, mul(32, i))))
  // 		}
  // 		merkleProof[i] = value;
  // 	}

  // 	require(
  // 		MerkleProof.verify(
  // 			merkleProof,
  // 			merkleRoot,
  // 			keccak256(abi.encodePacked(_receiver, _encryptedContent))
  // 		),
  // 		"Proof verification failed"
  // 	);
  // 	require(
  // 		_originalMessageId < messages[_receiver][msg.sender].length,
  // 		"Original message does not exist"
  // 	);

  // 	// Cifrar el contenido de la respuesta con cifrado homomórfico
  // 	// Aquí se implementaría la lógica del cifrado homomórfico

  // 	messages[_receiver][msg.sender].push(
  // 		Message({
  // 			sender: msg.sender,
  // 			receiver: _receiver,
  // 			encryptedContent: _encryptedContent, // Aquí se guardaría el contenido cifrado
  // 			timestamp: block.timestamp,
  // 			isRead: false
  // 		})
  // 	);
  // 	emit MessageSent(
  // 		msg.sender,
  // 		_receiver,
  // 		messages[_receiver][msg.sender].length - 1,
  // 		block.timestamp
  // 	);
  // 	unreadCount[msg.sender][_receiver]++;
  // 	emitNotification(msg.sender,messages[_receiver][msg.sender].length - 1);
  // }
}
