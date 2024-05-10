'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Header({ title,back }) {
  const [address, setAddress] = useState('');

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
    <header className="bg-gradient-to-t from-blue-400 to-blue-800 text-white py-2 px-5">
      {back ? <Link href={back} className="text-white"></Link> : null}
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-md">{address}</p>
    </header>
  );
}
