'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FAB({ setOpen }) {
  const hoverVariants = {
    hover: { scale: 1.1, shadow: 10 },
    initial: { scale: 1, rotate: 0, shadow: 0 },
  };
  return (
    <button onClick={() => setOpen(true)}>
      <motion.div
        variants={hoverVariants}
        initial="initial"
        whileHover="hover"
        className="flex justify-center items-center rounded-full bg-green-600 w-14 h-14 hover:bg-green-500">
        <Image
          src={require('@/public/icons/MdiPlusThick.svg')}
          alt="Enviar Mensaje"
          className="w-8 h-8"
        />
      </motion.div>
    </button>
  );
}
