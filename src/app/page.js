"use client";
import { useState, useEffect } from "react";
import React from "react";
import { TicketList, TicketForm, TicketStats, ReportModal, Welcome } from "./components";

export default function Home() {
  const [ticketStatistics, setTicketStatistics] = useState({});
  const [itemToReport, setItemToReport] = useState({});

  const switchUseForStats = (index) => {
    const newProducts = [...ticketStatistics.items];
    newProducts[index].product.is_food = !newProducts[index].product?.is_food;
    setTicketStatistics({ ...ticketStatistics, items: newProducts });
    umami.track('switch_use_for_stats', { product_id: newProducts[index].product.id, is_food: newProducts[index].product.is_food });
  }

  useEffect(() => {
    if (Object.keys(itemToReport).length !== 0) {
      umami.track("open_report_modal", { product_id: itemToReport?.product?.id });
    }
  }, [itemToReport]);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-4 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] dark:bg-slate-900">
      <ReportModal isOpen={Object.keys(itemToReport).length !== 0} onClose={() => setItemToReport({})} item={itemToReport} />
      <header className="row-start-1 text-center">
        <h1 className="sm:text-6xl text-4xl font-bold mb-8">MercaTicket</h1>
      </header>
      <main className="row-start-2 w-full flex flex-col justify-center h-full pb-8">
        {(ticketStatistics?.items || []).length === 0 ? (
            <React.Fragment>
              <Welcome />
              <div className="flex flex-row flex-wrap gap-8 justify-center sm:mt-24 mt-8">
                <TicketForm onTicketProcessed={setTicketStatistics} />
              </div>
            </React.Fragment>
        ) : (
          <div className="flex flex-row flex-wrap gap-8 justify-center">
            <div>
              <TicketList ticketStatistics={ticketStatistics} switchUseForStats={switchUseForStats} reportItemModal={setItemToReport} />
            </div>
            <div>
              <TicketStats ticketStatistics={ticketStatistics} />
            </div>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center mt-2">
        mercaticket [at] sgn [dot] space
      </footer>
    </div>
  );
}
