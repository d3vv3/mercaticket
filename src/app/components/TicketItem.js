import React from "react";
import Image from "next/image";

const TicketItem = ({ item, index, switchUseForStats, setItemToReport, dailyKcal = 2000, detailedView = false }) => {
  return (
    <React.Fragment>
      <div className={`flex snap-start items-center justify-center col-span-1 rounded-sm mr-1 ${item.product?.is_food ? "" : "grayscale" }`} onClick={() => switchUseForStats(index)}>
        <Image
          src={`${item.product?.images.sort((a, b) => a.perspective - b.perspective)[0]?.thumbnail_url}`}
          sizes="100vw"
          alt={item.product?.name}
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }}
          className="object-contain rounded-lg"
        />
      </div>
      <div className={`flex items-center col-span-4 rounded-l-lg pl-2 border-l-2 border-y-2 ${item.product?.is_food ? "bg-green-50 dark:bg-green-900/50 border-green-700" : "line-through bg-gray-100 dark:bg-gray-700"}`} onClick={() => switchUseForStats(index)}>{item.product?.name}</div>
      <div className={`flex items-center justify-center col-span-1 border-y-2 ${item.product?.is_food ? "bg-green-50 dark:bg-green-900/50 border-green-700" : "line-through dark:bg-gray-700 bg-gray-100"}`} onClick={() => switchUseForStats(index)}>{item.quantity}</div>
      <div className={`flex items-center justify-center col-span-2 border-y-2 ${item.product?.is_food ? "bg-green-50 dark:bg-green-900/50 border-green-700" : "line-through dark:bg-gray-700 bg-gray-100"}`} onClick={() => switchUseForStats(index)}>{Number(item.unit_price).toFixed(2)}</div>
      <div className={`flex items-center justify-center col-span-1 rounded-r-lg border-r-2 border-y-2 ${item.product?.is_food ? "bg-green-50 dark:bg-green-900/50 border-green-700" : "line-through dark:bg-gray-700 bg-gray-100" }`} onClick={() => switchUseForStats(index)}>{Number(item.total_price).toFixed(2)}</div>
      { (item.product?.is_food && detailedView) && (
        <React.Fragment>
        <div className="flex items-center justify-center col-start-2 col-span-8 border-2 border-x-2 rounded-lg border-amber-200">
          <div className="flex flex-row text-xs sm:text-sm flex-wrap gap-x-4 p-2 sm:p-2">
            <div className="flex items-center justify-center col-span-2"><span className="font-bold">Coste/{dailyKcal} kcal diarias: </span> {item.stats?.cost_per_daily_kcal?.toFixed(2) ?? "N/A"} €</div>
            <div className="flex items-center justify-center col-span-2"><span className="font-bold">Proteínas: </span> {item.product?.nutritional_information?.protein?.toFixed(2) ?? "N/A"}%</div>
            <div className="flex items-center justify-center col-span-2"><span className="font-bold">Hidratos: </span> {item.product?.nutritional_information?.total_carbohydrate?.toFixed(2) ?? "N/A"}%</div>
            <div className="flex items-center justify-center col-span-2"><span className="font-bold">Grasas: </span> {item.product?.nutritional_information?.total_fat?.toFixed(2) ?? "N/A"}%</div>
          </div>
        </div>
        <div className={`flex snap-start items-start justify-end col-start-1 text-gray-500 underline col-span-9 hover:cursor-pointer mb-2 ${item.product?.is_food ? "" : "grayscale" }`} onClick={() => setItemToReport(item)}>¿Incorrecto? Reportar</div>
        </React.Fragment>
      )
      }
    </React.Fragment>
  );
}

export default TicketItem;
