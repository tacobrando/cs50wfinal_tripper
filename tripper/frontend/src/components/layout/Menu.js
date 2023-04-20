import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import { logout } from '../../actions/auth'

const logo = require("../../assets/tripper-logo-white.png")

function Menu({ logout, isAuthenticated, user, capitaliseFirst }) {
  const logoutToolTip = (
    <button onClick={logout} className="hover:bg-zinc-900 hover:delay-75 p-3 cursor-pointer w-full">Logout</button>
  )
  const tooltipStyles = {
    padding: '10px 0px',
    background: 'black',
    opacity: '100',
    border: '1px solid #2F3336',
    width: '50%'
  }
  return (
    <aside className="
        menu-container
        w-full text-start 
        h-screen 
        flex 
        justify-end
        items-start
      "
    >
      <div className="menu-options sm:w-full md:w-full lg:w-3/4 2xl:w-2/4  flex flex-row justify-start lg:items-end md:items-center mt-4 lg:m-5">
        <ul className="w-full mx-2 flex flex-col sm:justify-center md:items-center lg:items-start">
          <li className="w-fit cursor-pointer">
            <img src={logo} className="h-12" alt="logo"  />
          </li>
          <li className="flex items-center p-2 justify-start w-fit hover:bg-zinc-900 hover:delay-75 cursor-pointer border border-hidden transition rounded-full">
            <i className="bi bi-chat text-3xl md:mr-0 lg:mr-4"></i>
            <h1 className="xl:text-xl lg:text-md z-0 hidden lg:block">Messages</h1>
          </li>
          <li className="flex items-center p-2 justify-start w-fit hover:bg-zinc-900 hover:delay-75 cursor-pointer border border-hidden transition rounded-full">
            <i className="bi bi-person text-3xl md:mr-0 lg:mr-4"></i>
            <h1 className="xl:text-xl lg:text-md z-0 hidden lg:block">Profile</h1>
          </li>
          {isAuthenticated && 
            <li className="hover:bg-zinc-900 w-full hover:delay-75 cursor-pointer border border-hidden transition rounded-full">
              <div data-tooltip-id="logout" className="flex justify-between items-center w-full p-3 lg:justify-between md:justify-center">
                <Tooltip style={tooltipStyles} id="logout" content={logoutToolTip} openOnClick clickable />
                <div className="flex flex-row justify-start items-center lg:justify-between">
                  <span className="lg:mr-3">
                    <img className="rounded-full md:w-10 md:h-10" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="user-profile"  />
                  </span>
                  <span className="leading-tight hidden lg:block">
                    <p>{capitaliseFirst(user.username)}</p>
                    <p>@{user.username}</p>
                  </span>
                </div>
                <div className="text-lg hidden xl:block">
                  <i className="bi bi-three-dots"></i>
                </div>
              </div>
            </li>
          }
        </ul>
      </div>
    </aside>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

Menu.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
}

export default connect(mapStateToProps, { logout })(Menu)