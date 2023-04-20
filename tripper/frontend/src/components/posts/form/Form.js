import React, { useState } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPost } from '../../../actions/posts'

function Form ({ addPost, auth }){
    const [state, setState] = useState({
        content: '',
        image: ''
    })

    const onChange = (e) => {
        setState({ content: e.target.value })
        if(e.target.value == '') {
            document.getElementById("submit").disabled = true
        } else {
            document.getElementById("submit").disabled = false
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const { content, image } = state
        const post = { user: auth.user.id, content, image };
        addPost(post)
        setState({ content: '', image: '' })
    }
    return (
        <form onSubmit={onSubmit} className="z-10 border-b border-dark-grey w-full h-auto text-white flex flex-col justify-start w-100 p-3">
            <span className="flex" id="new-post-profile">
                <img className="rounded-full w-12 mr-3" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>
                <input 
                    className="bg-black text-xl outline-none w-3/4" 
                    type="text" 
                    name="post" 
                    value={state.content} 
                    placeholder="What's on your mind?"
                    onChange={onChange}
                ></input>
            </span>
            <div className="form-options w-full flex justify-start">
                <span id="options" className="w-full">
                {/* TODO */}
                </span>
                <span className="w-full flex justify-end">
                    <button id="submit" disabled className="rounded-full disabled:opacity-75 bg-sky-400 px-5 py-1">Post</button>
                </span>
            </div>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
Form.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { addPost })(Form)