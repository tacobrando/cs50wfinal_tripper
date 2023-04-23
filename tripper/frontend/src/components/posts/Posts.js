import React, {  Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getPosts, addPost } from '../../actions/posts'

import Form from './form/Form'
import Post from './post/Post'

function Posts({ getPosts, auth, posts, tab, capitaliseFirst, addPost }) {
  useEffect(() => {
    getPosts()
  }, [getPosts])
  return (
    <Fragment>
      {auth.isAuthenticated &&
        <Form formSubmit={addPost} auth={auth} />
      }
      {tab === "for_user" 
      ?
        <div className="posts border-dark-grey w-full h-auto text-white">
          {posts.map(post => {
            return <Post isAuthenticated={auth.isAuthenticated} key={post.id} post={post} capitaliseFirst={capitaliseFirst} getPosts={getPosts} />
          })}
        </div>
      :
        <div className="posts border-b border-dark-grey w-full h-auto text-white">
          <span>FOLLOWING POSTS TODO</span>
        </div>
      }
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    auth: state.auth,
    tab: state.options.tab
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  tab: PropTypes.string,
  addPost: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, 
  { getPosts, addPost }
)(Posts)
