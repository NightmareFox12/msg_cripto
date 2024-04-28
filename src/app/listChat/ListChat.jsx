'use client';
//cSPELL:DISABLE
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AddressContext } from '@/context/AddressContext';
import { ethers } from 'ethers';
import ContractABI from '@/hardhat/artifacts/contracts/MessagingApp.sol/MessagingApp.json';
import DialogComponent from '@/components/chat/DialogComponent';

export default function ListChats() {
  const { address, setAddress } = useContext(AddressContext);
  const [allChatsReceiver, setAllChatsReceiver] = useState([]);
  const [allChatsSender, setAllChatsSender] = useState([]);
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(true);

  useEffect(() => {
    console.log(window.ethereum.selectedAddress)

    if (window.ethereum.selectedAddress) 

    //listen to change account
    window.ethereum.on('accountsChanged', handleMetamask);
  }, []);

  const handleMetamask = async () => {
    if()
    // updateAddressContext().then((currentAddress) => {
    //   setAddress(currentAddress);
    // });

    contract
    .getAllChatsReceiver()
    .then((result) => {
      console.log('Resultado de la función: ', result);
      setAllChatsReceiver(result);
    })
    .catch((error) => {
      console.error('Error al llamar a la función: ', error);
    });

  // Llamar a la función
  contract
    .getAllChatsSender()
    .then((result) => {
      console.log('Resultado de la función: ', result);
      setAllChatsSender(result);
    })
    .catch((error) => {
      console.error('Error al llamar a la función: ', error);
    });
  };

  const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
  const provider = new ethers.JsonRpcProvider();

  // Conectar al contrato
  const contract = new ethers.Contract(
    contractAddress,
    ContractABI.abi,
    provider
  );

  // Llamar a la función
 

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

      <DialogComponent />
    </div>
  );
}
