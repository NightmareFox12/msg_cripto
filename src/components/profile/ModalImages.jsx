import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const variants = {
  initial: { scale: 1, boxShadow: '0 0 0 1.4px #94A3B8' },
  hover: {
    scale: 1.1,
    boxShadow: '0 0 0 2px #556780',
    transition: {
      duration: 0.3,
    },
  },
};

export default function ModalImages({ setShowModalImages,setImageSelected }) {
  const [imageSelectedID, setImageSelectedID] = useState(null);

  const handleClick = () => {
    setImageSelected(imageSelectedID);
    setShowModalImages(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-neutral-50 rounded-lg shadow-lg w-full max-w-[600px]">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Cambiar Imagen</h3>
            <button
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={() => setShowModalImages(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((value, key) => (
              <ImageComponent
                key={key}
                number={value}
                imageSelectedID={imageSelectedID}
                setImageSelectedID={setImageSelectedID}
              />
            ))}
          </div>
          <div className="flex justify-end mt-6 space-x-2">
            <button
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={() => setShowModalImages(false)}
            >
              Cancelar
            </button>
            <button
              disabled={imageSelectedID !== null ? false : true}
              onClick={() => handleClick()}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              Cambiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ImageComponent = ({ number, setImageSelectedID, imageSelectedID }) => {
  return (
    <motion.button
      className="rounded-full ring-2 ring-slate-400 overflow-hidden"
      variants={variants}
      initial={imageSelectedID === number ? 'hover' : 'initial'}
      whileHover="hover"
      onClick={() => setImageSelectedID(number)}
    >
      <Image
        alt="Image"
        className="w-full h-full object-cover"
        height="128"
        draggable="false"
        src={require(`@/public/images/${number}.png`)}
        style={{
          aspectRatio: '128/128',
          objectFit: 'cover',
          imageRendering: 'pixelated',
        }}
        width="128"
      />
    </motion.button>
  );
};
