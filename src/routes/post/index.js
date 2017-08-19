import React from 'react'
import { connect } from 'dva'
import { Table, Avatar } from 'antd'
import { routerRedux } from 'dva/router'
import PropTypes from 'prop-types'
import styles from './index.less'

const Post = ({ post, dispatch, loading, location }) => {
  const { pathname, query = {} } = location
  let { pagination, list } = post

  const columns = [{
    title: 'Image',
    dataIndex: 'image',
    render: (text, record) => <Avatar size="large" src={text}>{record.author.substr(0,1)}</Avatar>
  }, {
    title: 'Title',
    dataIndex: 'title',
  }, {
    title: 'Author',
    dataIndex: 'author',
  }, {
    title: 'Categories',
    dataIndex: 'categories',
  }, {
    title: 'Tags',
    dataIndex: 'tags',
  }, {
    title: 'Visibility',
    dataIndex: 'visibility',
  }, {
    title: 'Comments',
    dataIndex: 'comments',
  }, {
    title: 'Views',
    dataIndex: 'views',
  }, {
    title: 'Date',
    dataIndex: 'date'
  }]

  const paginationConfig = {
    ...pagination,
    showQuickJumper: true,
    onChange (page, pageSize) {
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page,
          pageSize: pageSize,
        }
      }))
    },
    onShowSizeChange (current, size) {
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: current,
          pageSize: size,
        }
      }))
    }
  }

  return (
    <div className={styles.posts}>
      <Table pagination={paginationConfig}
             columns={columns}
             rowKey={(record, key) => key}
             dataSource={list}
             className={styles.table}
             scroll={{ x: 1200 }}
             bordered
             simple
           />
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ post }) => ({ post }))(Post)
