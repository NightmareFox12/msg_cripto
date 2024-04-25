'use client';

import React, { useState, useEffect } from 'react';

export default function ConnectWallet() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
      if (window.ethereum.selectedAddress) {
        setIsMetaMaskConnected(true);
      }
    }
  }, []);

  const connectWithMetaMask = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setIsMetaMaskConnected(true);
      setTimeout(() => {
        location.href = '/listChat';
      }, 1000);
    } catch (error) {
      console.error(error);
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
                <button
                  className="bg-white text-blue-600 rounded-full px-6 py-3 font-bold hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  onClick={connectWithMetaMask}
                >
                  Ir a los chats
                </button>
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
