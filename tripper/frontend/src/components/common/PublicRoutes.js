import React from 'react'
import { Navigate } from "react-router-dom"
import { connect } from "react-redux"

function PublicRoutes({ children, auth }) {
  if(auth.isLoading) {
    return (<h2>Loading...</h2>)
  }
  else if (auth.isAuthenticated) {
    return (<Navigate replace to="/" />)
  }
  return children
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(PublicRoutes)