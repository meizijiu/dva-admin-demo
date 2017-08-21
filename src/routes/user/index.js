import react from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import List from './lists'
import Modal from './modal'

const User = ({ user, dispatch, location }) => {
  const { list, pagination, modalVisible, currentItem, modalType, selectedRowKeys } = user
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

  const tableConfig = {
    rowSelection: {
      type: 'checkbox',
      onChange(selectedRowKeys, selectedRows) {
        console.log(selectedRows, selectedRows)
      }
    },
    onEditItem (item) {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
          ...location.query
        }
      })
    },
    onDeleteItem (item) {
      dispatch({
        type: 'user/delete',
        payload: {
          id: item.id,
          ...location.query
        },
      })
    }
  }

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    title: `${modalType === 'create' ? 'Create User' : 'Update User'}`,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `user/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'user/hideModal',
      })
    }
  }

  const listProps = {
    location,
    tableConfig,
    pagination: paginationConfig,
    dataSource: list,
    ...tableConfig
  }

  return (
    <div>
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object
}

export default connect(({ user, loading }) => ({ user, loading }))(User)
