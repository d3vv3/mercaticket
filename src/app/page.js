"use client";
import { useState } from "react";
import React from "react";
import { TicketList, TicketForm } from "./components";

export default function Home() {
  const [ticketStatistics, setTicketStatistics] = useState({});

  const switchUseForStats = (index) => {
    const newProducts = [...ticketStatistics.items];
    newProducts[index].product.is_food = !newProducts[index].product?.is_food;
    setTicketStatistics({ ...ticketStatistics, items: newProducts });
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start md:gap-8">
        <h1 className="text-4xl font-bold mb-8">MercaTicket</h1>
        {(ticketStatistics?.items || []).length === 0 ? (
          <TicketForm onTicketProcessed={setTicketStatistics} />
        ) : (
          <TicketList ticketStatistics={ticketStatistics} switchUseForStats={switchUseForStats} />
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Juanito Rojete te queremos
      </footer>
    </div>
  );
}
