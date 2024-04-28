//cSPELL:DISABLE
import {initContract} from './initContract';

export const getAllchats = async () => {
  try {
    const contract = await initContract();

    const receives = await contract.getAllChatsReceiver();
    const senders = await contract.getAllChatsSender();

    return Promise.resolve({receives,senders})

  } catch (err) {
    console.log('ocurrio un error al leer los chats', err);
  }
};