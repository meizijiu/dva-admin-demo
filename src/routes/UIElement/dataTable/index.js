import React from 'react'
import { Table, Row, Col, Card, Select } from 'antd'
import { DataTable } from 'components'
import styles from './index.less'

export default class DataTablePage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      filterCase: {
        gender: ''
      }
    }
  }

  handleChange = (value) => {
    this.setState({
      filterCase: {
        gender: value
      }
    })
  }

  render () {
    const Option = Select.Option

    const { filterCase } = this.state

    const colProps = {
      lg: 12,
      md: 24
    }

    const staticDataTableProps = {
      dataSource: [{ key: '1', name: 'John Brown', age: 24, address: 'New York' }, { key: '2', name: 'Jim Green', age: 23, address: 'London' }],
      columns: [{ title: 'name', dataIndex: 'name' }, { title: 'age', dataIndex: 'age' }, { title: 'address', dataIndex: 'address' }],
      pagination: false
    }

    const fetchDataTableProps = {
      fetch: {
        url: 'https://randomuser.me/api/',
        data: {
          results: 10,
          testParams: 'test'
        },
        dataKey: 'results'
      },
      columns: [
        { title: 'name', dataIndex: 'name', render: text => `${text.first} ${text.last}` },
        { title: 'phone', dataIndex: 'phone' },
        { title: 'gender', dataIndex: 'gender' },
      ],
      rowKey: 'registered',
    }

    const caseChangeDataTableProps = {
      fetch: {
        url: 'https://randomuser.me/api/',
        data: {
          results: 10,
          testParams: 'test',
          ...filterCase
        },
        dataKey: 'results',
      },
      columns: [
        { title: 'name', dataIndex: 'name', render: text => `${text.first} ${text.last}` },
        { title: 'phone', dataIndex: 'phone' },
        { title: 'gender', dataIndex: 'gender' },
      ],
      rowKey: 'registered',
    }

    return (
      <div className="content-inner">
        <Row gutter={24}>
          <Col {...colProps} className={styles.colClass}>
            <Card title="默认状态">
              <DataTable pagination={false} />
            </Card>
          </Col>
          <Col {...colProps} className={styles.colClass}>
            <Card title="静态数据">
              <DataTable {...staticDataTableProps} />
            </Card>
          </Col>
          <Col {...colProps} className={styles.colClass}>
            <Card title="远程数据">
              <DataTable {...fetchDataTableProps} />
            </Card>
          </Col>
          <Col {...colProps} className={styles.colClass}>
            <Card title="参数变化">
              <Select placeholder="please select gender" onChange={this.handleChange} style={{ width: 200, marginBottom: 16 }}>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
              </Select>
              <DataTable {...caseChangeDataTableProps} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
