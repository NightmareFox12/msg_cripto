'use client';

import React, { createContext, useState } from 'react';

export const AddressContext = createContext();

export function AdressContextProvider({ children }) {
  const [address, setAddress] = useState(undefined);

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
}
