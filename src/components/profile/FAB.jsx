import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';


export default function FAB () {
  const hoverVariants = {
    hover: { scale: 1.2, shadow: 10 },
    initial: { scale: 1, rotate: 0, shadow: 0 },
  };

  return (
    <Link href="/profile">
      <motion.div
        variants={hoverVariants}
        initial="initial"
        whileHover="hover"
        className="flex justify-center items-center rounded-full bg-green-600 w-14 h-14 hover:bg-green-500">
        <Image
          src={require('@/public/icons/MaterialSymbolsAccountCircleFull.svg')}
          alt="Enviar Mensaje"
          className="w-8 h-8"
        />
      </motion.div>
    </Link>
  );
}
