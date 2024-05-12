'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import Image from 'next/image';
import Header from '@/components/general/Header';
import ModalImages from '@/components/profile/ModalImages';
import { initContract } from '@/hooks/initContract';
import { toast, Toaster } from 'sonner';

const hoverVariants = {
  hover: { scale: 1.1 },
  initial: { scale: 1 },
};

export default function Profile({ ABIfile }) {
  const [showModalImages, setShowModalImages] = useState(false);
  const [imageSelected, setImageSelected] = useState(0);
  const [nickname, setNickname] = useState('');
  const [nicknameStatic, setNicknameStatic] = useState('');
  const [address, setAddress] = useState('');

  const [isChange, setIsChange] = useState(true);

  const getAdress = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signner = await provider.getSigner();
    return Promise.resolve(signner);
  };

  const handleChange = () => {
    if (nickname !== '' || imageSelected) setIsChange(true);
    else setIsChange(false);
  };

  const getProfileData = async (signner) => {
    try {
      const contract = await initContract(signner, ABIfile);
      const nickName = await contract.getProfile(signner.address);

      const profileData = nickName.map((x) => {
        return {
          name: nickName[0] === '' ? '' : nickName[0],
          imageID: parseInt(nickName[1]) === 0 ? 0 : parseInt(nickName[1]),
        };
      });

      setImageSelected(profileData[0].imageID);
      setNickname(profileData[1].name);
      setNicknameStatic(profileData[1].name);
      setAddress(signner.address);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async () => {
    try {
      if (isChange) {
        const siggner = await getAdress();
        const contract = await initContract(siggner, ABIfile);

        await contract.setProfile(nickname, imageSelected);
        setNicknameStatic(nickname);
        toast.success('Perfil actualizado correctamente');
      }
    } catch (err) {
      console.log(err);
      toast.error('No se ha podido actualizar el perfil');
    }
  };

  useEffect(() => handleChange(), [imageSelected]);
  useEffect(() => handleChange(), [nickname]);

  useEffect(() => {
    getAdress().then((signner) => getProfileData(signner));
  }, []);

  return (
    <main className="h-screen">
      <Toaster position="top-center" richColors expand={true} />
      <Header title={'Perfil'} back={'/listChat'}></Header>

      <section>
        <article className="py-10 flex justify-around mx-auto w-3/5 ring-1 ring-slate-300 rounded-md mt-6">
          <div className="ring-2 ring-slate-400 rounded-md overflow-hidden relative">
            <Image
              src={require(`@/public/images/${
                imageSelected === 0 ? 0 : imageSelected
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
            <h2 className="text-3xl font-bold">{nicknameStatic}</h2>
            <p className="font-medium mt-2">{address}</p>
          </div>
        </article>
      </section>

      <h2 className="text-center m-10 text-3xl font-semibold">
        Actualizar Perfil
      </h2>

      <section className="container mx-auto flex justify-center items-center flex-col gap-5">
        <div className="sm:w-[600px] flex flex-col gap-5">
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
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                autoComplete="off"
                placeholder="Escribe tu Nickname..."
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <button
          disabled={!isChange}
          onClick={() => handleClick()}
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          Guardar cambios
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
