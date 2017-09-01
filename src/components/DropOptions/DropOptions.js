import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Button, Icon } from 'antd'

const DropOptions = ({ onMenuClick, menuOptions, buttonStyle, dropdownProps }) => {
  const menus = menuOptions.map((item, key) => (
    <Menu.Item key={item.key}>{item.name}</Menu.Item>
  ))

  return (
    <Dropdown
      overlay={<Menu onClick={onMenuClick}>{menus}</Menu>}
      {...dropdownProps}>
      <Button style={{ border: 'none', ...buttonStyle }}>
        <Icon type="bars" style={{ marginRight: 2 }} />
        <Icon type="down" />
      </Button>
    </Dropdown>
  )
}

DropOptions.propTypes = {
  onMenuClick: PropTypes.func,
  menuOptions: PropTypes.array.isRequired,
  buttonStyle: PropTypes.object,
  dropdownProps: PropTypes.object,
}

export default DropOptions
