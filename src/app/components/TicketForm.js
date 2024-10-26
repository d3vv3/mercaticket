import React, { useState } from "react";
import { TicketLoading } from "./";

function mergeTicketItems(tickets) {
  // Use an object to group items by product ID
  const mergedItems = {};
  
  tickets.forEach(ticket => {
    ticket.items.forEach(item => {
      const id = item.product.id;
      
      if (mergedItems[id]) {
        mergedItems[id].quantity += item.quantity;
        mergedItems[id].total_price += item.total_price;
      } else {
        mergedItems[id] = { ...item };
      }
    });
  });
  
  return Object.values(mergedItems);
}

const TicketForm = ({ onTicketProcessed }) => {
  const [ticketFiles, setTicketFiles] = useState([]);
  const [processingTickets, setProcessingTickets] = useState(false);

  const processTickets = async () => {
    setProcessingTickets(true);
    const responses = await Promise.allSettled(
      Array.from(ticketFiles).map(async (ticketFile) => {
        const formData = new FormData();
        formData.append("file", ticketFile);
        const response = await fetch("https://mercaapi.sgn.space/api/ticket/", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
          },
          body: formData,
        });
        return response.json();
      })
    );
    if (responses.some(response => response.status === "rejected")) alert("Hubo un error al procesar uno o más tickets");
    onTicketProcessed({
      items: mergeTicketItems(
        responses
          .filter(response => response.status === "fulfilled")
          .map(response => response.value))
    });
    setTicketFiles([]);
    setProcessingTickets(false);
  };

  return (
    <div className="flex-col items-center">
      <form className="flex items-center space-x-6" onSubmit={(e) => {
        e.preventDefault();
        processTickets();
      }}>
        <label className="block">
          <span className="sr-only">Elige un ticket</span>
          <input type="file" accept=".pdf, image/png, image/jpeg"
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-green-50 file:text-green-700
            hover:file:bg-green-100
            " name="ticket" id="ticket" multiple required
            onChange={(event) => {
              setTicketFiles(event.target.files);
            }}
          />
        </label>
        <button type="submit" className="block text-sm text-white
          bg-green-600 hover:bg-green-700 drop-shadow-xl hover:drop-shadow-lg
          py-2 px-4 z-0 rounded-full font-semibold"
          data-umami-event="send_ticket"
          data-umami-event-format={Array.from(ticketFiles).map(file => file.type)}
        >
          Enviar
        </button>
      </form>
      <TicketLoading processingTickets={processingTickets} />
    </div>
  );
};

export default TicketForm;
