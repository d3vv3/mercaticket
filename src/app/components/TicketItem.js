import React from "react";
import Image from "next/image";

const TicketItem = ({ item, index, switchUseForStats, dailyKcal = 2000 }) => {
  return (
    <React.Fragment>
      <div className={`flex snap-start items-center justify-center col-span-1 ${item.product?.is_food ? "" : "grayscale" }`} onClick={() => switchUseForStats(index)}>
        <Image
          src={`${item.product?.images.sort((a, b) => a.perspective - b.perspective)[0]?.thumbnail_url}`}
          sizes="100vw"
          alt={item.product?.name}
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }}
          className="object-contain"
        />
      </div>
      <div className={`flex items-center col-span-4 rounded-l-lg pl-2 border-l-2 border-y-2 ${item.product?.is_food ? "bg-green-50 border-green-700" : "line-through bg-gray-100 mb-2"}`} onClick={() => switchUseForStats(index)}>{item.product?.name}</div>
      <div className={`flex items-center justify-center col-span-1 border-y-2 ${item.product?.is_food ? "bg-green-50 border-green-700" : "line-through bg-gray-100 mb-2"}`} onClick={() => switchUseForStats(index)}>{item.quantity}</div>
      <div className={`flex items-center justify-center col-span-2 border-y-2 ${item.product?.is_food ? "bg-green-50 border-green-700" : "line-through bg-gray-100 mb-2"}`} onClick={() => switchUseForStats(index)}>{Number(item.unit_price).toFixed(2)}</div>
      <div className={`flex items-center justify-center col-span-1 rounded-r-lg border-r-2 border-y-2 ${item.product?.is_food ? "bg-green-50 border-green-700" : "line-through bg-gray-100 mb-2" }`} onClick={() => switchUseForStats(index)}>{Number(item.total_price).toFixed(2)}</div>
      { item.product?.is_food && (
        <div className="flex items-center justify-center col-start-2 col-span-8 border-2 border-x-2 rounded-lg border-amber-200 mb-2">
          <div className="flex flex-row gap-x-4">
            <div className="flex items-center justify-center col-span-2"><span className="font-bold">Coste/{dailyKcal} kcal diarias: </span> {item.stats?.cost_per_daily_kcal?.toFixed(2)} €</div>
            <div className="flex items-center justify-center col-span-2"><span className="font-bold">Proteínas: </span> {item.product?.nutritional_information?.protein?.toFixed(2)}%</div>
            <div className="flex items-center justify-center col-span-2"><span className="font-bold">Hidratos: </span> {item.product?.nutritional_information?.total_carbohydrate?.toFixed(2)}%</div>
            <div className="flex items-center justify-center col-span-2"><span className="font-bold">Grasas: </span> {item.product?.nutritional_information?.total_fat?.toFixed(2)}%</div>
          </div>
        </div>
      )
      }
    </React.Fragment>
  );
}

export default TicketItem;
