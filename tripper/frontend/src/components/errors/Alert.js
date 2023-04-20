import React, { Fragment, useEffect}  from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"

function Alert({ error, alert }) {
    function closeAlert(){
        const alertContainer = document.getElementById("alert-message")
        alertContainer.classList.remove("bounce-in")
        alertContainer.style.visibility = "hidden"
        const alert = document.getElementById('alert')
        alert.classList.remove('z-50')
    }

    useEffect(() => {
        const alertContainer = document.getElementById("alert-message")
        const status = document.getElementById("alert-status")
        const alert = document.getElementById('alert')
        if(error.status) {
            alert.classList.add("z-50")
            status.innerHTML = "Error"
            alertContainer.style.visibility = "visible"
            alertContainer.classList.add("bounce-in")
            alertContainer.classList.replace("bg-green-600", "bg-red-600")
            status.classList.replace("bg-green-500", "bg-red-500")
            setTimeout(closeAlert, 8000)
        } 
        // else if (alert) {
        //     status.innerHTML = "Success"
        //     alertContainer.style.visibility = "visible"
        //     alertContainer.classList.remove("bounce-in-reverse")
        //     alertContainer.classList.add("bounce-in")
        //     alertContainer.classList.replace("bg-red-600", "bg-green-600")
        //     status.classList.replace("bg-red-500", "bg-green-500")
        //     setTimeout(closeAlert, 5000)
        // } .  
    })
    console.log(error)
    return (
        <Fragment>
            <div id="alert" className="alert w-full fixed flex justify-center">
                <div id="alert-message" className="invisible p-2 mt-3 bg-red-600 justify-center items-center text-white rounded-full lg:rounded-full flex lg:inline-flex" role="alert">
                    <span id="alert-status" className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3"></span>
                    <span className="font-semibold mr-2 text-left flex-auto">{error.message.detail}</span>
                    <svg onClick={closeAlert} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x cursor-pointer" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    error: state.errors,
    alert: state.alerts
})

Alert.propTypes = {
    error: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Alert)