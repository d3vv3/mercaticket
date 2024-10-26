import React from "react";
import { useState } from "react";
import { TicketItem } from "./";

const TicketList = ({ ticketStatistics, switchUseForStats, reportItemModal }) => {

  const [detailedView, setDetailedView] = useState(false);

  // Sort items by cost per daily kcal (2000 kcal) in descending order
  const sortedItems = [...(ticketStatistics?.items || [])].sort((a, b) => {
    return (b.stats?.cost_per_daily_kcal || 0) - (a.stats?.cost_per_daily_kcal || 0);
  });

  return (
    <>
      <label className="inline-flex items-center justify-end cursor-pointer w-full md:px-4">
        <input type="checkbox" value={detailedView} onChange={() => setDetailedView(!detailedView)} className="sr-only peer" />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Vista detallada</span>
      </label>
      <div className="grid grid-cols-9 gap-y-1 sm:max-w-3xl w-full text-sm md:tx-base px-2 md:px-4">
        <div className="col-span-1 snap-start"></div>
        <div className="font-semibold col-span-4 sm:text-xl">Descripción</div>
        <div className="flex font-semibold justify-center col-span-1 sm:text-xl">Uds.</div>
        <div className="flex font-semibold justify-center col-span-2 sm:text-xl">Precio ud.</div>
        <div className="flex font-semibold justify-center col-span-1 sm:text-xl">Total</div>
      </div>
      <div className="grid grid-cols-9 sm:max-w-3xl w-full text-sm md:tx-base px-2 md:px-4 max-h-svh overflow-y-scroll snap-mandatory snap-y h-4/6">
        {sortedItems.map((item, index) => (
          <TicketItem 
            key={index} 
            item={item} 
            index={ticketStatistics.items.indexOf(item)} // Use original index for switchUseForStats
            switchUseForStats={switchUseForStats}
            setItemToReport={reportItemModal}
            detailedView={detailedView}
          />
        ))}
      </div>
      <div className="grid grid-cols-9 gap-y-1 sm:max-w-3xl w-full text-sm md:tx-base px-2 md:px-4">
        <div className="flex justify-center col-start-9 font-bold col-span-1">
          {ticketStatistics.items
            .reduce((total, item) => item.product?.is_food ? total + Number(item.total_price) : total, 0)
            .toFixed(2)}€
        </div>
      </div>
    </>
  );
};

export default TicketList;
