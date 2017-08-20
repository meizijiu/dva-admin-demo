import react from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import List from './lists'

const User = ({ user, dispatch, location }) => {
  const { list, pagination } = user
  const { pageSize } = pagination
  const { pathname, query = {} } = location

  const paginationConfig = {
    ...pagination,
    showQuickJumper: true,
    onChange (page, pageSize) {
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page,
          pageSize: pageSize
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
    },
  }

  const listProps = {
    location,
    pagination: paginationConfig,
    dataSource: list,
  }

  return (
    <div>
      <List {...listProps} />
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object
}

export default connect(({ user, loading }) => ({ user, loading }))(User)
