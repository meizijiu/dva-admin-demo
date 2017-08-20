import react from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar } from 'antd'
import styles from './lists.less'

const List = ({ location, ...listProps }) => {
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
