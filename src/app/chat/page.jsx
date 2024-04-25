'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Chat() {
  const [inputText, setInputText] = useState('');

  const handleText = (text) => {
    setInputText(text);
  };

  const handleKey = (key) => {
    if (key === 'Enter') setInputText('');
  };

  const handleClick = () => {
    setInputText('');
  };

  return (
    <>
      <main>
        <header className="flex bg-slate-600 py-5">
          <nav className="flex px-4">
            <ul>
              <Link href="/listChats" className='text-white font-semibold text-sm'>Regresar</Link>
            </ul>
          </nav>
        </header>

        <div className="flex flex-col gap-2 p-4 rounded-lg">
          <article className="flex">
            <div className="p-4 rounded-lg bg-gray-300">Hello! </div>
          </article>
          <article className="flex justify-end">
            <div className="self-end p-4 rounded-lg bg-blue-600 text-white">
              <p className='select-none' >You need chamba? 😋</p>
            </div>
          </article>
        </div>
      </main>

      <div className="flex px-1 w-full justify-center fixed bottom-0 mb-1">
        <input
          type="text"
          onChange={(e) => handleText(e.target.value)}
          onKeyDown={(e) => handleKey(e.key)}
          value={inputText}
          placeholder="write your message"
          className="flex-1 rounded-md border-0 px-2 mx-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
        />
        <button
          onClick={handleClick}
          className="bg-blue-800 text-white px-1 text-sm rounded-md"
        >
          Enviar
        </button>
      </div>
    </>
  );
}
