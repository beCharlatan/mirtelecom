<template>
  <div>

    <sui-accordion exclusive>
      <sui-accordion-title>
        <sui-button
          circular
          color="blue"
          icon="plus"
          content=" Добавить оборудование" />
      </sui-accordion-title>
      <sui-accordion-content>
        <EquipmentForm class="form" />
      </sui-accordion-content>
    </sui-accordion>

    <sui-divider hidden />

    <sui-message
      dismissable
      @dismiss="handleDismiss"
      v-show="message.display"
      :color="message.color"
      :header="message.header"
      content="Это сообщение автоматически пропадёт через 5 секунд."
    />

    <EquipmentList :equipment="equipmentArray" />



  </div>
</template>

<script>
  import EquipmentForm from './EquipmentForm'
  import EquipmentList from './EquipmentList'

  import {mapState} from 'vuex'

    export default {
      name: "EquipmentPanel",
      components: {
        EquipmentForm,
        EquipmentList
      },
      computed: {
        ...mapState([
          'equipmentArray',
          'message'
        ])
      },
      mounted() {
        this.$store.dispatch('getEquipmentArray')
        setInterval(() => this.$store.dispatch('getEquipmentArray'), 30000)
      },
      methods: {
        handleDismiss() {
          this.message.display = false
        }
      }
    }
</script>

<style scoped>
  .accordion {
    text-align: center;
  }
</style>
