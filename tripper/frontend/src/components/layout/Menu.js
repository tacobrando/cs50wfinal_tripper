import React from 'react'
const logo = require("../../assets/tripper-logo-white.png")

function Menu() {
  return (
    <aside className="
        menu-container
        border-dark-grey
        w-full text-start 
        border-r 
        h-screen 
        sticky 
        top-0 
        left-0
        flex 
        justify-center
      "
    >
      <div className="menu-options flex w-3/4 justify-start mt-4">
        <span>
          <img src={logo} alt="logo"  />
        </span>
      </div>
    </aside>
  )
}
export default Menu