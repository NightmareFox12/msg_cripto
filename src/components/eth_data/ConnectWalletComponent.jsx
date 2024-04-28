'use client';
//cSPELL:DISABLE

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';

export default function ConnectWalletComponent() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  useEffect(() => {
    handleChangeAccount();

    if (window.ethereum === 'undefined') setIsMetaMaskInstalled(false);
    else {
      setIsMetaMaskInstalled(true);
      if (window.ethereum.selectedAddress) setIsMetaMaskConnected(true);

      //listen to all actions account
      window.ethereum.on('accountsChanged', handleChangeAccount);
    }
  }, []);

  const handleChangeAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length === 0) setIsMetaMaskConnected(false);
  };

  const connectWithMetaMaskBtn = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.getSigner();
      setIsMetaMaskConnected(true)
    } catch (err) {
      setIsMetaMaskConnected(false);
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
                onClick={connectWithMetaMaskBtn}
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
