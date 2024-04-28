'use client';
//cSPELL:DISABLE
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AddressContext } from '@/context/AddressContext';
import DialogComponent from '@/components/chat/DialogComponent';
import {getAllchats} from '@/hooks/getAllChats'
import { initContract } from '@/hooks/initContract';

export default function ListChats() {
  const { address, setAddress } = useContext(AddressContext);
  const [allChatsReceiver, setAllChatsReceiver] = useState([]);
  const [allChatsSender, setAllChatsSender] = useState([]);
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(true);

  useEffect(() => {
    handleChangeAccount();

    if (window.ethereum === 'undefined') return location.href = '/';
    else {
      if (window.ethereum.selectedAddress) { 
        setIsMetamaskConnected(true);
        setAddress(window.ethereum.selectedAddress)
      }

      //listen to all actions account
      window.ethereum.on('accountsChanged', handleChangeAccount);
    }
  }, []);

  const handleChangeAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length === 0) return location.href = '/';

    setAddress(window.ethereum.selectedAddress)
    const {receives,senders} = await getAllchats()

    console.log(receives.length)
    console.log(senders.length)
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-t from-blue-400 to-blue-800 text-white py-2 px-5">
        <h1 className="text-xl font-bold">Aplicación de Chat {address}</h1>
      </header>

      <main className="container min-h-screen py-1 bg-slate-100">
        <section className="flex flex-col gap-1 px-2">
          {allChatsReceiver.length === 0 && <div>No hay chats</div>}
          {allChatsReceiver.map((data) => (
            <Link
              href="/chat?address=34"
              className="flex-1 bg-white shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="p-4">
                <div className="flex items-center">
                  <img
                    src="https://laboratoriosniam.com/wp-content/uploads/2018/07/michael-dam-258165-unsplash_WEB2.jpg"
                    alt="Foto de perfil de Maria"
                    className="rounded-full w-16 h-16 flex-shrink-0"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">Maria</h2>
                    <p className="text-gray-600">Hola, ¿cómo estás?</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
                <div className="text-blue-500 font-semibold">
                  2 nuevos mensajes
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </Link>
          ))}
        </section>
      </main>

      <DialogComponent address={address} />
    </div>
  );
}
