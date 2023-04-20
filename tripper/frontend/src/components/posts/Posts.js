import React, {  Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes, { array } from 'prop-types'
import { getPosts } from '../../actions/posts'

import Form from './form/Form'
import Post from './post/Post'

function Posts({ getPosts, isAuthenticated, posts, tab, capitaliseFirst }) {
  useEffect(() => {
    getPosts()
  }, [getPosts])
  return (
    <Fragment>
      {isAuthenticated &&
        <Form />
      }
      {tab === "for_user" 
      ?
        <div className="posts border-b border-dark-grey w-full h-auto text-white">
          {posts.map(post => {
            return <Post key={post.id} post={post} capitaliseFirst={capitaliseFirst} getPosts={getPosts} />
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
    isAuthenticated: state.auth.isAuthenticated,
    tab: state.options.tab
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  tab: PropTypes.string
}

export default connect(mapStateToProps, 
  { getPosts }
)(Posts)
