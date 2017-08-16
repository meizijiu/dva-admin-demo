import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { arrayToTree, queryArray } from '../../utils'
import PathToRegexp from 'path-to-regexp'

const Menus = ({ siderFold, darkTheme, handleClickNavMenu, navOpenKeys, changeOpenKeys, menu }) => {
  return (
    <div>this is menu</div>
  )
}

Menus.PropTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  handleClickNavMenu: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Menus
