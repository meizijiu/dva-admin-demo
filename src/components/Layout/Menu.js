import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import { arrayToTree, queryArray } from '../../utils'
import PathToRegexp from 'path-to-regexp'

const Menus = ({ siderFold, darkTheme, handleClickNavMenu, navOpenKeys, changeOpenKeys, menu }) => {
  // 生成树状
  const menuTree = arrayToTree(menu.filter(_ => _.mpid !== '-1'), 'id', 'mpid')
  const levelMap = {}

  // 生成递归菜单
  const getMenus = (menuTreeN, siderFoldN) => {
    return menuTreeN.map((item) => {
      if (item.children) {
        if (item.mpid) {
          levelMap[item.id] = item.mpid
        }
        return (
          <Menu.SubMenu
            key={item.id}
            title={
              <span>
                {item.icon && <Icon type={item.icon} />}
                {(!siderFoldN || !menuTreeN.includes(item)) && item.name}
              </span>
            }>
            {getMenus(item.children, siderFoldN)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id}>
          <Link to={item.route}>
            {item.icon && <Icon type={item.type} />}
            {(!siderFoldN || !menuTree.includes(item)) && item.name }
          </Link>
        </Menu.Item>
      )
    })
  }
  const menuItems = getMenus(menuTree, siderFold)

  // 保持选中
  const getAncestorKeys = (key) => {
    let map = {}
    const getParent = (index) => {
      const result = [Stirng](levelMap[index])
      if (levelMap[result[0]]) {
        result.unshift(getParent(result[0])[0])
      }
      return result
    }

    for (let index in levelMap) {
      if ({}.hasOwnProperty.call(levelMap, index) {
        map[index] = getParent(index)
      })
    }
    return map[key] || []
  }

  const onOpenChange = (openKeys) => {
    
  }


  let menuProps = !siderFold ? {
    onOpenChange,
    openKeys: navOpenKeys,
  } : {}

  return (
    <Menu
      {...menuProps}
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      onClick={handleClickMenu}
      defaultSelectedKeys={defaultSelectedKeys}
      >
        {menuItems}
      </Menu>
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
