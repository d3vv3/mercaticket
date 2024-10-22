import React from 'react';
import exampleImage from '../assets/example.png';
import Image from 'next/image';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-full">
        <Image
          src={exampleImage}
          alt="Example"
          sizes="100vw"
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }}
          className="object-contain rounded-lg"
        />
      </div>
      <div className="flex flex-wrap justify-center items-start gap-4 p-4">
        <div className="flex-1 min-w-[250px] sm:h-60 max-w-sm bg-white p-6 rounded-lg shadow-lg flex flex-col dark:bg-slate-700">
          <h2 className="text-xl font-bold mb-4">Selecciona tus tickets</h2>
          <p className="flex-grow">Selecciona tus PDFs o fotos de tus tickets de compra.</p>
          <div className="mt-2 text-center text-sm font-bold text-green-600">1</div>
        </div>
        <div className="flex-1 min-w-[250px] sm:h-60 max-w-sm bg-white p-6 rounded-lg shadow-lg flex flex-col dark:bg-slate-700">
          <h2 className="text-xl font-bold mb-4">Sube los tickets</h2>
          <p className="flex-grow">Encontramos los productos que has comprado, extraemos su información nutricional y calculamos varias estadísticas.</p>
          <div className="mt-2 text-center text-sm font-bold text-green-600">2</div>
        </div>
        <div className="flex-1 min-w-[250px] sm:h-60 max-w-sm bg-white p-6 rounded-lg shadow-lg flex flex-col dark:bg-slate-700">
          <h2 className="text-xl font-bold mb-4">Analiza tus compras</h2>
          <p className="flex-grow">Obtén información nutricional de tus compras, optimiza lo que gastas en comer por cada día y encuentra los productos más caros que menos alimentan!</p>
          <div className="mt-2 text-center text-sm font-bold text-green-600">3</div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

