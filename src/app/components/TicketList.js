import React from "react";
import { TicketItem } from "./";

const TicketList = ({ ticketStatistics, switchUseForStats }) => {
  // Sort items by cost per daily kcal (2000 kcal) in descending order
  const sortedItems = [...(ticketStatistics?.items || [])].sort((a, b) => {
    return (b.stats?.cost_per_daily_kcal || 0) - (a.stats?.cost_per_daily_kcal || 0);
  });

  return (
    <>
      <div className="grid grid-cols-9 gap-y-1 sm:max-w-3xl w-full text-sm md:tx-base px-2 md:px-4">
        <div className="col-span-1 snap-start"></div>
        <div className="font-semibold col-span-4 sm:text-xl">Descripción</div>
        <div className="flex font-semibold justify-center col-span-1 sm:text-xl">Uds.</div>
        <div className="flex font-semibold justify-center col-span-2 sm:text-xl">Precio ud.</div>
        <div className="flex font-semibold justify-center col-span-1 sm:text-xl">Total</div>
      </div>
      <div className="grid grid-cols-9 sm:max-w-3xl w-full text-sm md:tx-base px-2 md:px-4 max-h-svh overflow-scroll snap-mandatory snap-y h-4/6">
        {sortedItems.map((item, index) => (
          <TicketItem 
            key={index} 
            item={item} 
            index={ticketStatistics.items.indexOf(item)} // Use original index for switchUseForStats
            switchUseForStats={switchUseForStats} 
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
