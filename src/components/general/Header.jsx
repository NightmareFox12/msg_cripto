'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Header({ title, back }) {
  const [address, setAddress] = useState('');

  const hoverVariants = {
    hover: { scale: 1.1 },
    initial: { scale: 1 },
  };

  const handleChangeAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length === 0) return (location.href = '/');

    setAddress(window.ethereum.selectedAddress);
  };

  useEffect(() => {
    handleChangeAccount();

    if (window.ethereum === 'undefined') return (location.href = '/');
    else {
      if (window.ethereum.selectedAddress)
        setAddress(window.ethereum.selectedAddress);

      //listen to all actions account
      window.ethereum.on('accountsChanged', handleChangeAccount);
    }
  }, []);

  return (
    <header className="flex flex-col bg-gradient-to-t from-blue-400 to-blue-800 text-white py-2 px-5">
      <div className="flex gap-4 items-center">
        {back !== '' ? (
          <motion.div
            variants={hoverVariants}
            whileHover={'hover'}
            initial={'initial'}
          >
            <Link href={back}>
              <Image
                src={require('@/public/icons/MaterialSymbolsArrowBackIosNew.svg')}
                alt="Regresar"
                className="w-6 h-6"
              />
            </Link>
          </motion.div>
        ) : null}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {/* <p className="text-md">{address}</p> */}
    </header>
  );
}
