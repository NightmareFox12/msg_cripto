'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Chat() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleText = (text) => {
    setInputText(text);
  };

  const handleKey = (key) => {
    if (key === 'Enter') {
      if (inputText.trim() !== '') {
        setMessages([...messages, { text: inputText, id: Date.now() }]);
        setInputText('');
      }
    }
  };

  const handleClick = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, { text: inputText, id: Date.now() }]);
      setInputText('');
    }
  };

  const handleDelete = (id) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <>
      <main>
        <header className="flex bg-slate-600 py-5 px-4">
          <nav>
            <ul>
              <li>
                <Link
                  href="/listChat"
                  className="text-white font-semibold text-sm hover:underline"
                >
                  Regresar
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <div className="flex flex-col gap-4 p-4 rounded-lg">
          {messages.map((message) => (
            <article key={message.id} className="flex">
              <div className="p-4 rounded-lg bg-gray-300">
                {message.text}
                <div className="flex mt-1">
                  <button
                    className="text-red-500 ml-auto hover:text-red-700 focus:outline-none"
                    onClick={() => handleDelete(message.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <div className="flex px-4 w-full justify-center fixed bottom-0 mb-4">
        <input
          type="text"
          onChange={(e) => handleText(e.target.value)}
          onKeyDown={(e) => handleKey(e.key)}
          value={inputText}
          placeholder="Escribe tu mensaje"
          className="flex-1 rounded-md border-2 border-blue-400 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
        />
        <button
          onClick={handleClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md ml-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          Enviar
        </button>
        <button
          onClick={handleClearChat}
          className="bg-red-600 text-white px-4 py-2 rounded-md ml-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
        >
          Vaciar Chat
        </button>
      </div>
    </>
  );
}
