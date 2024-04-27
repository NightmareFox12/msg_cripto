'use client';

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AddressContext } from '@/context/AddressContext';
import { updateAddressContext } from '@/hooks/connect';
import { ethers } from 'ethers';
import abi from './../hardhat/artifacts/build-info/contracts/HelloWorld.json'


export default function ListChats() {
  const { address, setAddress } = useContext(AddressContext);

  useEffect(() => {
    if (window.ethereum.selectedAddress) handleMetamask().then()

    //listen to change account
    window.ethereum.on("accountsChanged",handleMetamask);
  },[])

  const handleMetamask = async () => {
    updateAddressContext().then(
      (currentAddress) => {
        setAddress(currentAddress)
      }
    );
  }

//cSPELL:DISABLE
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// Conectar al contrato
const contract = new ethers.Contract(contractAddress, abi, provider);

// Llamar a la función
contract.helloWorld().then(result => {
  console.log("Resultado de la función: ", result);
}).catch(error => {
  console.error("Error al llamar a la función: ", error);
});

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-t from-blue-400 to-blue-800 text-white py-2 px-5">
        <h1 className="text-xl font-bold">Aplicación de Chat {address}</h1>
      </header>

      <main className="container min-h-screen py-1 bg-slate-100">
        <section className="flex gap-1 px-2">
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

          {/* Agregar más chats aquí */}
        </section>
      </main>
    </div>
  );
}