<template>
  <div>

    <sui-grid>

      <sui-grid-row>
        <sui-grid-column>
          <h2 is="sui-header">
            <sui-icon name="server" />
            <sui-header-content>
              Список оборудования
              <sui-header-subheader>Нажмите на название для просмотра</sui-header-subheader>
            </sui-header-content>
          </h2>
        </sui-grid-column>
      </sui-grid-row>

      <sui-grid-row>
        <sui-grid-column>
          <sui-form>
            <div class="three fields">
              <sui-form-field>
                <sui-input placeholder="Найти..." icon="search" v-model="title" />
              </sui-form-field>
              <sui-form-field>
                <select class="ui fluid dropdown" v-model="address">
                  <option value="">Адрес</option>
                  <option :value="i" v-text="i" v-for="i in uniqueAddress"></option>
                </select>
              </sui-form-field>
              <sui-form-field>
                <select class="ui fluid dropdown" v-model="status">
                  <option value="">Статус</option>
                  <option :value="i" v-text="i" v-for="i in uniqueStatus"></option>
                </select>
              </sui-form-field>
            </div>
          </sui-form>
        </sui-grid-column>
      </sui-grid-row>

    </sui-grid>

    <sui-list divided relaxed class="listItem">
      <EquipmentItem
        v-for="item in filteredItems"
        :key="item.gid"
        :id="item.gid"
        :title="item.name"
        :address="item.address"
        :equipment="item.equipment"
        :status="item.status"
        :ip="item.ip"
        :sn="item.sn"
        :note="item.note"
      />
    </sui-list>

    <p v-if="filteredItems.length === 0">Ничего не найдено.</p>

  </div>
</template>

<script>
  import EquipmentItem from './EquipmentItem'

  export default {
    name: "EquipmentList",
    components: {
      EquipmentItem
    },
    props: ['equipment'],
    data() {
      return {status: '', address: '', title: ''}
    },
    computed: {
      filteredItems: function() {
        return this.equipment.filter(item => {
          let status = this.status !== '' ? item.status === this.status : true,
            address = this.address !== '' ? item.address === this.address : true,
            title = this.title !== '' ? item.name.toUpperCase().indexOf(this.title.toUpperCase()) > -1 : true
          return status && address && title
        })
      },
      uniqueAddress: function () {
        let current,
          length = this.equipment.length,
          unique = [];
        for (let i = 0; i < length; i++) {
          current = this.equipment[i].address;
          if (!~unique.indexOf(current) && current.length > 0) unique.push(current);
        }
        return unique
      },
      uniqueStatus: function () {
        let current,
          length = this.equipment.length,
          unique = [];
        for (let i = 0; i < length; i++) {
          current = this.equipment[i].status;
          if (!~unique.indexOf(current) && current.length > 0) unique.push(current);
        }
        return unique
      }
    }
  }
</script>

<style scoped>
</style>

