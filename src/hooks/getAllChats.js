import {initContract} from './initContract';

export const getAllchats = async (signner,ABIfile) => {
  try {
    const contract = await initContract(signner,ABIfile);

    const receives = await contract.getAllChatsReceiver();
    const senders = await contract.getAllChatsSender();

    return Promise.resolve({receives,senders})

  } catch (err) {
    console.log('ocurrio un error al leer los chats', err);
  }
};