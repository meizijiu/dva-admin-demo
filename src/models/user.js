import modelExtend from 'dva-model-extend'
import { pageModel } from './commonTable'
import { queryUsers, add } from '../services/users'

export default modelExtend(pageModel, {
  namespace: 'user',
  state: {},

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

    * delete () {

    },

    * multiDelete () {

    },

    * update () {

    }
  },

  reducers: {

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
