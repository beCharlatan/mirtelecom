<template>
    <div class="main" :class="[openedPanel ? 'opened' : 'closed']">
      <div class="content">
        <sui-menu text color="blue" :widths="3">
          <sui-dropdown item text="Ссылки">
            <sui-dropdown-menu>
              <a is="sui-dropdown-item" href="http://172.16.13.251/zabbix/dashboard.php" target="_blank">Zabbix</a>
              <a is="sui-dropdown-item" href="http://172.16.13.250/doc/plane-mtk.jpg" target="_blank">Схема АО МирТелеКом</a>
              <a is="sui-dropdown-item" href="http://172.16.13.250/doc/plane-ec.jpg" target="_blank">Схема Энергокомплекса</a>
              <a is="sui-dropdown-item" href="https://yandex.ru/maps/?um=constructor%3A4d4aa7ef51c7158954cac25167d53246d7393f88c78b5c9a65eee5d380a2ff00&source=constructorLink&mode=usermaps&ll=37.683466%2C55.715383&z=9" target="_blank">Подстанции<span class="description">АЙКОМ</span></a>
            </sui-dropdown-menu>
          </sui-dropdown>
          <a
            is="sui-menu-item"
            v-for="category in categories"
            :active="isActive(category.component)"
            :key="category.component"
            @click.prevent="select(category.component)"
          >
            {{category.title }}
            {{category.title === 'Оборудование' ? equipmentCount : clientCount}}
          </a>
        </sui-menu>
        <sui-container fluid>
          <keep-alive>
            <component :is="active"></component>
          </keep-alive>
        </sui-container>
        <sui-divider horizontal>2018 &copy; МирТелеКом</sui-divider>
      </div>
      <sui-button
        class="switcher"
        compact
        color="orange"
        :icon="openedPanel ? 'angle left' : 'angle right'"
        @click="openedPanel = !openedPanel"
      />
    </div>
</template>

<script>
  import EquipmentPanel from './equipment/EquipmentPanel'
  import ClientPanel from './client/ClientPanel'

  import {mapState, mapGetters} from 'vuex'

    export default {
      name: "MainPanel",
      components: {
        EquipmentPanel,
        ClientPanel
      },
      data() {
        return {
          active: 'EquipmentPanel',
          openedPanel: false,
        }
      },
      computed: {
        ...mapState([
          'categories'
        ]),
        ...mapGetters([
          'equipmentCount',
          'clientCount'
        ])
      },
      methods: {
        isActive(name) {
          return this.active === name;
        },
        select(name) {
          this.active = name;
        }
      }
    }
</script>

<style scoped>
  .main {
    position: absolute;
    display: flex;
    z-index: 1001;
    transition: .5s all;
  }
  .content {
    width: 32vw;
    height: 100vh;
    background-color: white;
    overflow: auto;
  }
  .container {
    padding: 0 10px;
  }
  .switcher {
    width: 40px;
    height: 40px;
    border-radius: 0 !important;
  }
  .opened {
    left: 0;
  }
  .closed {
    left: -32vw;
  }

  @media (max-width: 900px) {
    .content {
      width: 50vw;
    }
    .closed {
      left: -50vw;
    }
  }
  @media (max-width: 450px) {
    .main {
      display: flex;
      flex-direction: column;
    }
    .content {
      width: 100vw;
      height: 60vh;
    }
    .container {
      padding: 0 10px;
    }
    .switcher {
      opacity: .5;
    }
    .closed {
      top: -60vh;
      left: 0;
    }
    .opened {
      top: 0;
    }
  }
</style>
