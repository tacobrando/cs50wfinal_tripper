import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../../firebase/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"


function Form ({ formSubmit, auth }){
    const textareaRef = useRef(null)
    const [progress, setProgress] = useState(0)
    const [state, setState] = useState({
        content: '',
        image: '',
        files: []
    })
    const fileInput = useRef(null)

    const onChange = (e) => {
        setState({ ...state, content: e.target.value })
        if(e.target.value == '') {
            document.getElementById("submit").disabled = true
        } else {
            document.getElementById("submit").disabled = false
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { content, files } = state
        if(files.length > 0) {
            const filename = uuidv4() + '.png'
            const newFile = new File([files[0]], filename, {
                type: "image/png"
            })
            const storageRef = ref(storage, `posts/${newFile.name}`)
            const uploadTask = uploadBytesResumable(storageRef, newFile)

            uploadTask.on("state_changed",
            (snapshot) => {
                const progVal = 
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progVal)
            },
            (error) => {
                alert(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    const post = { user: auth.user.id, content, image: downloadUrl.toString() }
                    formSubmit(post)
                })
            })
        } else {
            const post = { user: auth.user.id, content, image: '' }
            formSubmit(post)
        }
        setState({ content: '', image: '', files: [] })
        document.getElementById("submit").disabled = true
    }

    const fileSelect = () => {
        fileInput.current.click()
    }

    const fileChange = (e) => {
        setState({ 
            ...state, 
            image: URL.createObjectURL(e.target.files[0]), 
            files: [...e.target.files] 
        })
        e.target.value = null
    }

    function removeImage() {
        setState({ ...state, image: '', files: [] })
    }


    useEffect(() => {
        textareaRef.current.style.height = "0px"
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px"
    }, [state.content])

    return (
        <form onSubmit={onSubmit} className="z-10 border-b border-dark-grey w-full h-auto text-white flex flex-row justify-start p-3">
            <span>
                <img className="rounded-full w-12 mr-3" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>
            </span>
            <div className="w-full m-2">
                <span className="flex" id="new-post-profile">
                    <textarea 
                        maxLength={280}
                        ref={textareaRef}
                        style={{resize: 'none'}}
                        className="bg-black text-xl outline-none w-full block auto-resize-textarea" 
                        type="text" 
                        name="post" 
                        value={state.content} 
                        placeholder="What's on your mind?"
                        onChange={onChange}
                    ></textarea>
                </span>
                <span className="flex justify-start">
                    {progress < 100 && progress > 1 && state.image == '' &&
                        <span>{progress}%</span>
                    }
                    {
                        state.image.length > 0 &&
                        <div>
                            <span className="flex">
                                <span onClick={removeImage} className="transition rounded-full border-l border-dark-grey text-3xl absolute hover:bg-zinc-900 hover:delay-75 cursor-pointer" id="exitBtn">
                                    <i className="bi bi-x"></i>
                                </span>
                                <img src={state.image}></img>
                            </span>
                          </div>
                    }
                </span>
                <div className="form-options w-full flex justify-start mt-2">
                    <span id="options" className="w-full flex justify-start">
                        <button type="button" onClick={fileSelect}>
                            <i className="bi bi-image text-sky-500" />
                        </button>
                        <input
                            onChange={fileChange}
                            id="image-file"
                            name="image-file"
                            type="file" 
                            accept=".jpg, .jpeg, .png"
                            style={{ display: 'none' }}
                            ref={fileInput}
                        />
                    </span>
                    <span className="w-full flex justify-end">
                        <button type="submit" id="submit" disabled className="rounded-full disabled:opacity-75 bg-sky-500 px-5 py-1">Post</button>
                    </span>
                </div>
            </div>
        </form>
    )
}

export default Form