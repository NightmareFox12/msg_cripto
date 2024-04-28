'use client';
//cSPELL:DISABLE

import { Fragment, useEffect, useRef, useState } from 'react';
import BtnSendMsg from '@/components/chat/BtnSendMsg';
// import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { sendMessage } from '@/hooks/sendMsg';
import { ethers } from 'ethers';


export default function DialogComponent({ showAlert }) {
  const [addressInput, setAddressInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //minimo el address sea de 42 caracteres. tambien debe empezar con 0x

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length === 0) return (location.href = '/');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signner = await provider.getSigner();
    
    sendMessage(signner, addressInput, messageInput).then(success => {
      showAlert('Message send','success');
    })
    .catch((err) => {
      showAlert(err.message,'error');
    });
  };

  return (
    <>
      <div>
        <section className="fixed bottom-5 right-5 z-10">
          <BtnSendMsg setOpen={setOpen} />
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
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6 p-6 md:p-8 lg:p-10 bg-white rounded-lg shadow-lg">
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="address"
                    >
                      Address
                    </label>
                    <input
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3"
                      id="address"
                      value={addressInput}
                      placeholder="Enter the user's address"
                      onChange={(e) => setAddressInput(e.target.value)}
                      type="text"
                      required={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="message"
                    >
                      message
                    </label>
                    <input
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3"
                      id="message"
                      placeholder="Enter the message"
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      required={true}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    // onClick={() => setOpen(false)}
                  >
                    Iniciar chat
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setOpen(false);
                      console.log(open);
                    }}
                    // ref={cancelButtonRef}
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
      </div>
    </>
  );
}
