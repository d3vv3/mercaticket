import React, { useState } from "react";
import { TicketLoading } from "./";

const TicketForm = ({ onTicketProcessed }) => {
  const [ticketFile, setTicketFile] = useState(new File([], "empty"));
  const [processingTicket, setProcessingTicket] = useState(false);

  const processTicket = async () => {
    setProcessingTicket(true);
    const formData = new FormData();
    formData.append("file", ticketFile);
    const response = await fetch("https://mercaapi.sgn.space/api/ticket/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });
    const data = await response.json();
    onTicketProcessed(data);
    setTicketFile(new File([], "empty"));
    setProcessingTicket(false);
  };

  return (
    <div className="flex-col items-center">
      <form className="flex items-center space-x-6" onSubmit={(e) => {
        e.preventDefault();
        processTicket();
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
            " name="ticket" id="ticket" required
            onChange={(event) => {
              const file = event.target.files[0];
              setTicketFile(file);
            }}
          />
        </label>
        <button type="submit" className="block text-sm text-white
          bg-green-600 hover:bg-green-700 drop-shadow-xl hover:drop-shadow-lg
          py-2 px-4 z-0 rounded-full font-semibold"
          data-umami-event="send_ticket"
          data-umami-event-format={ticketFile.type}
        >
          Enviar
        </button>
      </form>
      <TicketLoading processingTicket={processingTicket} />
    </div>
  );
};

export default TicketForm;
