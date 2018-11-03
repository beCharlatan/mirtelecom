import {server, geocode} from '@/services/config'

export default {
  fetchEquipmentFeature() {
    return server().get('equipment_as_feature')
  },
  fetchSubstationFeature() {
    return server().get('substation_as_feature')
  },
  fetchOvkMtkFeature() {
    return server().get('ovk_mtk_as_feature')
  },
  fetchMuftsFeature() {
    return server().get('mufts_as_feature')
  },
  fetchEquipmentArray() {
    return server().get('equipment')
  },
  fetchAddEquipment(obj) {
    return server().post('equipment', obj)
  },
  fetchDeleteEquipment(id) {
    return server().delete(`equipment/${id}`)
  },
  fetchUpdateEquipment(id, obj) {
    return server().put(`equipment/${id}`, obj)
  },
  async fetchCoordsFromGeocoder(id, address) {
    try {
      const response = await geocode().get('/', {
        params: {
          format: 'json',
          geocode: address
        }
      })
      let jsonObject = JSON.parse(response.request.response)
      let point = jsonObject["response"]["GeoObjectCollection"]["featureMember"][0]["GeoObject"]["Point"]["pos"]
      let coordsArr = point.split(' ')
      let obj = {
        y: coordsArr[1],
        x: coordsArr[0]
      }
      return server().put(`equipment/geocode/${id}`, obj)
    } catch (error) {
      console.error(error);
    }
  },
}
