import React from 'react'

function Header() {
  return (
    <div className="header sticky top-0 w-full border-b border-dark-grey flex flex-col items-start">
        <div className="page-title h-14 px-6 mt-5 text-2xl font-semibold">
            <h3>Home</h3>
        </div>
        <div className="user-choices h-14 w-full flex justify-center font-semibold text-lg">
            <button className="w-2/4">For You</button>
            <button className="w-2/4">Following</button>
        </div>
    </div>
  )
}

export default Header
