"use client";
import { useState } from "react";
import React from "react";
import { TicketList, TicketForm, TicketStats } from "./components";

export default function Home() {
  const [ticketStatistics, setTicketStatistics] = useState({});

  const switchUseForStats = (index) => {
    const newProducts = [...ticketStatistics.items];
    newProducts[index].product.is_food = !newProducts[index].product?.is_food;
    setTicketStatistics({ ...ticketStatistics, items: newProducts });
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-4 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 text-center">
        <h1 className="sm:text-6xl text-4xl font-bold mb-8">MercaTicket</h1>
      </header>
      <main className="row-start-2 w-full flex flex-col justify-center">
        {(ticketStatistics?.items || []).length === 0 ? (
            <div className="flex flex-row flex-wrap gap-8 justify-center">
              <TicketForm onTicketProcessed={setTicketStatistics} />
            </div>
        ) : (
          <div className="flex flex-row flex-wrap gap-8 justify-center">
            <div>
              <TicketList ticketStatistics={ticketStatistics} switchUseForStats={switchUseForStats} />
            </div>
            <div>
              <TicketStats ticketStatistics={ticketStatistics} />
            </div>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-8">
        Juanito Rojete te queremos
      </footer>
    </div>
  );
}
