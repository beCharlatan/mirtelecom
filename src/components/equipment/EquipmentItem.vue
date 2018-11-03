<template lang="html">
  <sui-list-item>
    <div class="right floated content">
      <sui-icon name="trash link alternate red" size="standard" @click="deleteEquipment(id, title)"></sui-icon>
    </div>
    <sui-list-icon :name="description ? 'circle' : 'circle outline'" size="standard" />
    <sui-list-content>
      <a is="sui-list-header" v-text="title" @click.prevent="description = !description"></a>
      <span is="sui-list-description" v-text="address"></span>
      <a is="sui-list-description" @click="editing = !editing, description = true" v-show="!editing">Изменить</a>
      <a
        is="sui-list-description"
        v-show="editing"
        @click="updateEquipment(
          $el.querySelector('input[name = title]').value,
          $el.querySelector('input[name = address]').value,
          $el.querySelector('input[name = equipment]').value,
          $el.querySelector('input[name = status]').value,
          $el.querySelector('input[name = ip]').value,
          $el.querySelector('input[name = sn]').value,
          $el.querySelector('input[name = note]').value,
          id
        )"
      >Сохранить</a>
    </sui-list-content>

    <sui-table celled color="red" v-show="description">
      <sui-table-header>
        <sui-table-row>
          <sui-table-header-cell :width="5">Характеристика</sui-table-header-cell>
          <sui-table-header-cell>Значение</sui-table-header-cell>
        </sui-table-row>
      </sui-table-header>
      <sui-table-body>
        <sui-table-row  v-for="(val, key, index) in this.$props" :key="index">
          <sui-table-cell :width="4" v-text="key.toUpperCase()"></sui-table-cell>
          <sui-table-cell>
            <span v-text="val" v-show="!editing"></span>
            <div class="ui mini input" v-show="editing"><input :name="key" :value="val" /></div>
          </sui-table-cell>
        </sui-table-row>
      </sui-table-body>
      <sui-table-footer full-width>
        <sui-table-row>
          <sui-table-header-cell colspan="2">
            <a target="_blank" @click.prevent="linkToConfig(title)" >
              Файл конфигурации
              <sui-label size="small">
                .txt
              </sui-label>
            </a>
            <sui-button
              inverted
              color="red"
              circular
              floated="right"
              size="mini"
              icon="map marker alternate"
              title="Геокодировать"
              @click.prevent="geocode(id, address)"
            >
            </sui-button>
          </sui-table-header-cell>
        </sui-table-row>
      </sui-table-footer>
    </sui-table>

  </sui-list-item>

</template>

<script>
  export default {
    name: 'EquipmentItem',
    props: ['id', 'title', 'address', 'equipment', 'status', 'ip', 'sn', 'note'],
    data() {
      return {
        description: false,
        editing: false,
      }
    },
    methods: {
      updateEquipment(name, address, equipment, status, ip, sn, note, id) {
        if (confirm(`Вы действительно хотите изменить данный объект: ${name}??`)) {
          this.$store.dispatch('getUpdateEquipment', {
            obj: {
              gid: id,
              name: name,
              address: address,
              equipment: equipment,
              status: status,
              ip: ip,
              sn: sn,
              note: note
            },
            id})
          this.$store.commit('getMessage', {
            display: true,
            color: 'yellow',
            header: `Элемент ${name} был успешно изменён!`
          })
        }
        this.$data.editing = false
      },
      geocode(id, address) {
        if (confirm(`Вы действительно хотите геокодировать объект по адресу: ${address}??`)) {
          this.$store.dispatch('getCoordsFromGeocoder', {
            id: id,
            address: address
          })
          this.$store.commit('getMessage', {
            display: true,
            color: 'yellow',
            header: `Адрес ${address} был успешно добавлен на карту!`
          })
        }
      },
      deleteEquipment(id, title) {
        if (confirm(`Вы действительно хотите удалить этот объект: ${title}?`)) {
          this.$store.dispatch('getDeleteEquipment', id)
          this.$store.commit('getMessage', {
            display: true,
            color: 'red',
            header: `Элемент под номером ${id} был успешн удалён!`
          })
        }

      },
      linkToConfig(title) {
        let href = `http://172.16.13.250/cisconfig/${title}.txt`
        window.open(href, '_blank')
      }
    }
  }
</script>

<style>
  .ui.grid {
    margin: 0 !important;
  }
  .ui.mini.input {
    width: 100% !important;
    height: 100% !important;
  }
  .header {
    font-size: 1.15em;
  }
</style>
