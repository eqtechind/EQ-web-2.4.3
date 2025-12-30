import React from 'react'

const NotificationCard = () => {
  return (
<div className="w-full rounded-lg my-2 bg-slate-200 bg-opacity-60 flex flex-col min-h-[20vh]">
<div className="w-full flex-1 p-2">message</div>

<div className="px-2 w-full h-[5vh] flex items-center justify-end">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

</div>
</div>
  )
}

export default NotificationCard
