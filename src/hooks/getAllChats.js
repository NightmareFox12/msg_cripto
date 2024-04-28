//cSPELL:DISABLE
import {initContract} from './initContract';

export const getAllchats = async (signner) => {
  try {
    const contract = await initContract(signner);

    const receives = await contract.getAllChatsReceiver();
    const senders = await contract.getAllChatsSender();

    console.log(receives)
    console.log(senders)

    return Promise.resolve({receives,senders})

  } catch (err) {
    console.log('ocurrio un error al leer los chats', err);
  }
};