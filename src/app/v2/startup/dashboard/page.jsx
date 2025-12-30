"use client";
import { MoreVertical } from "lucide-react";
import Navbar from "../profile/_components/Navbar";
import { instrumentSans } from "@/app/layout";

export default function ServicesPage() {
  return (
    <div
      className="min-h-screen bg-white px-6 "
      style={{
        fontFamily: instrumentSans.style.fontFamily,
      }}
    >
      <Navbar />
      {/* Our Services */}
      <section className="mb-12 p-10">
        <h2 className="text-xl font-semibold mb-4">Our Services:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Active Service */}
          <div className="rounded-lg border shadow-sm p-10 h-[40vh]">
            <h3 className="text-5xl mb-2">EQFund</h3>
            <p>
              You have the required ratings to{" "}
              <a
                href="/v2/startup/eqfund"
                className="text-blue-600 underline cursor-pointer"
              >
                avail
              </a>{" "}
              this service.
            </p>
          </div>

          {/* Disabled Service */}
          <div className="rounded-lg border shadow-sm p-6 h-[40vh] bg-gray-100 text-gray-400">
            <h3 className="text-5xl  font-normal mb-2">EQRaise</h3>
            <p>
              You don&apos;t have the required ratings to avail this service.
            </p>
          </div>
        </div>
      </section>

      {/* Funding Rounds */}
      <section className="px-10">
        <h2 className="text-xl font-semibold mb-4">Funding Rounds:</h2>

        <div className="rounded-lg border shadow-sm p-6 space-y-6">
          {/* Active Round */}
          <div>
            <h3 className="text-md font-semibold border-b pb-1 mb-4">
              Active Round
            </h3>
            <div className="flex justify-between items-start border rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded" />
                <div>
                  <h4 className="font-bold">EQFund</h4>
                  <p className="text-blue-600 text-sm">
                    Funds Requested: $250,000
                  </p>
                  <p className="text-gray-600 text-sm">
                    Started on: 19/04/2025
                  </p>
                </div>
              </div>
              <MoreVertical className="text-gray-500 w-5 h-5" />
            </div>
          </div>

          {/* Completed Rounds */}
          <div>
            <h3 className="text-md font-semibold border-b pb-1 mb-4">
              Completed Rounds
            </h3>

            {/* Round Item */}
            {[
              {
                name: "EQFund",
                funds: "$100,000",
                date: "23/02/2025",
              },
              {
                name: "EQRaise",
                funds: "$45,000",
                date: "17/12/2024",
              },
              {
                name: "EQRaise",
                funds: "$95,000",
                date: "08/09/2024",
              },
              {
                name: "EQFund",
                funds: "$125,000",
                date: "14/06/2024",
              },
            ].map((round, idx) => (
              <div
                key={idx}
                className="flex justify-between items-start border rounded-lg p-4 mb-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded" />
                  <div>
                    <h4 className="font-bold">{round.name}</h4>
                    <p className="text-green-600 text-sm">
                      Funds Collected: {round.funds}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Ended on: {round.date}
                    </p>
                  </div>
                </div>
                <MoreVertical className="text-gray-500 w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
