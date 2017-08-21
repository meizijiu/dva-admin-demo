import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Tooltip, Icon } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item
const RadioGroup = Radio.Group

const FormLabel = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  }
}

const modal = ({
    item = {},
    onOk,
    ...modalProps,
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue,
    }
  }) => {
    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return
        }

        const data = {
          ...getFieldsValue(),
          id: item.id,
        }
        data.address = data.address.join(' ')

        onOk(data)
      })
    }

    const modalOpts = {
      ...modalProps,
      onOk: handleOk,
    }

    return (
      <Modal {...modalOpts}>
          <Form layout="horizontal">
            <FormItem
              {...FormLabel}
              label="Name"
              hasFeedback>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [ {
                  required: true, message: 'Please input your name!',
                }]
              })(<Input />)}
            </FormItem>
            <FormItem
              {...FormLabel}
              label={
                (<span>NickName&nbsp;
                  <Tooltip title="What do you want other to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                 </span>)
              }
              hasFeedback>
              {getFieldDecorator('nickName', {
                initialValue: item.nickName,
                rules: [{
                  required: true, message: 'Please input your nickname!', whitespace: true
                }]
              })(<Input />)}
            </FormItem>
            <FormItem
              {...FormLabel}
              label="Gender"
              hasFeedback>
                {getFieldDecorator('isMale', {
                  initialValue: item.isMale,
                  rules: [{
                    required: true,
                    type: 'boolean'
                  }]
                })(
                  <RadioGroup>
                    <Radio value>male</Radio>
                    <Radio value={false}>female</Radio>
                  </RadioGroup>)}
            </FormItem>
            <FormItem
              {...FormLabel}
              label="Age"
              hasFeedback>
              {getFieldDecorator('age', {
                initialValue: item.age,
                rules: [
                  {
                    required: true,
                    type: 'number',
                  }
                ]
              })(
                <InputNumber min={18} max={100} />
              )}
            </FormItem>
            <FormItem
              {...FormLabel}
              label="Phone"
              hasFeedback>
              {getFieldDecorator('phone', {
                initialValue: item.phone,
                rules: [
                  {
                    required: true,
                    pattern: /^1[34578]\d{9}$/,
                    message: 'The input is not valid phone!',
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem
              {...FormLabel}
              label="email"
              hasFeedback>
              {getFieldDecorator('email', {
                initialValue: item.email,
                rules: [
                  {
                    required: true,
                    pattern: /^([a-zA-Z0-9\.])+@([a-zA-Z0-9\.])+(.[a-zA-Z0-9^])+/,
                    message: 'The input is not valid E-mail!',
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem
              {...FormLabel}
              label="Address"
              hasFeedback>
              {getFieldDecorator('address', {
                initialValue: item.address && item.address.split(' '),
                rules: [
                  {
                    required: true
                  },
                ]
              })(
                <Cascader
                  size = "large"
                  style = {{ width: '100%' }}
                  options = {city}
                  placeholder = "Pick an address"
                />
              )}
            </FormItem>
          </Form>
      </Modal>
    )
}

modal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
  modalProps: PropTypes.object,
}

export default Form.create({})(modal)
