<template>
  <div id="app">
    <MainPanel />
    <Map />
  </div>
</template>

<script>
  import Map from './components/Map'
  import MainPanel from './components/MainPanel'

  export default {
    name: "App",
    components: {
      Map,
      MainPanel
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
