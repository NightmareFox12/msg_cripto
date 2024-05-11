import React from 'react';
import fs from 'fs/promises';
import Profile from './Profile';

export const metadata = {
  title: 'Perfil',
};

const readJson = async () => {
  const file = await fs.readFile(
    process.cwd() +
      '/src/hardhat/artifacts/contracts/MessagingApp.sol/MessagingApp.json',
    'utf8'
  );
  return Promise.resolve(file);
};

export default async function page() {
  const ABIfile = await readJson();

  return (
    <>
      <Profile ABIfile={ABIfile} />
    </>
  );
}
