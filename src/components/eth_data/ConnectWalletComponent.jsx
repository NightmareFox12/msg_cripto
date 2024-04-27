'use client';
//cSPELL:DISABLE

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { AddressContext } from '@/context/AddressContext';
import { updateAddressContext } from '../../hooks/connect';


export default function ConnectWalletComponent() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const { setAddress } = useContext(AddressContext);

  useEffect(() => {
    if (window.ethereum === 'undefined') return setIsMetaMaskInstalled(false);

    setIsMetaMaskInstalled(true);
    if (window.ethereum.selectedAddress) {
      connectWithMetaMask();
      setIsMetaMaskConnected(true);
      return (location.href = '/listChat/');
    }

    //listen to change account
    window.ethereum.on("accountsChanged",connectWithMetaMask);

  }, []);

  const connectWithMetaMask = async () => {
    try {
      updateAddressContext().then((currentAddress) => setAddress(currentAddress));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-400 to-blue-800 text-white">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Conectar con tu Wallet</h1>
        {isMetaMaskInstalled ? (
          <div>
            {isMetaMaskConnected ? (
              <>
                <p className="text-lg text-green-400 mb-4">
                  Conectado con MetaMask
                </p>
                <Link
                  href="/listChat/"
                  className="bg-white text-blue-600 rounded-full px-6 py-3 font-bold hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  Ir a los chats
                </Link>
              </>
            ) : (
              <button
                className="bg-white text-blue-600 rounded-full px-6 py-3 font-bold hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onClick={connectWithMetaMask}
              >
                Conectar con MetaMask
              </button>
            )}
          </div>
        ) : (
          <p className="text-lg text-red-400 mb-4">
            Instala MetaMask para continuar
          </p>
        )}
      </div>
    </div>
  );
}
