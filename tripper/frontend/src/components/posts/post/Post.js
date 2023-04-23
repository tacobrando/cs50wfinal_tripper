import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import PropTypes from 'prop-types'
import { deletePost, likePost } from '../../../actions/posts'
import { confirmation } from '../../../actions/options'
import Modal from '../../common/Modal'
import Form from '../form/Form'

function Post({ post, capitaliseFirst, deletePost, auth, likePost }) {
  const [modal, setModal] = useState(false)
  const [liked, setLike] = useState(false)
  const [replyModal, setReply] = useState(false)
  const [likesCount, setCount] = useState(post.likes.length)

  function confirmModal(bool) {
    if(bool) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = 'visible'
    }
    setModal(bool)
  }
  function deletePostHandler() {
    deletePost(post.id)
    confirmModal(false)
  }

  function like() {
    const likeBtn = document.getElementById(`likeBtn-${post.id}`)
    if(liked) {
      likeBtn.classList.replace("bi-heart-fill", "bi-heart")
      if(likesCount > 0) {
        setCount(likesCount - 1)
      }
    } else {
      likeBtn.classList.replace("bi-heart", "bi-heart-fill")
      setCount(likesCount + 1)
    }
    setLike(!liked)
    likePost(post.id)
  }

  const tooltipStyles = {
    padding: '10px 0px',
    background: 'black',
    opacity: '100',
    border: '1px solid #2F3336',
  }
  const editToolTip = 
  (
    <button onClick={() => confirmModal(true)} className="hover:bg-zinc-900 hover:delay-75 p-3 cursor-pointer text-red-500">
      <i className="bi bi-trash mr-2"></i>
      Delete
    </button>
  )

  function parseTime(date) {
    const sys_date = new Date()
    const post_date = new Date(Date.parse(date))
    const default_date = post_date.toLocaleString('default', { month: 'short' }) + ' ' + post_date.getDay()

    const diff = Math.floor((sys_date - post_date)/1000)
    if (diff <= 1) return "Now"
    if (diff < 60) {return diff + "s";}
    if (diff <= 90) {return "1m";}
    if (diff <= 3540) {return Math.round(diff / 60) + "m";}
    if (diff <= 5400) {return "1h";}
    if (diff <= 86400) {return Math.round(diff / 3600) + "h";}
    if (diff <= 129600) {return "1d";}
    if (diff < 604800) {return Math.round(diff / 86400) + "d";}
    if (diff <= 777600) {return "1w";}

    return default_date
  }

  useEffect(() => {
    const likeToggle = post.likes.some(follower => follower.id === auth.user.id)
    setLike(likeToggle)
  }, [post])
  const timestamp = parseTime(post.timestamp)
  return (
    <div onClick={() => console.log(post)} className="post-container p-3 px-5 flex flex-row justify-start items-start cursor-pointer border-b border-dark-grey w-full">
      <Modal toggle={replyModal} setToggle={setReply}>
        <div className="w-full p-5">
          <div className="post-container flex">
            <div id="post-user-dp">
              <img className="rounded-full w-12 mr-3" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"  alt="user-image" />
            </div>
            <div id="reply" className="w-full">
              <div className="flex flex-row justify-between w-full">
                <div>
                  <span className="mr-2">
                    {capitaliseFirst(post.user.username)}
                  </span>
                  <span className="text-gray-500">
                    @{capitaliseFirst(post.user.username)}
                  </span>
                  <span className="text-gray-500">
                    <i className="bi bi-dot text-lg"></i>
                  </span>
                  <span className="text-gray-500">
                    {timestamp}
                  </span>
                </div>
              </div>
              <div className="text-start">
                  {post.content}
                  {post.image &&
                    <img className="rounded-xl border border-dark-grey mt-2" src={post.image} />
                  }
              </div>
            </div>
          </div>
          <Form />
        </div>
      </Modal>
      <Modal toggle={modal} setToggle={setModal} close={false}>
        <div id="delete-confirmation" className="w-full">
          <h2>Are you sure?</h2>
          <button onClick={() => deletePostHandler()} className="transitition my-2 border border-red-600 hover:border-red-700 bg-red-600 hover:bg-red-700 hover:delay-75 rounded-full w-full p-2">
              Delete
          </button>
          <button onClick={() => confirmModal(false)} className="border border-dark-grey rounded-full w-full p-2 hover:bg-zinc-900 hover:delay-75">
              Cancel
          </button>
        </div>
      </Modal>
      <div id="post-user-dp">
        <img className="rounded-full w-12 mr-3" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"  alt="user-image" />
      </div>
      <div id="post-body" className="flex flex-col justify-start items-start w-full">
        <div className="flex flex-row justify-between w-full">
          <div>
            <span className="mr-2">
              {capitaliseFirst(post.user.username)}
            </span>
            <span className="text-gray-500">
              @{capitaliseFirst(post.user.username)}
            </span>
            <span className="text-gray-500">
              <i className="bi bi-dot text-lg"></i>
            </span>
            <span className="text-gray-500">
              {timestamp}
            </span>
          </div>
          {auth.isAuthenticated && post.user.id == auth.user.id && 
            <span>
              <button data-tooltip-id={`edit-post-${post.id}`} className="transition hover:delay-75 hover:text-sky-500 hover:bg-sky-600/40 rounded-full font-bold">
                <i className="bi bi-three-dots p-1"></i>
              </button>
              <Tooltip place="bottom" style={tooltipStyles} id={`edit-post-${post.id}`} content={editToolTip} openOnClick clickable />
            </span>
          }
          </div>
        <div className="text-start">
            {post.content}
            {post.image &&
              <img className="rounded-xl border border-dark-grey mt-2" src={post.image} />
            }
        </div>
        <div className="w-fit h-fit flex justify-start items-center mt-1 text-center">
          <button onClick={() => setReply(true)} style={{height: "30px", width: "30px"}} className="transition hover:delay-75 hover:text-sky-500 hover:bg-sky-600/40 rounded-full mr-2 font-bold">
            <i style={{fontSize: "15px"}} className="bi bi-chat p-1 mb-1"></i>
          </button>
          <button onClick={() => like()} style={{height: "30px", width: "30px"}} className="transition hover:text-pink-500 hover:delay-75 hover:bg-pink-600/40 rounded-full font-bold">
            {liked 
              ? <i id={`likeBtn-${post.id}`} style={{fontSize: "15px"}} className="bi bi-heart-fill p-1"></i>
              : <i id={`likeBtn-${post.id}`} style={{fontSize: "15px"}} className="bi bi-heart p-1"></i>
              
            }
          </button>
          <span id="count">{likesCount}</span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  show: state.options.show,
  auth: state.auth
})

Post.propTypes = {
  deletePost: PropTypes.func.isRequired,
  confirmation: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  auth: PropTypes.object,
  likePost: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {deletePost, confirmation, likePost})(Post)