import { useEffect, useState } from 'react';
import React from 'react';

const TicketStats = ({ ticketStatistics, dailyKcal = 2000 }) => {

  const [totalStats, setTotalStats] = useState({});

  function calculateAccumulatedMetrics(items) {
    // Initialize accumulator
    const accumulated = {
      totalCalories: 0,
      totalProteins: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalFiber: 0,
      totalPrice: 0,
      totalKcal: 0,
    };

    // Process each item
    items.forEach(item => {
      if (!item.product?.is_food) return;
      accumulated.totalCalories += item?.stats?.calories ?? 0;
      accumulated.totalProteins += item?.stats?.proteins ?? 0;
      accumulated.totalCarbs += item?.stats?.carbs ?? 0;
      accumulated.totalFat += item?.stats?.fat ?? 0;
      accumulated.totalFiber += item?.stats?.fiber ?? 0;
      accumulated.totalPrice += item?.total_price ?? 0;
    });

    // Calculate accumulated metrics
    const safeDivide = (a, b) => (b === 0 ? 0 : a / b);
    
    const accumulatedMetrics = {
      kcalPerEuro: safeDivide(accumulated.totalCalories, accumulated.totalPrice),
      costPerDailyKcal: safeDivide(accumulated.totalPrice * dailyKcal, accumulated.totalCalories),
      costPer100gProtein: safeDivide(accumulated.totalPrice * 100, accumulated.totalProteins),
      costPer100gCarb: safeDivide(accumulated.totalPrice * 100, accumulated.totalCarbs),
      costPer100gFat: safeDivide(accumulated.totalPrice * 100, accumulated.totalFat),
      proteinPercentage: safeDivide(accumulated.totalProteins, accumulated.totalProteins + accumulated.totalCarbs + accumulated.totalFat + accumulated.totalFiber) * 100,
      carbsPercentage: safeDivide(accumulated.totalCarbs, accumulated.totalProteins + accumulated.totalCarbs + accumulated.totalFat + accumulated.totalFiber) * 100,
      fatPercentage: safeDivide(accumulated.totalFat, accumulated.totalProteins + accumulated.totalCarbs + accumulated.totalFat + accumulated.totalFiber) * 100,
      fiberPercentage: safeDivide(accumulated.totalFiber, accumulated.totalProteins + accumulated.totalCarbs + accumulated.totalFat + accumulated.totalFiber) * 100,
    };

    return { ...accumulated, ...accumulatedMetrics };
  }

  useEffect(() => {
    const stats = calculateAccumulatedMetrics(ticketStatistics.items);
    setTotalStats(stats);
  }, [ticketStatistics]);

  return (
    <div className="bg-white shadow-xl border-2 border-gray-200 rounded-2xl p-6 w-full max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Estadísticas del ticket</h2>
      {Object.keys(totalStats).length > 0 && (
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b"><td className="py-2 font-bold">Calorías totales:</td><td className="py-2 text-right">{totalStats.totalCalories?.toFixed(2)} kcal</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Duración en días:</td><td className="py-2 text-right">{Math.round(totalStats.totalCalories/dailyKcal)} días</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Proteinas totales:</td><td className="py-2 text-right">{totalStats.totalProteins?.toFixed(2)} g</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Hidratos de carbono totales:</td><td className="py-2 text-right">{totalStats.totalCarbs?.toFixed(2)} g</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Grasas totales:</td><td className="py-2 text-right">{totalStats.totalFat?.toFixed(2)} g</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Fibras totales:</td><td className="py-2 text-right">{totalStats.totalFiber?.toFixed(2)} g</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Coste total:</td><td className="py-2 text-right">{totalStats.totalPrice?.toFixed(2)} €</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Porcentaje grasa:</td><td className="py-2 text-right">{totalStats.fatPercentage?.toFixed(2)}%</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Porcentaje hidratos de carbono:</td><td className="py-2 text-right">{totalStats.carbsPercentage?.toFixed(2)}%</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Porcentaje proteina:</td><td className="py-2 text-right">{totalStats.proteinPercentage?.toFixed(2)}%</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Porcentaje fibra:</td><td className="py-2 text-right">{totalStats.fiberPercentage?.toFixed(2)}%</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Coste por 2000 kcal diarias:</td><td className="py-2 text-right">{totalStats.costPerDailyKcal?.toFixed(2)} €</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Coste por 100 g de proteina:</td><td className="py-2 text-right">{totalStats.costPer100gProtein?.toFixed(2)} €</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Coste por 100 g de hidratos de carbono:</td><td className="py-2 text-right">{totalStats.costPer100gCarb?.toFixed(2)} €</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Coste por 100 g de grasa:</td><td className="py-2 text-right">{totalStats.costPer100gFat?.toFixed(2)} €</td></tr>
            <tr><td className="py-2 font-bold">Calorías por euro:</td><td className="py-2 text-right">{totalStats.kcalPerEuro?.toFixed(2)} kcal</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TicketStats;
