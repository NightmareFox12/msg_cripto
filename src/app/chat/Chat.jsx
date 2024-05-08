'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { initContract } from '@/hooks/initContract';
import { ethers } from 'ethers';
import { sendMessage } from '@/hooks/sendMsg';
// Tengo que hacer una wea flotable que al presionar por tantos segundos aparezca para eliminar ese mensaje en especifico

export default function Chat({ ABIfile }) {
  const [inputText, setInputText] = useState('');
  const [messagesSend, setMessagesSend] = useState([]);
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [addressReceiver, setAddressReceiver] = useState('');

  const [isPressed, setIsPressed] = useState(false);
  const [pressTimer, setPressTimer] = useState(null);

  const getSignner = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signner = await provider.getSigner();
    return signner;
  };

  const handleMouseDown = () => {
    setPressTimer(
      setTimeout(() => {
        console.log('Elemento presionado por 1 segundo');
        setIsPressed(true);
      }, 800)
    );
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    clearTimeout(pressTimer);
  };

  const getAllMessages = async (address) => {
    const signner = await getSignner();

    const contract = await initContract(signner, ABIfile);
    const messages = await contract.getMessages(address);

    const messagesSends = messages[0].map((x) => x[2]);
    const messagesReceiveds = messages[1].map((x) => x[2]);

    setMessagesSend(messagesSends);
    setMessagesReceived(messagesReceiveds);
  };

  const handleSendMesagge = async () => {
    const signner = await getSignner();

    const nose = await sendMessage(
      signner,
      addressReceiver,
      inputText,
      ABIfile
    );
    console.log(nose);
    getAllMessages(addressReceiver);
    //una vez enviado tengo que irlos mostrando en la list usando getAllChats y tal
  };

  useEffect(() => {
    const address = location.search.split('=')[1];
    setAddressReceiver(address);
    getAllMessages(address);
  }, []);

  const handleText = (text) => {
    setInputText(text);
  };

  const handleKey = (key) => {
    if (key === 'Enter') {
      if (inputText.trim() !== '') {
        handleSendMesagge();
        // setMessages([...messages, { text: inputText, id: Date.now() }]);
        setInputText('');
      }
    }
  };

  const handleClick = () => {
    if (inputText.trim() !== '') {
      handleSendMesagge();
      // setMessages([...messages, { text: inputText, id: Date.now() }]);
      setInputText('');
    }
  };

  // const handleDelete = (id) => {
  //   setMessages(messages.filter((message) => message.id !== id));
  // };

  // const handleClearChat = () => {
  //   setMessages([]);
  // };

  const handleReply = (originalMessage) => {
    setInputText(`@${originalMessage.text} `);
  };

  return (
    <>
      <main className="bg-gray-100 min-h-screen pb-10">
        <header className="sticky top-0 bg-slate-600 text-white py-5 px-4 flex justify-between items-center overflow-auto">
          <h1 className="text-2xl font-semibold">Chat</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/listChat"
                  className="font-semibold text-sm hover:underline"
                >
                  Regresar
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <div className="flex flex-col gap-4 p-4 rounded-lg">
          {messagesSend.map((message, index) => (
            <motion.article
              key={index}
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="w-100 flex justify-end items-center flex-wrap"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                <div className="p-4 rounded-l-lg rounded-b-lg bg-blue-600 text-white text-wrap select-none">
                  {message}
                </div>
                <div className="flex">
                  <button
                    className="text-green-500 hover:text-green-700 focus:outline-none mr-2"
                    onClick={() => handleReply(message)}
                  >
                    {/* <FaReply /> */}
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => handleDelete(message.id)}
                  >
                    {/* <FaTrash /> */}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}

          {messagesReceived.map((message, index) => (
            <motion.article
              key={index}
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="w-100 flex items-center flex-wrap"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                <div className="p-4 rounded-l-lg rounded-b-lg bg-green-600 text-white text-wrap select-none">
                  {message}
                </div>
                <div className="flex">
                  <button
                    className="text-green-500 hover:text-green-700 focus:outline-none mr-2"
                    onClick={() => handleReply(message)}
                  >
                    {/* <FaReply /> */}
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => handleDelete(message.id)}
                  >
                    {/* <FaTrash /> */}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      <div className="flex w-full justify-center bg-slate-50 fixed bottom-0 pb-2 overflow-hidden">
        <input
          type="text"
          onChange={(e) => handleText(e.target.value)}
          onKeyDown={(e) => handleKey(e.key)}
          value={inputText}
          placeholder="Escribe tu mensaje"
          className="flex-1 rounded-md border-2 border-blue-400 px-4 py-2 text-sm text-gray-900 focus:outline-none placeholder:text-gray-400"
        />
        <motion.button
          onClick={handleClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md ml-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          whileTap={{ scale: 0.95 }}
        >
          {/* <FaPaperPlane /> */}
        </motion.button>
      </div>
    </>
  );
}
