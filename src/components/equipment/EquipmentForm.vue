<template lang="html">
  <sui-form>
    <sui-grid>
      <sui-grid-row>
        <sui-grid-column>
          <sui-form-field required>
            <label>Наименование</label>
            <input placeholder="Name" v-model="title" autofocus>
          </sui-form-field>
        </sui-grid-column>
      </sui-grid-row>

      <sui-grid-row>
        <sui-grid-column>
          <sui-form-field required>
            <label>Адрес</label>
            <input placeholder="Address" v-model="address">
          </sui-form-field>
        </sui-grid-column>
      </sui-grid-row>

      <sui-grid-row>
        <sui-grid-column>
          <sui-form-field required>
            <label>Оборудование</label>
            <input placeholder="Equipment" v-model="equipment">
          </sui-form-field>
        </sui-grid-column>
      </sui-grid-row>

      <sui-grid-row>
        <sui-grid-column :width="5">
          <sui-form-field>
            <label>Статус</label>
            <input placeholder="Status" v-model="status">
          </sui-form-field>
        </sui-grid-column>
        <sui-grid-column :width="5">
          <sui-form-field>
            <label>IP адрес</label>
            <input placeholder="IP" v-model="ip">
          </sui-form-field>
        </sui-grid-column>
        <sui-grid-column :width="6">
          <sui-form-field>
            <label>Сер. номер</label>
            <input placeholder="S/N" v-model="sn">
          </sui-form-field>
        </sui-grid-column>
      </sui-grid-row>

      <sui-grid-row>
        <sui-grid-column :width="16">
          <sui-form-field>
            <label>Примечание</label>
            <input placeholder="Note" v-model="note">
          </sui-form-field>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
    <sui-button
      circular
      color="green"
      icon="check"
      content=" Отправить"
      type="submit"
      @click.prevent="addEquipment(title, address, equipment, status, ip, sn, note)"
    />
  </sui-form>
</template>

<script>
  export default {
    name: 'EquipmentForm',
    data() {
      return {
        title: '', address: '', equipment: '', status: '', ip: '', sn: '', note: ''
      }
    },
    methods: {
      addEquipment(name, address, equipment, status, ip, sn, note) {
        if (name && address && equipment) {
          this.$store.dispatch('getAddEquipment', {
            name: name,
            address: address,
            equipment: equipment,
            status: status,
            ip: ip,
            sn: sn,
            note: note
          })
          this.$store.commit('getMessage', {
            display: true,
            color: 'green',
            header: `Элемент ${name} был успешно добавлен!`
          })
        }
        else
          alert('Заполните обязательные поля.')
        document.querySelector('.form').reset()
      }
    }
  };
</script>

<style scoped>
</style>
