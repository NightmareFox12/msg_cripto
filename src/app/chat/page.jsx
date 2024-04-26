// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';

// export default function Chat() {
//   const [inputText, setInputText] = useState('');
//   const [messages, setMessages] = useState([]);

//   const handleText = (text) => {
//     setInputText(text);
//   };

//   const handleKey = (key) => {
//     if (key === 'Enter') {
//       if (inputText.trim() !== '') {
//         setMessages([...messages, { text: inputText, id: Date.now() }]);
//         setInputText('');
//       }
//     }
//   };

//   const handleClick = () => {
//     if (inputText.trim() !== '') {
//       setMessages([...messages, { text: inputText, id: Date.now() }]);
//       setInputText('');
//     }
//   };

//   const handleDelete = (id) => {
//     setMessages(messages.filter((message) => message.id !== id));
//   };

//   const handleClearChat = () => {
//     setMessages([]);
//   };

//   return (
//     <>
//       <main>
//         <header className="flex bg-slate-600 py-5 px-4">
//           <nav>
//             <ul>
//               <li>
//                 <Link
//                   href="/listChat"
//                   className="text-white font-semibold text-sm hover:underline"
//                 >
//                   Regresar
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </header>

//         <div className="flex flex-col gap-4 p-4 rounded-lg">
//           {messages.map((message) => (
//             <article key={message.id} className="flex">
//               <div className="p-4 rounded-lg bg-gray-300">
//                 {message.text}
//                 <div className="flex mt-1">
//                   <button
//                     className="text-red-500 ml-auto hover:text-red-700 focus:outline-none"
//                     onClick={() => handleDelete(message.id)}
//                   >
//                     Eliminar
//                   </button>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </main>

//       <div className="flex px-4 w-full justify-center fixed bottom-0 mb-4">
//         <input
//           type="text"
//           onChange={(e) => handleText(e.target.value)}
//           onKeyDown={(e) => handleKey(e.key)}
//           value={inputText}
//           placeholder="Escribe tu mensaje"
//           className="flex-1 rounded-md border-2 border-blue-400 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
//         />
//         <button
//           onClick={handleClick}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md ml-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
//         >
//           Enviar
//         </button>
//         <button
//           onClick={handleClearChat}
//           className="bg-red-600 text-white px-4 py-2 rounded-md ml-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
//         >
//           Vaciar Chat
//         </button>
//       </div>
//     </>
//   );
// }

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import { FaPaperPlane, FaTrash, FaReply } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Chat() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  // const [newMessageNotification, setNewMessageNotification] = useState(false);

  useEffect(() => {
    // Si hay nuevos mensajes, mostramos la notificación durante 3 segundos
    // if (messages.length > 0) {
    //   setNewMessageNotification(true);
    //   const timer = setTimeout(() => {
    //     setNewMessageNotification(false);
    //   }, 3000);
    //   return () => clearTimeout(timer);
    // }
  }, [messages]);

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

  const handleReply = (originalMessage) => {
    setInputText(`@${originalMessage.text} `);
  };

  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        <header className="bg-slate-600 text-white py-5 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Chat</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/listChat"
                  className="font-semibold text-sm hover:underline"
                >
                  Regresar
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <div className="flex flex-col gap-4 p-4 rounded-lg">
          {messages.map((message, index) => (
            <motion.article
              key={message.id}
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center">
                <div className="p-4 rounded-lg bg-gray-200">{message.text}</div>
                <div className="flex">
                  <button
                    className="text-green-500 hover:text-green-700 focus:outline-none mr-2"
                    onClick={() => handleReply(message)}
                  >
                    {/* <FaReply /> */}
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => handleDelete(message.id)}
                  >
                    {/* <FaTrash /> */}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mensaje de notificación para nuevos mensajes */}
        {/* {newMessageNotification && (
          <div className="fixed bottom-16 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md">
            ¡Tienes nuevos mensajes!
          </div>
        )} */}
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
        <motion.button
          onClick={handleClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md ml-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          whileTap={{ scale: 0.95 }}
        >
          {/* <FaPaperPlane /> */}
        </motion.button>
        <motion.button
          onClick={handleClearChat}
          className="bg-red-600 text-white px-4 py-2 rounded-md ml-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
          whileTap={{ scale: 0.95 }}
        >
          {/* <FaTrash /> */}
        </motion.button>
      </div>
    </>
  );
}
