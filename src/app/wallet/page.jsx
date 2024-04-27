'use client';

import React from 'react';
import ConnectWalletComponent from '../../components/eth_data/ConnectWalletComponent';
import { AdressContextProvider } from '../../context/AddressContext';

export default function ConnectWallet() {
  return (
    <AdressContextProvider>
      <ConnectWalletComponent />
    </AdressContextProvider>
  );
}
