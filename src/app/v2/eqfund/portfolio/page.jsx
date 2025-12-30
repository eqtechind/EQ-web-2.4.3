import React from 'react'
import { Search, TrendingUp, ArrowUpRight, TrendingUpIcon } from 'lucide-react'
import Navbar from '../_components/Navbar'

const PortfolioPage = () => {
  return (
    <div className='min-h-screen bg-black'>
      <Navbar/>
    <div className="min-h-screen bg-black text-white p-6">
      {/* Top Section - Summary Cards */}
      <div className="bg-[#1E1E1E] text-white rounded-xl p-6 flex items-center justify-between shadow-md mb-6">
      {/* Left Side */}
      <div className=''>
        <h2 className="text-2xl font-bold">
          Total Investments: <span className="text-white">$ 250,000</span>
        </h2>
        <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
          Current Value{" "}
          <TrendingUpIcon className="w-4 h-4 text-green-500" />
          <span className="text-green-500 font-semibold">12.5%</span>
        </p>
      </div>

      {/* Right Side */}
      <div className="flex gap-10">
        <div>
          <p className="text-gray-400 text-xl">Invested in</p>
          <p className="font-semibold text-white text-2xl">24 Startups</p>
        </div>
        <div>
          <p className="text-gray-400 text-xl">Your Bank Balance</p>
          <p className="font-semibold text-white text-2xl">$ 450,000</p>
        </div>
      </div>
    </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Panel - Startups List */}
        <div className="lg:col-span-1 bg-white text-black rounded-lg p-6">
          <div className="flex items-center justify-between mb-6  border-b-2 border-blue-500">
            <h2 className="text-xl font-semibold text-black pb-2">
              Startups:
            </h2>
            <Search className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
          </div>

          {/* Startups List */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 px-2 py-2">
            {/* Startup 1 */}
            <div className="bg-white rounded-lg p-4 text-black  " style={{
              boxShadow:"0px -1px 14px -5px #000000"
            }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-full"></div>
                <div className="flex-1">
                  <div className="font-semibold">Startup 1</div>
                  <div className="text-sm text-gray-600">Qty: 8.9%</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$2,500</div>
                  <div className="text-sm text-red-500">+0.04%</div>
                </div>
              </div>
            </div>

            {/* Startup 2 */}
            <div className="bg-white rounded-lg p-4 text-black"  style={{
              boxShadow:"0px -1px 14px -5px #000000"
            }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-full"></div>
                <div className="flex-1">
                  <div className="font-semibold">Startup 2</div>
                  <div className="text-sm text-gray-600">Qty: 8.5%</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$3,000</div>
                  <div className="text-sm text-green-500">+0.04%</div>
                </div>
              </div>
            </div>

            {/* Startup 3 */}
            <div className="bg-white rounded-lg p-4 text-black"  style={{
              boxShadow:"0px -1px 14px -5px #000000"
            }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-full"></div>
                <div className="flex-1">
                  <div className="font-semibold">Startup 3</div>
                  <div className="text-sm text-gray-600">Qty: 10%</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$4,500</div>
                  <div className="text-sm text-green-500">+0.04%</div>
                </div>
              </div>
            </div>

            {/* Additional startups for scrolling */}
            {[4, 5, 6, 7, 8].map((num) => (
              <div key={num} className="bg-white rounded-lg p-4 text-black"  style={{
                boxShadow:"0px -1px 14px -5px #000000"
              }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-semibold">Startup {num}</div>
                    <div className="text-sm text-gray-600">Qty: {Math.floor(Math.random() * 15 + 5)}%</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${Math.floor(Math.random() * 5000 + 1000).toLocaleString()}</div>
                    <div className={`text-sm ${Math.random() > 0.5 ? 'text-green-500' : 'text-red-500'}`}>
                      {Math.random() > 0.5 ? '+' : '-'}{Math.random().toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Graph */}
        <div className="lg:col-span-2 bg-white rounded-lg p-8 flex items-center justify-center">
          <div className="text-black text-2xl font-semibold">Graph</div>
        </div>
      </div>

      {/* Bottom Section - Trending Startups */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Trending Startups</h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="bg-gray-700 rounded-lg aspect-square flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default PortfolioPage
