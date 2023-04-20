import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { switchTab } from '../../actions/options'

function Header({ auth, options, switchTab }) {
  const [search, setSearch] = useState('')
  const onChange = (e) => {
    setSearch(e.target.value)
  }

  const onClick = (e) => {
    switchTab(e.target.id)
    switchTabs(e.target.id)
  }

  function switchTabs(tab) {
    const tabContainer = document.querySelector(".user-choices")
    if(tab === "following_posts") {
      tabContainer.querySelector("#for_user").classList.remove("active")
      tabContainer.querySelector("#following_posts").classList.add("active")
    } else {
      tabContainer.querySelector("#following_posts").classList.remove("active")
      tabContainer.querySelector("#for_user").classList.add("active")
    }
  }

  useEffect(() => {
    switchTabs(options.tab)
  }, [switchTabs])


  const authLinks = (
    <div className="header w-full border-b bg-black/80 border-dark-grey z-10 flex flex-col items-start opacity backdrop-blur">
      <div className="page-title h-14 px-6 mt-5 text-2xl font-semibold">
          <h3>Home</h3>
      </div>
      <div className="user-choices h-14 w-full flex justify-center font-semibold text-lg">
          <button onClick={onClick} id="for_user" className="transition w-2/4 hover:bg-zinc-900 hover:delay-75">
            <span id="for_user">
              For You
            </span>
          </button>
          <button onClick={onClick} id="following_posts" className="transition w-2/4 hover:bg-zinc-900 hover:delay-75">
          <span id="following_posts">
            Following
          </span>
        </button>
      </div>
    </div>
  )
  const guestLinks = (
    <div className="header w-full z-10 border-b bg-black/80 border-dark-grey flex flex-col items-start opacity backdrop-blur">
      <div className="page-title w-full h-14 px-6 mt-1 text-2xl font-semibold">
        <span className="m-0 flex">
          <input 
            className="bg-dark-grey w-11/12 p-3 pl-10 text-sm rounded-full outline-none border border-dark-grey" 
            type="text" 
            name="search" 
            placeholder="Search Tripper"
            onChange={onChange}
          />
          <i id="search" className="bi bi-search absolute left-8 top-3"></i>
        </span>
      </div>
      <div className="user-choices h-14 w-full flex justify-center font-semibold text-lg">
        <button onClick={onClick} id="for_user" className="transition w-2/4 hover:bg-zinc-900 hover:delay-75">
          <span id="for_user">
            For You
          </span>
        </button>          
        <button onClick={onClick} id="following_posts" className="transition w-2/4 hover:bg-zinc-900 hover:delay-75">
          <span id="following_posts">
            Following
          </span>
        </button>        
      </div>
    </div>
  )
  if(auth.isAuthenticated) {
    return authLinks
  } else {
    return guestLinks
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  switchTab: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  options: state.options
})

export default connect(mapStateToProps, { switchTab })(Header)
