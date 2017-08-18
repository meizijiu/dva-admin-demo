import React from 'react'
 import { connect } from 'dva'
import PropTypes from 'prop-types'
import styles from './index.less'

const Post = ({ post, dispatch }) => {
  return (
    <div>
      <p>this is post</p>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ post }) => ({ post }))(Post)
