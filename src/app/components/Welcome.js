import React from 'react';

const Welcome = () => {
  return (
    <div className="flex flex-wrap justify-center items-start gap-4 p-4">
      <div className="flex-1 min-w-[250px] sm:h-60 max-w-sm bg-white p-6 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-xl font-bold mb-4">Selecciona tus tickets</h2>
        <p className="flex-grow">Selecciona tus PDFs o fotos de tus tickets de compra.</p>
        <div className="mt-2 text-center text-sm font-bold text-green-600">1</div>
      </div>
      <div className="flex-1 min-w-[250px] sm:h-60 max-w-sm bg-white p-6 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-xl font-bold mb-4">Sube los tickets</h2>
        <p className="flex-grow">Encontramos los productos que has comprado, extraemos su información nutricional y calculamos varias estadísticas.</p>
        <div className="mt-2 text-center text-sm font-bold text-green-600">2</div>
      </div>
      <div className="flex-1 min-w-[250px] sm:h-60 max-w-sm bg-white p-6 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-xl font-bold mb-4">Analiza tus compras</h2>
        <p className="flex-grow">Obtén información nutricional de tus compras, optimiza lo que gastas en comer por cada día y encuentra los productos más caros que menos alimentan!</p>
        <div className="mt-2 text-center text-sm font-bold text-green-600">3</div>
      </div>
    </div>
  );
};

export default Welcome;

