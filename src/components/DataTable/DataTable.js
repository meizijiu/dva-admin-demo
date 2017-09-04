import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { request } from '../../utils'
import lodash from 'lodash'
import styles from './DataTable.less'

class DataTable extends React.Component {
    constructor (props) {
      super(props)

      const { dataSource, pagination = {
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条数据`,
          current: 1,
          total: 100
        }
      } = props

      this.state = {
        loading: false,
        dataSource,
        fetchData: {},
        pagination,
      }
    }

    componentDidMount () {
      if (this.props.fetch) {
        this.fetch()
      }
    }

    componentWillReceiveProps (nextProps) {
      const staticNextProps = lodash.cloneDeep(nextProps)
      delete staticNextProps.columns
      const { columns, ...otherProps } = this.props

      if (!lodash.isEqual(staticNextProps, otherProps)) {
        this.props = nextProps
        this.fetch()
      }
    }

    handleTableChange = (pagination, filters, sorter) => {
      const pager = this.state.pagination
      pager.current = pagination.current

      this.setState({
        pagination: pager,
        fetchData: {
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        }
      }, () => {
        this.fetch()
      })
    }

    fetch = () => {
      const { fetch: { url, data, dataKey } } = this.props
      const { fetchData } = this.state
      this.setState({ loading: true })

      this.promise = request({
        url,
        data: {
          ...data,
          ...fetchData,
        },
      }).then((res) => {
        if (!this.refs.DataTable) return

        const { pagination } = this.state
        pagination.total = res.total || pagination.total
        this.setState({
          loading: false,
          dataSource: dataKey ? res[dataKey] : res.data,
          pagination
        })
      })
    }

    render () {
      const { fetch, ...tableProps } = this.props
      const { loading, dataSource, pagination } = this.state

      return (
        <Table
          ref="DataTable"
          bordered
          loading={loading}
          onChange={this.handleTableChange}
          pagination={pagination}
          dataSource={dataSource}
          {...tableProps}
        />
      )
    }
}

DataTable.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  rowKey: PropTypes.string,
  pagination: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]),
  fetch: PropTypes.object
}

export default DataTable
