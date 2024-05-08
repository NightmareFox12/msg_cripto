'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
// import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ethers } from 'ethers';
import { Toaster, toast } from 'sonner';
import FAB from '@/components/chat/FAB';


export default function DialogComponent() {
  const [addressInput, setAddressInput] = useState('');
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState('');
  const [btnInputState, setBtnInputState] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnInputState(true);
    setShowSpinner(true);
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length === 0) return (location.href = '/');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signner = await provider.getSigner();

    const req = await fetch('/listChat/api', {
      method: 'POST',
      body: JSON.stringify({ addressInput, signner }),
    });

    const res = await req.json();
    setBtnInputState(false);
    setShowSpinner(false);

    if (res.msg !== 'ok') return toast.error(res.msg);
    else document.getElementById('hola').click();

    //-Aqui hacer las verificaciones para enviar al API de esta misma carpeta donde compruebo que no sea la misma address y que sea valida y redireccionar a la messager donde ya empieza a escribir cheevere.

    //- Para no andar usando el API de imagenes usar las imagenes de speedrun recortar como unos 50 carajitos de esos y al ingresar la address con un numero random asignarle una imagen a esa address y guardar en el localStorage la address => imagen para no andar usando el API y tener una imagen predefinidias

    // sendMessage(signner, addressInput, messageInput, ABIfile)
    //   .then(() => {
    //     showAlert('Message send', 'success');
    //   })
    //   .catch((err) => {
    //     showAlert(err.message, 'error');
    //   });
  };

  useEffect(() => {
    if (/^0x[a-fA-F0-9]{40}$/.test(addressInput)) {
      setBtnInputState(false);
      setInfo('');
    } else if (addressInput.length > 42)
      setAddressInput(addressInput.slice(0, addressInput.length - 1));
    else {
      setInfo('Escriba una address válida');
      setBtnInputState(true);
    }
  }, [addressInput]);

  return (
    <>
      <Toaster position="top-center" richColors expand={true} />
      <motion.div>
        <section className="fixed bottom-5 right-5 z-10">
          <FAB setOpen={setOpen} />
        </section>
        {/* <Transition.Root show={open} as={Fragment}> */}
        {/* <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}> */}
        {/* <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child> */}

        <div
          className={`fixed inset-0 z-10 w-screen overflow-y-auto ${
            open ? '' : 'hidden'
          }`}
        >
          {/* Contenido del componente */}
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            {/* <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          > */}
            <section className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="flex flex-col gap-6 p-6 md:p-8 lg:p-10 bg-white rounded-lg shadow-lg">
                  <div className="space-y-2">
                    <label
                      className="block text-md font-medium text-gray-700"
                      htmlFor="address"
                    >
                      Address del receptor <b className="text-red-500">*</b>
                    </label>
                    <input
                      className="block w-full rounded-md bg-neutral-50 outline-indigo-200 focus:outline-indigo-500 sm:text-sm px-4 py-3  outline-none font-medium"
                      id="address"
                      value={addressInput}
                      placeholder="Ingrese el Address..."
                      onChange={(e) => setAddressInput(e.target.value)}
                      type="text"
                      required
                    />
                    <p className="text-red-700 font-medium">{info}</p>
                  </div>
                  <div className="space-y-2"></div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-5">
                  <button
                    type="submit"
                    disabled={btnInputState}
                    className="inline-flex w-full justify-center gap-1 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto disabled:bg-gray-400"
                    // onClick={() => setOpen(false)}
                  >
                    <Image
                      src={require('@/public/icons/FluentSpinnerIos16Filled.svg')}
                      className={`animate-spin ${showSpinner ? '' : 'hidden'}`}
                      alt="Cargando..."
                    ></Image>
                    Iniciar chat
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              </form>
            </section>
            {/* </Transition.Child> */}
          </div>
        </div>
        {/* </Dialog> */}
        {/* </Transition.Root> */}
      </motion.div>

      <Link id="hola" href={`/chat?address=${addressInput}`}></Link>
    </>
  );
}
