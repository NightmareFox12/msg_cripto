'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BtnSendMsg({setOpen,open}) {
  return (
    <button onClick={() =>
      {

    setOpen(true)
    console.log(open)
  }
    
    }>
      <motion.div
        className="flex justify-center items-center rounded-full bg-green-600 w-14 h-14"
        whileHover={{ scale: 1.1, rotate: 18 }}
        // whileTap={{
        //   scale: 0.8,
        //   rotate: -90,
        //   borderRadius: "100%"
        // }}
      >
        <Image
          src={require('@/public/TablerSend.svg')}
          alt="Enviar Mensaje"
          className="w-10 h-10"
        />
      </motion.div>
    </button>
  );
}
