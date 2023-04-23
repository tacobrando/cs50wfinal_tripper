import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Modal({ children, toggle, setToggle, close }) {
  const [state, setState] = useState({
    close: true,
    toggle: false
  })
  const navigate = useNavigate()

  function closeModal() {
    document.body.style.overflow = 'visible'
    setToggle(false)
    navigate("/")
  }

  useEffect(() => {
    if(close !== undefined) {
        setState({ ...state, close: close })
    }
  }, [state.close])

  if(toggle) {
    return (
        <div className="modal-container fixed w-full h-full bg-sky-400/20 z-30 top-0 left-0">
            <div className="modal-card rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black w-fit h-fit">
                <div className="h-full p-5">
                    {state.close &&
                        <span onClick={closeModal} className="text-3xl cursor-pointer absolute top-2 left-2" id="exitBtn">
                            <i className="bi bi-x"></i>
                        </span>
                    }
                    { children }
                </div>
            </div>
        </div>
      )
  }
}

export default Modal