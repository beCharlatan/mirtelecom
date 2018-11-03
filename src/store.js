import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fetching: true,
    equipmentFeature: null,
    substationFeature: null,
    ovkMtkFeature: null,
    muftsFeature: null,
    equipmentArray: [],
    clientArray: [],
    message: {
      display: false,
      color: '',
      header: ''
    },
    categories: [
      {
        title: 'Оборудование',
        component: 'EquipmentPanel',
      },
      {
        title: 'Клиенты',
        component: 'ClientPanel',
      }
    ]
  },
  getters: {
    equipmentCount(state) {
      return state.equipmentArray.length
    },
    clientCount(state) {
      return state.clientArray.length
    }
  },
  mutations: {
    setEquipmentFeature(state, geojson) {
      state.equipmentFeature = geojson
    },
    setSubstationFeature(state, geojson) {
      state.substationFeature = geojson
    },
    setOvkMtkFeature(state, geojson) {
      state.ovkMtkFeature = geojson
    },
    setMuftsFeature(state, geojson) {
      state.muftsFeature = geojson
    },
    setEquipmentArray(state, arr) {
      state.equipmentArray = arr
    },
    setAddEquipment(state, obj) {
      state.equipmentArray = [
        ...state.equipmentArray,
        obj
      ]
      this.dispatch('getEquipmentArray')
    },
    setDeleteEquipment(state, id) {
      state.equipmentArray = [
        ...state.equipmentArray.filter(item => item.gid !== id)
      ]
    },
    setUpdateEquipment(state, obj) {
      state.equipmentArray = [
        ...state.equipmentArray.map(item => item.gid === obj.id ? obj.obj : item)
      ]
    },
    getMessage(state, obj) {
      state.message.display = obj.display
      state.message.color = obj.color
      state.message.header = obj.header

      setTimeout(() => state.message.display = false, 5000)
    },
    toggleFetching(state, bool) {
      state.fetching = bool
    }
  },
  actions: {
    async getEquipmentFeature({commit}) {
      const res = await api.fetchEquipmentFeature()
      commit('setEquipmentFeature', res.data['jsonb_build_object'])
    },
    async getSubstationFeature({commit}) {
      const res = await api.fetchSubstationFeature()
      commit('setSubstationFeature', res.data['jsonb_build_object'])
    },
    async getOvkMtkFeature({commit}) {
      const res = await api.fetchOvkMtkFeature()
      commit('setOvkMtkFeature', res.data['jsonb_build_object'])
    },
    async getMuftsFeature({commit}) {
      const res = await api.fetchMuftsFeature()
      commit('setMuftsFeature', res.data['jsonb_build_object'])
    },
    async getEquipmentArray({commit}) {
      const res = await api.fetchEquipmentArray()
      commit('setEquipmentArray', res.data)
    },
    async getAddEquipment({commit}, obj) {
      await api.fetchAddEquipment(obj)
      commit('setAddEquipment', obj)
    },
    async getDeleteEquipment({commit}, id) {
      await api.fetchDeleteEquipment(id)
      commit('setDeleteEquipment', id)
    },
    async getUpdateEquipment({commit}, obj) {
      await api.fetchUpdateEquipment(obj.id, obj.obj)
      commit('setUpdateEquipment', obj)
    },
    async getCoordsFromGeocoder({commit}, obj) {
      await api.fetchCoordsFromGeocoder(obj.id, obj.address)
    }
  }
})
