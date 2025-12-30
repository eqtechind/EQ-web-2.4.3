"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import Navbar from "../eqfund/_components/Navbar";

export default function FundingRounds() {
  const [activeRound, setActiveRound] = useState({
    name: "EQFund",
    fundsRequested: 250000,
    startedOn: "19/04/2025",
    fundsCollected: 175000,
  });

  const completedRounds = [
    { name: "EQFund", funds: 100000, endedOn: "23/02/2025" },
    { name: "EQRraise", funds: 45000, endedOn: "17/12/2024" },
    { name: "EQRraise", funds: 95000, endedOn: "08/09/2024" },
    { name: "EQFund", funds: 125000, endedOn: "14/06/2024" },
  ];

  const investors = [
    { name: "Austin Loyd", invested: 35000, equity: "0.7%" },
    { name: "Shravan Bhoyar", invested: 20000, equity: "0.5%" },
    { name: "Aayush Joshi", invested: 20000, equity: "0.5%" },
    { name: "Priya Sharma", invested: 12000, equity: "0.3%" },
  ];

  const progress =
    (activeRound.fundsCollected / activeRound.fundsRequested) * 100;

  return (
    <div className="px-[10vh]">
      <Navbar />
      <div className="min-h-screen p-20   grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-4">
          <h2 className="text-lg font-semibold flex items-center gap-2  mb-4 pb-1">
            Active Round
            <div className="h-[1px] bg-slate-300 w-[70%]"></div>
          </h2>
          <Card className="p-3 bg-blue-50 mb-6 cursor-pointer">
            <h3 className="font-bold">{activeRound.name}</h3>
            <p className="text-sm text-gray-600">
              Funds Requested: ${activeRound.fundsRequested.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              Started on: {activeRound.startedOn}
            </p>
          </Card>

          <h2 className="text-lg font-semibold flex items-center gap-2  mb-4 pb-1">
            Complete Round
            <div className="h-[1px] bg-slate-300 w-[60%]"></div>
          </h2>
          <div className="space-y-3">
            {completedRounds.map((round, idx) => (
              <Card key={idx} className="p-3 hover:bg-gray-50 flex gap-4 cursor-pointer">
                <div className="w-[10vh] h-[10vh] bg-gray-400 rounded-md"></div>
              <div>
              <h3 className="font-bold">{round.name}</h3>
                <p className="text-sm text-green-600">
                  Funds Collected: ${round.funds.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Ended on: {round.endedOn}
                </p>
              </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Right Panel */}
        <Card className="p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2  mb-4 pb-1">
            About Round
            <div className="h-[1px] bg-slate-300 w-[70%]"></div>
          </h2>
          <div className="mb-6">
            <Progress value={progress} className="h-3" />
            <p className="mt-2 font-medium">
              Funds collected: ${activeRound.fundsCollected.toLocaleString()}
            </p>
          </div>

          <h3 className="text-md font-semibold mb-3">People who invested:</h3>
          <div className="space-y-3">
            {investors.map((inv, idx) => (
              <Card
                key={idx}
                className="p-3 flex items-center justify-around hover:bg-gray-50 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                <div>
                  <p className="font-medium">{inv.name}</p>
                  <p className="text-sm text-gray-600">
                    Amount invested: ${inv.invested.toLocaleString()}, Equity:{" "}
                    {inv.equity}
                  </p>
                </div>
                <MessageSquare className="text-gray-500" size={20} />
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
