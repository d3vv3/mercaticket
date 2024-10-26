import React, { useState } from 'react';

const ReportModal = ({ isOpen, onClose, item }) => {

  const handleReportWrongMatch = async () => {
    const reportData = {
      original_name: item?.original_name,
      original_price: item?.unit_price,
      wrong_match_id: item?.product?.id
    };
    const response = await fetch('https://mercaapi.sgn.space/api/reports/wrong-match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reportData)
    });
    if (response.ok) {
      alert('Producto reportado correctamente');
      onClose();
    } else {
      console.error('Error reporting wrong match');
    }
  };

  const handleReportNutritionalInfo = async () => {
    const reportData = {
      product_id: item?.product?.id,
      nutrition_id: item?.product?.nutritional_information?.id
    };
    const response = await fetch('https://mercaapi.sgn.space/api/reports/wrong-nutrition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reportData)
    });
    if (response.ok) {
      alert('Información nutricional reportada correctamente');
      onClose();
    } else {
      console.error('Error reporting nutritional info');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10" onClick={handleOverlayClick}>
      <div className="bg-white rounded-lg p-8 max-w-md w-full dark:bg-slate-800">
        <h2 className="text-2xl font-bold mb-4">Reportar un problema</h2>
        <p className="text-gray-600 dark:text-gray-200"><span className="font-bold">Producto en ticket:</span> {item?.original_name}</p>
        <p className="text-gray-600 mb-4 dark:text-gray-200"><span className="font-bold">Producto en MercaTicket:</span> {item?.product?.name}</p>
          <div className="flex justify-end gap-x-8">
            <button
              type="button"
              onClick={handleReportNutritionalInfo}
              className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-600"
              data-umami-event="report_nutritional_info"
              data-umami-event-product-id={item?.product?.id}
            >
              Información nutricional errónea
            </button>
            <button
              type="button"
              onClick={handleReportWrongMatch}
              className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-600"
              data-umami-event="report_wrong_match"
              data-umami-event-product-id={item?.product?.id}
            >
              Producto erróneo
            </button>
          </div>
      </div>
    </div>
  );
};

export default ReportModal;

