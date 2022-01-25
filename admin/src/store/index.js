import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    data: {},
    identity: ''
  },
  mutations: {
    // 设置用户状态和用户身份
    setUserData(state, value) {
      state.data = value.data
      state.identity = value.identity
    }
  },
  actions: {},
  modules: {}
})