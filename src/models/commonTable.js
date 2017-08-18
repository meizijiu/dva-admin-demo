import modelExtend from 'dva-model-extend'

const Model = {
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

const pageModel = modelExtend(Model, {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `Total ${total} Items`,
      current: 1,
      total: 0,
    }
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { list, pagination } = payload

      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        }
      }
    }
  }
})

module.exports = {
  Model,
  pageModel
}
