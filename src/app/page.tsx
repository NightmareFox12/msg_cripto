import React from 'react';
import ConnectWallet from '@/components/eth_data/ConnectWallet'

export const metadata = {
  title: 'Inicio',
};

export default function Inicio() {
  return (
    <div>
      <ConnectWallet />
    </div>
  );
}
