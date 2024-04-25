import React from 'react';
import Link from 'next/link';

export default function ListChats() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Encabezado */}
      <header className="bg-slate-600 text-white py-4 px-8">
        <h1 className="text-2xl font-bold">Aplicación de Chat</h1>
      </header>

      <main className="container mx-auto py-1">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/chat?address=34" className="block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="p-4">
                <div className="flex items-center">
                  <img
                    src="https://laboratoriosniam.com/wp-content/uploads/2018/07/michael-dam-258165-unsplash_WEB2.jpg"
                    alt="Foto de perfil de Maria"
                    className="rounded-full w-16 h-16 flex-shrink-0"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">Maria</h2>
                    <p className="text-gray-600">Hola, ¿cómo estás?</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
                <div className="text-blue-500 font-semibold">2 nuevos mensajes</div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
          </Link>

          {/* Agregar más chats aquí */}
        </section>
      </main>
    </div>
  );
}