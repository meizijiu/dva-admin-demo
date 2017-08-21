import react from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Modal } from 'antd'
import DropOptions from '../../components/DropOptions'
import styles from './lists.less'

const confirm = Modal.confirm

const List = ({ location, onEditItem, onDeleteItem, ...listProps }) => {
  const options = [
    { key: '1', name: 'Update' },
    { key: '2', name: 'Delete' }
  ]

  const handleMenuClick = (e, record) => {
    if (e.key === '1') {  
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: 'are you sure delete this item?',
        onOk () {
          onDeleteItem(record)
        }
      })
    }
  }

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      render: (text, record) => <Avatar src={text}>{record.name.substr(0,1)}</Avatar>
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'NickName',
      dataIndex: 'nickName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
    },
    {
      title: 'Options',
      dataIndex: 'options',
      render: (text, record) => (<DropOptions onMenuClick={e => handleMenuClick(e, record)}
        menuOptions={options} />)
    }
  ]

  return (
    <div>
      <Table
        {...listProps}
        columns = {columns}
        rowKey = {(record, key) => key}
        scroll={{ x: 1200 }}
        bordered
        simple
      />
    </div>
  )
}

List.propTypes = {
  location: PropTypes.object,
  listProps: PropTypes.object
}

export default List
