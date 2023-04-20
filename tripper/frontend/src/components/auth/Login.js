import React, { useEffect, useState } from 'react'
import { showLogin, login } from '../../actions/auth'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

function Login({ showLogin, loginToggle, isAuthenticated, login }) {
  const { pathname } = useLocation();
  const [state, setState] = useState({
      username: "",
      password: "",
  })
  const navigate = useNavigate()
  
  function closeModal() {
    document.body.style.overflow = 'visible'
    showLogin(false)
    navigate("/")
  }

  const handleForm = (e) => {
    e.preventDefault();
    login(state.username, state.password)
    if(isAuthenticated) {
      showLogin(false)
      navigate("/")
    }

  }

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value  })
  }

  useEffect(() => {
    if(pathname === '/login') {
      if(!isAuthenticated) {
        showLogin(true)
      }
    }
  })

  if(loginToggle && !isAuthenticated) {
    return (
      <div className="login-container fixed w-full h-full bg-sky-400/20 z-30">
        <div className="login-container rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black w-2/5 h-2/5">
          <div className="h-full p-5">
            <span onClick={closeModal} className="text-3xl cursor-pointer absolute top-2 left-2" id="exitBtn">
              <i className="bi bi-x"></i>
            </span>
            <form onSubmit={handleForm} className="w-full flex flex-col justify-center items-start p-5">
              <h2>Sign In</h2>
              <span className="flex flex-col">
                <input type="text" name="username" onChange={onChange} value={state.username} placeholder="Username" className="border rounded bg-black border-dark-grey outline-none" />
                <input type="password" name="password" onChange={onChange} value={state.password} placeholder="Password" className="border rounded bg-black border-dark-grey outline-none" />
              </span>
              <button type="submit" className="bg-sky-400 rounded-full p-1">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginToggle: state.auth.loginToggle,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

Login.propTypes = {
  showLogin: PropTypes.func.isRequired,
  loginToggle: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}


export default connect(mapStateToProps, { showLogin, login })(Login)
