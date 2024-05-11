'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/general/Header';
import ModalImages from '@/components/profile/ModalImages';

function Profile() {
  const [showModalImages, setShowModalImages] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);

  const hoverVariants = {
    hover: { scale: 1.1 },
    initial: { scale: 1 },
  };

  useEffect(() => {}, []);

  return (
    <main className="h-screen">
      <Header title={'Perfil'} back={'/listChat'}></Header>

      <section>
        <article className="py-10 flex justify-around mx-auto w-3/5 ring-1 ring-slate-300 rounded-md mt-6">
          <div className="ring-2 ring-slate-400 rounded-md overflow-hidden relative">
            <Image
              src={require(`@/public/images/${
                imageSelected === null ? 'avatar' : imageSelected
              }.png`)}
              alt="nose"
              className="w-[180px] h-[180px] object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
            <motion.div
              className="z-10 absolute bottom-0 right-0"
              variants={hoverVariants}
              initial="initial"
              whileHover="hover"
            >
              <button
                onClick={() => setShowModalImages(!showModalImages)}
                className="rounded-full bg-gray-500 w-8 h-8 flex justify-center items-center"
              >
                <Image
                  src={require('@/public/icons/MaterialSymbolsEditOutline.svg')}
                  alt="editar imagen"
                  className="w-6 h-6"
                />
              </button>
            </motion.div>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Juan Perez</h2>
            <p className="font-medium">Address</p>
          </div>
        </article>
      </section>

      {/* <hr className='mt-5'/> */}
      <h2 className="text-center m-10 text-3xl font-semibold">
        Actualizar Perfil
      </h2>

      <section className="container mx-auto flex justify-center items-center flex-col gap-5">
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

        <button
          // disabled={imageSelectedID !== null ? false : true}
          // onClick={() => handleClick()}
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          Actualizar
        </button>
      </section>
      {showModalImages && (
        <ModalImages
          setShowModalImages={setShowModalImages}
          setImageSelected={setImageSelected}
        />
      )}
    </main>
  );
}

export default Profile;
