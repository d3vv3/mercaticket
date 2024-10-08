"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";

export default function Home() {

  const [ticketFile, setTicketFile] = useState(new File([], "empty"));
  const [ticketData, setTicketData] = useState({});
  const [processingTicket, setProcessingTicket] = useState(false);
  const [products, setProducts] = useState([]);
  // const [productsWithMatches, setProductsWithMatches] = useState([]);

    useEffect(() => {
      setProcessingTicket(false);
      setProducts(ticketData.items);
    }, [ticketData]);

    // useEffect(() => {
    //     const closestProducts = products;
    //     (products || []).map((product) => {
    //         const matches = fetch("https://mercaapi.sgn.space/api/products/closest?" + new URLSearchParams({
    //           name: product.name,
    //           unit_price: product.unit_price || product.total_price,
    //           max_results: 5,
    //         }).toString(),
    //         {
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });
    //         const matchesData = matches.json();
    //         const bestMatchId = matchesData?.[0]?.product?.id;
    //         const bestMatch = fetch(`https://mercaapi.sgn.space/api/products/${bestMatchId}`);
    //         const bestMatchData = bestMatch.json();
    //         const data = {
    //             bestMatch: bestMatchData,
    //             matches: matchesData
    //         };
    //         closestProducts.push({
    //             ...product,
    //             ...data
    //         });
    //     });
    //     setProductsWithMatches(closestProducts);
    // }, [products]);


    const processTicket = async () => {
      setProcessingTicket(true);
      const formData = new FormData();
      formData.append("file", ticketFile);
      const response = await fetch("https://mercaapi.sgn.space/api/ticket/", {
        method: "POST",
        headers: {
          'accept': 'application/json',
        },
        body: formData,
      });
      const data = await response.json();
      setTicketData(data);
    };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start md:gap-8">
        <h1 className="text-4xl font-bold mb-8">MercaTicket</h1>
            { (products || []).length == 0 ?
              (
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
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100
                        " name="ticket" id="ticket" required
                        onChange={(event) => {
                          const file = event.target.files[0];
                          setTicketFile(file);
                        }}
                      />
                    </label>
                    <button type="submit" className="block text-sm text-white
                      bg-violet-600 hover:bg-violet-700
                      py-2 px-4 rounded-full font-semibold"
                    >
                      Enviar
                    </button>
                  </form>
                  {processingTicket ? (
                  <li class="flex items-center w-full justify-center mt-8">
                    <div role="status">
                    <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-violet-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                    <span class="sr-only">Cargando...</span>
                    </div>
                      Analizando ticket...
                  </li>
                  ) : (null)}
                </div>
              ) : (
                  <div className="grid grid-cols-10 gap-4 w-full text-sm md:tx-base px-2 md:px-4">
                    <div className="col-span-1"></div>
                    <div className="font-semibold col-span-4">Descripción</div>
                    <div className="flex font-semibold justify-center col-span-2">Cantidad</div>
                    <div className="flex font-semibold justify-center col-span-2">Precio ud.</div>
                    <div className="flex font-semibold justify-center col-span-1">Total</div>
                    {(products).map((product, index) => (
                      <React.Fragment key={index}>
                        <div className="flex items-center justify-center col-span-1 h-4 w-4 sm:h-12 sm:w-12">
                          <Image src="https://prod-mercadona.imgix.net/images/a5b8c9725f30deaad19daa2653534c88.jpg?fit=crop&h=300&w=300" sizes="100vw" alt={product.name} width={0} height={0} style={{ width: '100%', height: 'auto' }} className="object-contain" />
                        </div>
                        <div className="flex items-center col-span-4">{product.name}</div>
                        <div className="flex items-center justify-center col-span-2">{product.quantity}</div>
                        <div className="flex items-center justify-center col-span-2">{product.price_per_unit}</div>
                        <div className="flex items-center justify-center col-span-1">{product.total_price}</div>
                      </React.Fragment>
                    ))}
                    <div className="flex items-center col-start-10 font-bold col-span-1">{ticketData?.total_price}</div>
                  </div>
              )
            }
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Juanito Rojete te queremos
      </footer>
    </div>
  );
}
