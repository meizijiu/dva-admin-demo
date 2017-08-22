import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Input, Form , DatePicker, Cascader, Row, Col, Button } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item
const Search = Input.Search
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  }
}

const formItemLayout = {
  labelCol: {
    md: { span: 5 },
  },
  wrapperCol: {
    md: { span: 19 },
  },
}

const Filter = ({
  dispatch,
  filter,
  onFilterChange,
  onAdd,
  form: {
    getFieldDecorator,
    setFieldsValue,
    getFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime && createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }

    return fields
  }

  const handleSubmit = () => {
    const fields = getFieldsValue()
    const newFields = handleFields(fields)

    onFilterChange(newFields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()

    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
         if (fields[item] instanceof Array) {
           fields[item] = []
         } else {
           fields[item] = undefined
         }
      }
    }

    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
            {getFieldDecorator('name')(<Search
              size="large"
              style={{ width: '100%' }}
              placeholder="Search Name"
              onSearch={ handleSubmit } />)}
        </Col>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('address')(<Cascader
              size="large"
              style={{ width: '100%' }}
              options={city}
              placeholder="Please pick an address"
              onChange={ handleSubmit }/>)}
        </Col>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <FormItem label="createTime" {...formItemLayout} style={{ textAlign: 'center', marginBottom: 0 }} colon={false}>
            {getFieldDecorator('createTime')(<RangePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['开始时间', '结束时间']}
              onChange={ handleChange.bind(null, 'address') }
               />)}
          </FormItem>
        </Col>
        <Col {...ColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div>
              <Button type="primary" size="large" style={{ marginRight: '10px' }} onClick={handleSubmit}>Search</Button>
              <Button size="large" onClick={handleReset}>Reset</Button>
            </div>
            <div>
              <Button size="large" type="ghost" onClick={onAdd}>Create</Button>
            </div>
          </div>
        </Col>
      </Row>
  )
}

Filter.propTypes = {
  dispatch: PropTypes.object,
  onFilterChange: PropTypes.func,
  onAdd: PropTypes.func,
  filter: PropTypes.object,
}

export default Form.create({})(Filter)
