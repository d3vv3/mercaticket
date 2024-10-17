import React from "react";
import Image from "next/image";

const TicketItem = ({ item, index, switchUseForStats }) => {
  return (
    <React.Fragment>
      <div className={`flex items-center justify-center col-span-1 ${item.product?.is_food ? "" : "grayscale" }`} onClick={() => switchUseForStats(index)}>
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
      <div className={`flex items-center col-span-4 rounded-l-lg pl-2 border-l-2 border-y-2 ${item.product?.is_food ? "bg-green-50 border-green-700" : "line-through bg-gray-100"}`} onClick={() => switchUseForStats(index)}>{item.product?.name}</div>
      <div className={`flex items-center justify-center col-span-1 border-y-2 ${item.product?.is_food ? "bg-green-50 border-green-700" : "line-through bg-gray-100" }`} onClick={() => switchUseForStats(index)}>{item.quantity}</div>
      <div className={`flex items-center justify-center col-span-2 border-y-2 ${item.product?.is_food ? "bg-green-50 border-green-700" : "line-through bg-gray-100" }`} onClick={() => switchUseForStats(index)}>{Number(item.unit_price).toFixed(2)}</div>
      <div className={`flex items-center justify-center col-span-1 rounded-r-lg border-r-2 border-y-2 ${item.product?.is_food ? "bg-green-50 border-green-700" : "line-through bg-gray-100" }`} onClick={() => switchUseForStats(index)}>{Number(item.total_price).toFixed(2)}</div>
    </React.Fragment>
  );
}

export default TicketItem;
