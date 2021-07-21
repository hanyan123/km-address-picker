<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <KmAddressPicker
      v-model="address"
      valueKey="areacode"
      labelKey="areaname"
      valueType="value"
      :level="3"
      :map-json="mapJson"
    />
  </div>
</template>

<script>
// import AddressLinkage from '../packages/AddressLinkage.vue'
import MapJson from '../address.json'
export default {
  name: 'App',
  components: {
    // AddressLinkage
  },
  data () {
    return {
      msg: '1213231313',
      address: []
    }
  },
  computed: {
    mapJson() {
      return MapJson
    }
  },
  watch: {
    address: {
      handler(val) {
        console.log(val)
      },
      deep: true
    }
  }
}
</script>

<style>

</style>
