'use client';

import React from 'react';
import Header from '@/components/general/Header';
import { useEffect } from 'react';
import Image from 'next/image';

function Profile() {
  useEffect(() => {}, []);

  return (
    <main className="bg-zinc-50 h-screen">
      <Header title={'Perfil'}></Header>

      <section>
        <article className="py-10 flex justify-around mx-auto w-3/5 ring-1 ring-slate-300 rounded-md mt-6 bg-white">
          <div className="ring-2 ring-slate-400 rounded-md overflow-hidden">
            <Image
              src={require('@/public/images/1.png')}
              alt="nose"
              className="w-[180px] h-[180px] object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Juan Perez</h1>
            <p className="font-medium">Address</p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Profile;
