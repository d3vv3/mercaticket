import React from "react";
import { TicketItem } from "./";

const TicketList = ({ ticketStatistics, switchUseForStats }) => {
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
      {(ticketStatistics?.items || []).map((item, index) => (
        <TicketItem key={index} item={item} index={index} switchUseForStats={switchUseForStats} />
      ))}
    
    </div>
    <div className="grid grid-cols-9 gap-y-1 sm:max-w-3xl w-full text-sm md:tx-base px-2 md:px-4">
      <div className="flex items-center col-start-9 font-bold col-span-1">
        {ticketStatistics.items
          .reduce((total, item) => item.product?.is_food ? total + Number(item.total_price) : total, 0)
          .toFixed(2)}€
      </div>
    </div>
  </>
  );
};

export default TicketList;
