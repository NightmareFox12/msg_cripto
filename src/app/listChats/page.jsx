import React from 'react';
import Link from 'next/link';

export default function ListChats() {
  return (
    <>
      <header className="bg-slate-600">
        <h1>Aplicacion chat</h1>
      </header>
      <Link href="/chat">
        <section className="flex flex-col gap-1">
          <article className="flex bg-slate-100 p-2 gap-5">
            <div>
              <img
                src="https://laboratoriosniam.com/wp-content/uploads/2018/07/michael-dam-258165-unsplash_WEB2.jpg"
                alt="ni idea"
                className="rounded-full w-14 h-14"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-sm">Maria</h1>
              <p className="text-sm">Hola como estas?</p>
            </div>
          </article>
        </section>
      </Link>
    </>
  );
}
