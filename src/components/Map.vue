<template>
  <div>
    <sui-dimmer :active="fetching">
      <sui-loader indeterminate />
    </sui-dimmer>

    <div id="map" class="map"></div>
  </div>

</template>

<script>
  import L from 'leaflet'
  import 'leaflet/dist/leaflet.css'
  import {mapState} from 'vuex'

  export default {
    name: "Map",
    data() {
      return {
        path: '@/assets/site_logo.png'
      }
    },
    computed: {
      ...mapState([
        'fetching',
        'equipmentFeature',
        'substationFeature',
        'ovkMtkFeature',
        'muftsFeature'
      ])
    },
    mounted() {
      this.initMap()
    },
    methods: {
      async initMap() {

        let map,
          base_maps,
          layers,
          greyscale,
          streets,
          equipmentStyle,
          substationStyle,
          ovkMtkStyle,
          muftsStyle,
          equipmentLayer,
          substationLayer,
          ovkMtkLayer

        await this.$store.dispatch('getEquipmentFeature')
        await this.$store.dispatch('getSubstationFeature')
        await this.$store.dispatch('getOvkMtkFeature')
        await this.$store.dispatch('getMuftsFeature')

        greyscale = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmFzdGFtYW5zaWkiLCJhIjoiY2o5NDlycXIyMDFjODMybGYxaG50amNmdSJ9.8Ltk_Vm7AFZbXMOs0bJtAA', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.light',
          accessToken: 'pk.eyJ1IjoicmFzdGFtYW5zaWkiLCJhIjoiY2o5NDlycXIyMDFjODMybGYxaG50amNmdSJ9.8Ltk_Vm7AFZbXMOs0bJtAA'
        })

        streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmFzdGFtYW5zaWkiLCJhIjoiY2o5NDlycXIyMDFjODMybGYxaG50amNmdSJ9.8Ltk_Vm7AFZbXMOs0bJtAA', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoicmFzdGFtYW5zaWkiLCJhIjoiY2o5NDlycXIyMDFjODMybGYxaG50amNmdSJ9.8Ltk_Vm7AFZbXMOs0bJtAA'
        })

        equipmentStyle = {
          MTK: {
            radius: 6,
            fillColor: "#304269",
            color: "#D9E8F5",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          },
          EK: {
            radius: 6,
            fillColor: "#F26101",
            color: "#D9E8F5",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          },
          other: {
            radius: 5,
            fillColor: "#91BED4",
            color: "#D9E8F5",
            weight: 1,
            fillOpacity: 0.8
          }
        }

        substationStyle = {
          fillColor: "#B5E655",
          color: "#96CA2D",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }

        ovkMtkStyle = {
          color: "#91BED4",
          weight: 2,
        }

        muftsStyle = {
          radius: 3,
          color: "#91BED4",
          fillColor: "#D9E8F5",
          weight: 1,
          fillOpacity: 1
        }

        function highlightFeature(e) {
          let layer = e.target

          layer.openTooltip()

          layer.setStyle({
            radius: 12,
            fillOpacity: 1
          })
        }

        function resetHighlight(e) {
          equipmentLayer.resetStyle(e.target)
        }

        function zoomToFeature(e) {
          let layer = e.target

          map.setView(e.target.getLatLng(), 17)
          layer.openPopup()
        }

        equipmentLayer = L.geoJSON(this.equipmentFeature, {
          pointToLayer: (feature, latlng) => L.circleMarker(latlng),
          style: feature => {
            if (feature.properties.status === 'MTK' || feature.properties.status === 'МТК')
              return equipmentStyle.MTK
            else if (feature.properties.status === 'EK' || feature.properties.status === 'ЭК')
              return equipmentStyle.EK
            else
              return equipmentStyle.other
          },
          onEachFeature: (feature, layer) => {
            layer.bindTooltip(`<h4>${feature.properties.name}</h4>`)
            layer.bindPopup(`<h3>${feature.properties.name}</h3>
                             <p>${feature.properties.address}</p>
                             <p>${feature.properties.equipment}</p>`)
            layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight,
              click: zoomToFeature
            });
          }
        })

        substationLayer = L.geoJSON(this.substationFeature, {
          pointToLayer: (feature, latlng) => L.polygon(latlng),
          style: substationStyle,
          onEachFeature: (feature, layer) => {
            layer.bindPopup(feature.properties.name)
          }
        })

        ovkMtkLayer = L.layerGroup([
          L.geoJSON(this.ovkMtkFeature, {
            pointToLayer: (feature, latlng) => L.polyline(latlng),
            style: ovkMtkStyle
          }),
          L.geoJSON(this.muftsFeature, {
            pointToLayer: (feature, latlng) => L.circleMarker(latlng),
            style: muftsStyle
          })
        ])

        base_maps = {
          "Mapbox (схема)": greyscale,
          "Mapbox streets": streets
        }

        layers = {
          "Оборудование <i class='deepblue circle icon'></i><i class='orange circle icon'></i>": equipmentLayer,
          "Подстанции <i class='deepgreen square outline icon'></i>": substationLayer,
          "ВОЛС МирТелеКом <i class='lightblue minus icon'></i>": ovkMtkLayer
        }

        map = L.map('map', {
          zoomControl: false,
          layers: [greyscale,ovkMtkLayer, substationLayer, equipmentLayer]
        }).setView([55.702053　, 37.65448379999998], 11)

        L.control.layers(base_maps, layers, {collapsed: false}).addTo(map)
        L.control.zoom({position:'topright'}).addTo(map)

        L.Control.Watermark = L.Control.extend({
          onAdd: function(map) {
            let img = L.DomUtil.create('img');
            img.src = require('@/assets/site_logo.png');
            img.style.margin = '10px';
            return img;
          }
        });

        L.control.watermark = function(opts) {
          return new L.Control.Watermark(opts);
        }

        L.control.watermark({ position: 'bottomright' }).addTo(map);

        this.$store.commit('toggleFetching', false)
      }
    }
  }
</script>

<style>
  .map {
    width: 100vw;
    height: 100vh;
  }
  i.deepblue.icon {
    color: #304269 !important;
  }
  i.deepgreen.icon {
    color: #96CA2D !important;
  }
  i.lightblue.icon {
    color: #91BED4 !important;
  }

  @media (max-width: 450px) {
    img {
      width: 80px;
      height: 50px;
    }
  }
</style>
