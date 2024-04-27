import React from 'react';
import { AdressContextProvider } from '@/context/AddressContext';
import ListChats from './ListChat';

export default function page() {
  return (
    <AdressContextProvider>
      <ListChats />
    </AdressContextProvider>
  );
}
