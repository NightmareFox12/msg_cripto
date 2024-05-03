'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DialogComponent from '@/components/chat/DialogComponent';
import { getAllchats } from '@/hooks/getAllChats';
import { ethers } from 'ethers';
import { Toaster, toast } from 'sonner';
import { initContract } from '@/hooks/initContract';

export default function ListChats() {
  const [address, setAddress ] = useState('');
  const [allChats, setAllChats] = useState([]);
  const [imagesUser, setImagesUser] = useState([]);

  const showAlert = async (msg, status) => {
    if (status === 'error') return toast.error(msg);
    toast.success(msg);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signner = await provider.getSigner();

    const contract = await initContract(signner);

    const receives = await contract.getAllChatsReceiver();
    const senders = await contract.getAllChatsSender();

    const allChats = [...receives, ...senders].reduce((acc, item) => {
      if (acc.indexOf(item) === -1) {
        acc.push(item);
      }
      return acc;
    }, []);

    setAllChats(allChats)
  };

  useEffect(() => {
    (async () => {
      const number = allChats.length;
      const req = await fetch(`https://randomuser.me/api/?results=${number}`);
      const res = await req.json();

      const imagesArr = res.results.map(user => user.picture.large)
      setImagesUser(imagesArr)
    })()

  },[allChats])


  useEffect(() => {
    handleChangeAccount();

    if (window.ethereum === 'undefined') return location.href = '/';
    else {
      if (window.ethereum.selectedAddress) setAddress(window.ethereum.selectedAddress);
      

      //listen to all actions account
      window.ethereum.on('accountsChanged', handleChangeAccount);
    }
  }, []);

  const handleChangeAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length === 0) return (location.href = '/');

    setAddress(window.ethereum.selectedAddress);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signner = await provider.getSigner();
    const { receives, senders } = await getAllchats(signner);

    const allChats = [...receives, ...senders].reduce((acc, item) => {
      if (acc.indexOf(item) === -1) acc.push(item);
      return acc;
    }, []);

    setAllChats(allChats)
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster position="top-center" richColors expand={true} />
      <header className="bg-gradient-to-t from-blue-400 to-blue-800 text-white py-2 px-5">
        <h1 className="text-xl font-bold">Aplicación de Chat</h1>
        <p className='text-md'>{address}</p>
      </header>

      <main className="w-full min-h-screen py-1 bg-slate-100">
        <section className="flex flex-col gap-1 px-2">
          {allChats.length === 0 && (
            <div className='flex items-center justify-center min-h-screen w-full'>
              <h1 className='text-3xl font-bold'>Aún no hay chats</h1>
            </div>
          )}
          {allChats.map((data,key) => (
            <Link
              key={key}
              href={`/chat?address=${data}`}
              className="flex-1 bg-white shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="p-4">
                <div className="flex items-center">
                  <img
                    src={imagesUser[key]}
                    alt="Foto de perfil de Maria"
                    className="rounded-full w-16 h-16 flex-shrink-0"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{data}</h2>
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

      <DialogComponent showAlert={showAlert} />
    </div>
  );
}
