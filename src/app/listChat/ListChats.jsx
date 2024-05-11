'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllchats } from '@/hooks/getAllChats';
import { ethers } from 'ethers';
import { Toaster, toast } from 'sonner';
import { initContract } from '@/hooks/initContract';
import DialogComponent from '@/components/chat/DialogComponent';
import Header from '@/components/general/Header';


export default function ListChats({ ABIfile }) {
  const [address, setAddress] = useState('');
  const [allChats, setAllChats] = useState([]);
  const [imagesUser, setImagesUser] = useState([]);

  const [profileData, setProfileData] = useState();

  const getAdress = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signner = await provider.getSigner();

    const contract = await initContract(signner, ABIfile);
    return Promise.resolve(contract);
  };

  const showAlert = async (msg, status) => {
    if (status === 'error') return toast.error(msg);
    toast.success(msg);

    const contract = await getAdress();
    const receives = await contract.getAllChatsReceiver();
    const senders = await contract.getAllChatsSender();

    const allChats = [...receives, ...senders].reduce((acc, item) => {
      if (acc.indexOf(item) === -1) {
        acc.push(item);
      }
      return acc;
    }, []);

    setAllChats(allChats);
  };

  const getProfileName = async (addressUser) => {
    const contract = await getAdress();
    const nickName = await contract.getProfile(addressUser);

    const profileData = nickName.map((x) => {
      return {
        name: nickName[0] === '' ? addressUser : nickName[0],
        imageID: parseInt(nickName[1]) === 0 ? 'avatar' : parseInt(nickName[1]),
      };
    });

    return Promise.resolve(profileData);
  };

  useEffect(() => {
    (async () => {
      // const number = allChats.length;
      // const req = await fetch(`https://randomuser.me/api/?results=${number}`);
      // const res = await req.json();
      // const imagesArr = res.results.map(user => user.picture.large)
      // setImagesUser(imagesArr)
    })();
  }, [allChats]);

  useEffect(() => {
    handleChangeAccount();

    if (window.ethereum === 'undefined') return (location.href = '/');
    else {
      if (window.ethereum.selectedAddress)
        setAddress(window.ethereum.selectedAddress);

      //listen to all actions account
      window.ethereum.on('accountsChanged', handleChangeAccount);
    }
  }, []);

  const handleChangeAccount = async () => {
    setAddress(window.ethereum.selectedAddress);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signner = await provider.getSigner();
    const { receives, senders } = await getAllchats(signner, ABIfile);

    const allChats = [...receives, ...senders].reduce((acc, item) => {
      if (acc.indexOf(item) === -1) acc.push(item);
      return acc;
    }, []);

    setAllChats(allChats);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster position="top-center" richColors expand={true} />
      <Header title={'Chats'} back={''}/>

      <main className="w-full py-1 bg-slate-100">
        <section className="flex flex-col gap-1 px-2">
          {allChats.length === 0 && (
            <div
              className="flex items-center justify-center w-full"
              style={{ height: '80vh' }}
            >
              <h2 className="text-3xl font-bold">Aún no hay chats</h2>
            </div>
          )}
          {allChats.map((data, key) => (
            <Link
              key={key}
              href={`/chat?address=${data}`}
              className="flex-1 bg-white shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="p-4">
                <div className="flex items-center">
                  {/* <img
                    src={imagesUser[key]}
                    alt="Foto de perfil de Maria"
                    className="rounded-full w-16 h-16 flex-shrink-0"
                  /> */}
                  {getProfileName(data).then((x) => (
                    <Image
                      src={require(`@/public/images/${x[0].imageID}.png`)}
                      width={60}
                      height={60}
                      alt="img-perfil"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  ))}

                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">
                      {getProfileName(data).then((x) => x[0].name)}
                    </h2>
                    {/* <p className="text-gray-600">Hola, ¿cómo estás?</p> */}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
                <div className="text-blue-500 font-semibold">
                  2 nuevos mensajes
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </Link>
          ))}
        </section>
      </main>

      <DialogComponent showAlert={showAlert} ABIfile={ABIfile} />
    </div>
  );
}
