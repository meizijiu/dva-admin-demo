import modelExtend from 'dva-model-extend'
import { pageModel } from './commonTable'
import { queryUsers } from '../services/users'
import { update, remove } from '../services/user'

export default modelExtend(pageModel, {
  namespace: 'user',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: []
  },

  effects: {
    * query ({ payload }, { call, put }) {
      const result = yield call(queryUsers, payload)
       if (result.success) {
         yield put({
           type: 'querySuccess',
           payload: {
             list: result.data,
             pagination: {
               current: Number(payload.page) || 1,
               pageSize: Number(payload.pageSize) || 10,
               total: result.total,
             }
           }
         })
       } else {
         throw result
       }
    },

    * add () {

    },

    * delete ({ payload }, { call, put, select }) {
      const { page = 1, pageSize = 10, id } = payload

      const data = yield call(remove, { id: id })

      const { selectedRowKeys } = yield select(_ => _.user)

      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRows: selectedRowKeys.filter(_ => _ !== id) } })
        yield put({ type: 'query', payload: { page: page, pageSize: pageSize } })
      } else {
        throw data
      }
    },

    * update ({ payload }, { call, put, select }) {
      const { page = 1, pageSize = 10, ...params } = payload

      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...params, id }

      const data = yield call(update, newUser)

      if (data.success) {
          yield put({ type: 'hideModal' })
          yield put({ type: 'query', payload: { page: page, pageSize: pageSize }})
      } else {
        throw data
      }
    }
  },

  reducers: {
    showModal (state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: true,
      }
    },

    hideModal (state) {
      return {
        ...state,
        modalVisible: false
      }
    }
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'query',
          payload: { ...location.query}
        })
      })
    }
  }
})
