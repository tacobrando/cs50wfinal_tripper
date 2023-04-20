import React from 'react'
import { showRegister, showLogin } from '../../actions/auth'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Options({ showRegister, showLogin, isAuthenticated }) {
  const navigate = useNavigate()
  function registerModal() {
    document.body.style.overflow = 'hidden'
    navigate("/signup")
    showRegister(true)
  }
  function loginModal() {
    document.body.style.overflow = 'hidden'
    navigate("/login")
    showLogin(true)
  }
  const authOptions = (
    <div className="options-container my-3 mx-7">
      <section className="signup border border-dark-grey rounded-xl mt-3 p-3">
        <div className="m-2 text-xl font-bold">
            <h2>Welcome to Tripper!</h2>
        </div>
        <div className="text-black mb-3">
            <span>
                <button onClick={loginModal} className="rounded-full bg-white w-11/12 p-2 font-bold">Sign In</button>
            </span>
            <div className="text-white m-2 text-lg font-bold">
                <h2>New to Tripper?</h2>
                <p className="text-sm text-gray-500 font-normal">Sign up now!</p>
            </div>
            <span>
                <button onClick={registerModal} className="rounded-full bg-white w-11/12 p-2 font-bold">Create Account</button>
            </span>
        </div>
      </section>
    </div>
  )
  const userOptions = (
    <div className="options-container my-3 mx-7">
      <section className="signup border border-dark-grey rounded-xl mt-3 p-3">
        <div className="m-2 text-xl font-bold">
          Logged in Options
          TODO
        </div>
      </section>
    </div>
  )
  if(isAuthenticated) {
    return userOptions
  } else {
    return authOptions
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

Options.propTypes = {
  showRegister: PropTypes.func.isRequired,
  showLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

export default connect(mapStateToProps, { showRegister, showLogin })(Options)