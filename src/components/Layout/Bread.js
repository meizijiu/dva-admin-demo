import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Icon, Breadcrumb } from 'antd'
import { queryArray } from '../../utils'
import pathToRegexp from 'path-to-regexp'
import styles from './Bread.less'

const Bread = ({ menu }) => {
  let pathArray = []
  let current

  for (let index in menu) {
    let result = pathToRegexp(menu[index].route).exec(location.pathname)

    if (result) {
      current = menu[index]
      break
    }
  }

  const getPathArray = (item) => {
    pathArray.unshift(item)

    if (item.bpid) {
      getPathArray(queryArray(item, item.bpid, 'mpid'))
    }
  }

  if (!current) {
    pathArray.push(menu[0] || {
      id: 1,
      icon: 'laptop',
      name: 'Dashboard',
    })

    pathArray.push({
      id: 404,
      name: 'NOT FOUND'
    })
  } else {
    getPathArray(current)
  }

  const breads = pathArray.map((item, key) => {
    const content = (
      <span>{item.icon ? <Icon type={item.icon} style={{ marginRight: 4 }} /> : ''}{item.name}</span>
    )

    return (
      <Breadcrumb.Item key={key}>
        {
          ((pathArray.length - 1) !== key)
            ? <Link to={item.route}>
              {content}
            </Link> : content
        }
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        {breads}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  menu: PropTypes.array
}

export default Bread
