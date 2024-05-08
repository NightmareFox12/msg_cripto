'use client';

import React from 'react';
import Image from 'next/image';

export default function Loader({ dark = false }) {
  return (
    <Image
      src={require('@/public/icons/FluentSpinnerIos16Filled.svg')}
      className="animate-spin"
      alt="Cargando..."
      style={dark ? { filter: 'invert(100%)' } : ''}
    ></Image>
  );
}
