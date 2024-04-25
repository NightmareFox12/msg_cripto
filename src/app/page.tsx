import React from 'react';

export const metadata = {
  title: "Inicio"
}

export default function Inicio() {
  return (
    <div>
      <h1>
        Aqui va la broma de la conexion para detectar la wallet al inciar la
        aplicacion, aunque tranquilamente se cambiara a futuro para la lista de chat
      </h1>
      <div className='flex justify-center'>
        <a href='/chat' className="bg-blue-600 rounded-sm text-sm p-1">
          Programar lo del chat
        </a>
      </div>
    </div>
  );
}