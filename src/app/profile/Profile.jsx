'use client';

import React from 'react';
import Header from '@/components/general/Header';
import { useEffect } from 'react';
import Image from 'next/image';

function Profile() {
  useEffect(() => {}, []);

  return (
    <main className="h-screen">
      <Header title={'Perfil'} back={'/listChat'}></Header>

      <section>
        <article className="py-10 flex justify-around mx-auto w-3/5 ring-1 ring-slate-300 rounded-md mt-6">
          <div className="ring-2 ring-slate-400 rounded-md overflow-hidden relative">
            <Image
              src={require('@/public/images/1.png')}
              alt="nose"
              className="w-[180px] h-[180px] object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
            <button onClick={() => {/*TODO*/}} className="z-10 absolute bottom-0 right-0 rounded-full bg-gray-200 w-8 h-8 flex justify-center items-center">
              <Image src={require('@/public/icons/MaterialSymbolsEditOutline.svg')} alt='editar imagen' className='w-6 h-6' />
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-bold">Juan Perez</h1>
            <p className="font-medium">Address</p>
          </div>
        </article>
      </section>

      {/* <hr className='mt-5'/> */}
      <h1 className="text-center m-10 text-3xl font-semibold">
        Actualizar Perfil
      </h1>

      <section className="container mx-auto flex justify-center items-center">
        <div className="sm:w-[600px]">
          <form autoComplete="none" className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre de usuario
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Escribe tu Nickname..."
                  className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Profile;
