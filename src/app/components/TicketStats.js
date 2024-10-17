import { useEffect, useState } from 'react';
import React from 'react';

const TicketStats = ({ ticketStatistics }) => {

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
      costPerDailyKcal: safeDivide(accumulated.totalPrice * 2000, accumulated.totalCalories),
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
    <div className="bg-white shadow-xl border-2 border-gray-200 rounded-2xl p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Ticket Statistics</h2>
      {Object.keys(totalStats).length > 0 && (
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b"><td className="py-2 font-bold">Total Calories:</td><td className="py-2 text-right">{totalStats.totalCalories?.toFixed(2)} kcal</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Total Proteins:</td><td className="py-2 text-right">{totalStats.totalProteins?.toFixed(2)} g</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Total Carbs:</td><td className="py-2 text-right">{totalStats.totalCarbs?.toFixed(2)} g</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Total Fat:</td><td className="py-2 text-right">{totalStats.totalFat?.toFixed(2)} g</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Total Fiber:</td><td className="py-2 text-right">{totalStats.totalFiber?.toFixed(2)} g</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Total Cost:</td><td className="py-2 text-right">€{totalStats.totalPrice?.toFixed(2)}</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Fat Percentage:</td><td className="py-2 text-right">{totalStats.fatPercentage?.toFixed(2)}%</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Carbs Percentage:</td><td className="py-2 text-right">{totalStats.carbsPercentage?.toFixed(2)}%</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Protein Percentage:</td><td className="py-2 text-right">{totalStats.proteinPercentage?.toFixed(2)}%</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Fiber Percentage:</td><td className="py-2 text-right">{totalStats.fiberPercentage?.toFixed(2)}%</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Cost per Daily Kcal:</td><td className="py-2 text-right">€{totalStats.costPerDailyKcal?.toFixed(2)}</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Cost per 100g Protein:</td><td className="py-2 text-right">€{totalStats.costPer100gProtein?.toFixed(2)}</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Cost per 100g Carb:</td><td className="py-2 text-right">€{totalStats.costPer100gCarb?.toFixed(2)}</td></tr>
            <tr className="border-b"><td className="py-2 font-bold">Cost per 100g Fat:</td><td className="py-2 text-right">€{totalStats.costPer100gFat?.toFixed(2)}</td></tr>
            <tr><td className="py-2 font-bold">Kcal per Euro:</td><td className="py-2 text-right">{totalStats.kcalPerEuro?.toFixed(2)} kcal</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TicketStats;
