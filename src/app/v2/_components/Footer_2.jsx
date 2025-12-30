import React from 'react'

const Footer_2 = () => {
  return (
    <footer className="bg-[#A5FF8A] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pl-10">
          {/* Dashboard Column */}
          <div className="space-y-0 ml-10">
            <h3 className="text-black font-bold text-lg">Dashboard</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Home</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Profile</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Manage Column */}
          <div className="space-y-0">
            <h3 className="text-black font-bold text-lg">Manage</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Settings</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Integrations</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Logs</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-0">
            <h3 className="text-black font-bold text-lg">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-0">
            <h3 className="text-black font-bold text-lg">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">About</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Blog</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer_2
