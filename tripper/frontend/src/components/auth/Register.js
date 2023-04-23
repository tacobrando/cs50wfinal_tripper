import React, { useState, useEffect } from 'react'
import { showRegister } from '../../actions/auth'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { register } from '../../actions/auth'
import Modal from '../common/Modal'

function Register({ showRegister, registerToggle, register, isAuthenticated }) {
  const [state, setState] = useState({
      username: "",
      email: "",
      password: "",
      confirmation: "",
  })
  const { pathname } = useLocation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const authenticated = await register(state.username, state.password, state.confirmation, state.email)
    if (authenticated) {
      document.body.style.overflow = 'visible'
      showRegister(false)
    }
  }

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value  })
  }

  useEffect(() => {
    if(pathname === '/signup') {
      if(!isAuthenticated) {
        showRegister(true)
      }
    }
  })
  return (
    <Modal toggle={registerToggle} setToggle={showRegister}>
      <form onSubmit={onSubmit} className="w-full flex flex-col justify-center items-start p-5">
        <h2>Create your account</h2>
        <span className="flex flex-col">
          <input type="text" name="username" onChange={onChange} value={state.username} placeholder="Username" className="border rounded bg-black border-dark-grey outline-none" />
          <input type="email" name="email" onChange={onChange} value={state.email} placeholder="Email" className="border rounded bg-black border-dark-grey outline-none" />
          <input type="password" name="password" onChange={onChange} value={state.password} placeholder="Password" className="border rounded bg-black border-dark-grey outline-none" />
          <input type="password" name="confirmation" onChange={onChange} value={state.confirmation} placeholder="Confirm Password" className="border rounded bg-black border-dark-grey outline-none" />             
        </span>
        <button type="submit" className="bg-sky-400 rounded-full p-1">Sign Up</button>
      </form>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    registerToggle: state.auth.registerToggle,
    isAuthenticated: state.auth.isAuthenticated
  }
}

Register.propTypes = {
  showRegister: PropTypes.func.isRequired,
  registerToggle: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}


export default connect(mapStateToProps, { showRegister, register })(Register)
