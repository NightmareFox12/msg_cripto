import React, { Suspense } from 'react';
import fs from 'fs/promises';
import Profile from './Profile';
import Loader from '@/components/general/Loader';

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
    <Suspense
      fallback={
        <div className="sticky w-screen h-screen flex items-center justify-center">
          <div className="text-indigo-400 scale-[2]">
            <Loader dark={true} />
          </div>
        </div>
      }
    >
      <Profile ABIfile={ABIfile} />
    </Suspense>
  );
}
