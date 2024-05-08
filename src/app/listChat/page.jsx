import React, { Suspense } from 'react';

import { promises as fs } from 'fs';

import ListChats from './ListChats';

const readJson = async () => {
  const file = await fs.readFile(
    process.cwd() +
      '/src/hardhat/artifacts/contracts/MessagingApp.sol/MessagingApp.json',
    'utf8'
  );
  return file;
};

export default async function page() {
  const ABIfile = await readJson();
  return (
    // <Suspense fallback={<div>Loading...</div>}> //-
      <ListChats ABIfile={ABIfile} />
    // </Suspense>
  );
}
