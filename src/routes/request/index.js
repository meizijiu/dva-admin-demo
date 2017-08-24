import React from 'react'
import PropTypes from 'prop-types'
import { Button, Select, Row, Col, Card } from 'antd'


const Request = ({ dispatch }) => {
  const cardProps = {
    title: 'Request',
    bodyStyle: {

    },
  }

  const ColProps = {
    span: 12,
    xs: 24,
    sm: 24,
    md: 12
  }

  return (
    <div className="content-inner">
      <Row gutter={24}>
        <Col {...ColProps}>
          <Card {...cardProps}>
            <p>this is the request html!</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

Request.propTypes = {
  dispatch: PropTypes.func,
}

export default Request
