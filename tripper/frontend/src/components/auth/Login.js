import React, { useEffect, useState } from 'react'
import { showLogin, login } from '../../actions/auth'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Modal from '../common/Modal'

function Login({ showLogin, loginToggle, isAuthenticated, login }) {
  const { pathname } = useLocation();
  const [state, setState] = useState({
      username: "",
      password: "",
  })

  const handleForm = async (e) => {
    e.preventDefault();
    const authenticated = await login(state.username, state.password)
    if (authenticated) {
      document.body.style.overflow = 'visible'
      showLogin(false)
    }
  }
  

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value  })
  }

  useEffect(() => {
    if(pathname === '/login') {
      if(isAuthenticated) {
        showLogin(false)
        document.body.style.overflow = 'visible'
      } else {
        showLogin(true)
        document.body.style.overflow = 'hidden'
      }
    }
  }, [isAuthenticated])

  return (
    <Modal setToggle={showLogin} toggle={loginToggle}>
      <form onSubmit={handleForm} className="w-full flex flex-col justify-center items-start p-5">
        <h2>Sign In</h2>
        <span className="flex flex-col">
          <input type="text" name="username" onChange={onChange} value={state.username} placeholder="Username" className="border rounded bg-black border-dark-grey outline-none" />
          <input type="password" name="password" onChange={onChange} value={state.password} placeholder="Password" className="border rounded bg-black border-dark-grey outline-none" />
        </span>
        <button type="submit" className="bg-sky-400 rounded-full p-1">Sign In</button>
      </form>
    </Modal>
  )
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
