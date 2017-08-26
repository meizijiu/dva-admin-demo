import React from 'react'
import PropTypes from 'prop-types'
import Mock from 'mockjs'
import { Button, Select, Row, Col, Card, Input } from 'antd'
import { request, config } from '../../utils'
import styles from './index.less'

const Option = Select.Option

const cardProps = {
  title: 'Request',
  bodyStyle: {
    overflow: 'visible'
  }
}

const colProps = {
  span: 12,
  xs: 24,
  sm: 24,
  md: 12
}

const { api } = config
const { dashboard, users, userLogin, user, v1test, v2test } = api

const requestOptions = [
  {
    url: user.replace('/:id', ''),
    desc: 'intercept request by mock.js',
  },
  {
    url: dashboard,
    desc: 'intercept request by mock.js',
  },
  {
    url: userLogin,
    method: 'post',
    data: {
      username: 'guest',
      password: 'guest',
    },
    desc: 'intercept request by mock.js',
  },
  {
    url: users,
    desc: 'intercept request by mock.js',
  },
  {
    url: user,
    desc: 'intercept request by mock.js',
    data: Mock.mock({ id: '@id' })
  },
  {
    url: user.replace('/:id', ''),
    desc: 'intercept request by mock.js',
    method: 'post',
    data: Mock.mock({
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      avatar () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
      },
    }),
  },
  {
    url: user,
    desc: 'intercept request by mock.js',
    method: 'patch',
    data: Mock.mock({
      id: '@id',
      name: '@name',
    }),
  },
  {
    url: user,
    desc: 'intercept request by mock.js',
    method: 'delete',
    data: Mock.mock({
      id: '@id',
    }),
  },
  {
    url: v1test,
    desc: 'intercept request by mock.js',
    method: 'get',
  },
  {
    url: v2test,
    desc: 'intercept request by mock.js',
    method: 'get',
  }
]

export default class RequestPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentRequest: requestOptions[0],
      method: 'get',
      result: '',
    }
  }

  componentDidMount () {
    this.handleRequest()
  }

  handleRequest = () => {
    const { currentRequest } = this.state
    const { desc, ...requestParams } = currentRequest

    this.setState({
      ...this.state,
      result: <div key="sending">
        请求中<br />
        url: { currentRequest.url }<br />
        method: { currentRequest.method }<br />
        params: { currentRequest.data ? JSON.stringify(currntRequest.data) : null }<br />
      </div>,
    })

    request({ ...requestParams }).then((res) => {
      const state = this.state
      state.result = [this.state.result, <div key="complete"><div>请求完成</div>{JSON.stringify(res)}</div>]

      this.setState(state)
    })
  }

  handeleURLChange = (value) => {
    const state = this.state
    const currentUrl = value.split('?')[0]
    const currentMethod = value.split('?')[1]
    const currentItem = requestOptions.filter((item) => {
      const { method = 'get' } = item
      return item.url === currentUrl && currentMethod === method
    })

    state.currentRequest = currentItem[0]
    this.setState(state)
  }

  render () {
    const { result, currentRequest } = this.state
    const { method = 'get' } = currentRequest

    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col {...colProps}>
            <Card {...cardProps}>
              <div className={styles.option}>
                <Select style={{ width: '100%', flex: 1 }}
                  defaultValue={`${method.toLocaleUpperCase()}    ${requestOptions[0].url}`}
                  size="large" onChange={this.handeleURLChange} >
                  {requestOptions.map((item, index) => {
                    const m = item.method || 'get'

                    return (
                      <Option key={index} value={`${item.url}?${m}`}>
                        {`${m.toLocaleUpperCase()}    `}{item.url}
                      </Option>
                    )
                  })}
                </Select>
                <Button type="primary" style={{ width: 100, marginLeft: 16 }} onClick={this.handleRequest}>发送</Button>
              </div>
              <div className={styles.params}>
                <div className={styles.label}>Params: </div>
                <Input disabled value={currentRequest.data ? JSON.stringify(currentRequest.data) : 'null'} size="large" style={{ width: 200 }} placeholder="null" />
                <div style={{ flex: 1, marginLeft: 16 }}>{currentRequest.desc}</div>
              </div>
              <div className={styles.result}>
                {result}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
