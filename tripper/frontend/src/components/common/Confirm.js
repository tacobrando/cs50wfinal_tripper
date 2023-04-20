import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { deletePost } from '../../actions/posts'
import { confirmation } from '../../actions/options'

function Confirm({ children }) {
    return (
        <div className="confirm-container fixed w-full h-full bg-sky-400/20 z-30 top-0 left-0">
            <div className="rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black w-fit h-fit">
                <div className="h-full p-3">
                    <div className="w-full flex flex-col justify-center items-center">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

Confirm.propTypes = {
    deletePost: PropTypes.func,
    confirmation: PropTypes.func
}

export default connect(null, { deletePost, confirmation })(Confirm)