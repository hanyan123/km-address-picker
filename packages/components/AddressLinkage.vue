<template>
  <div class="address-box">
    <el-select
      v-model="province"
      placeholder="请选择省"
      :size="size"
      @change="provinceChange"
    >
      <el-option
        v-for="item in provinceOptions"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]">
      </el-option>
    </el-select>
    <el-select
      v-model="city"
      placeholder="请选择市"
      :size="size"
      @change="cityChange"
      style="margin-left: 20px"
    >
      <el-option
        v-for="item in cityOptions"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]">
      </el-option>
    </el-select>
    <el-select
      v-if="level === 3"
      v-model="area"
      :size="size"
      placeholder="请选择区/县"
      style="margin-left: 20px"
      @change="areaChange"
    >
      <el-option
        v-for="item in areaOptions"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'KmAddressPicker',
  props: {
    mapJson: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Array,
      default: () => []  
    },
    valueKey: {
      type: String,
      default: 'areacode'
    },
    labelKey: {
      type: String,
      default: 'areaname'
    },
    size: {
      type: String,
      default: 'small'
    },
    valueType: {
      type: String,
      default: 'code' // code：编码，value：name + 编码
    },
    level: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      province: '',
      provinceOptions: [],
      city: '',
      cityOptions: [],
      area: '',
      areaOptions: [],
      values: []
    }
  },
  created() {
    this.provinceOptions = this.mapJson.data
  },
  methods: {
    provinceChange(val) {
      this.city = ''
      this.area = ''
      this.areaOptions = []
      let province = this.provinceOptions.find(item => {
        return item[this.valueKey] === val
      })
      this.cityOptions = province.subarea
      // 组合数据
      if (this.valueType === 'code') {
        this.values = [this.province]
      } else if (this.valueType === 'value') {
        this.values = [
          {[this.labelKey]: province[this.labelKey], [this.valueKey]: this.province}
        ]
      }
      this.$emit('input', this.values)
    },
    cityChange(val) {
      this.area = ''
      let city = this.cityOptions.find(item => {
        return item[this.valueKey] === val
      })
      this.areaOptions = city.subarea
      // 组合数据
      if (this.valueType === 'code') {
        this.$set(this.values, 1, this.city)
      } else if (this.valueType === 'value') {
        this.$set(this.values, 1, {[this.labelKey]: city[this.labelKey], [this.valueKey]: this.city})
      }
      this.$emit('input', this.values)
    },
    areaChange(val) {
      let area = this.areaOptions.find(item => {
        return item[this.valueKey] === val
      })
      // 组合数据
      if (this.valueType === 'code') {
        this.$set(this.values, 2, this.area)
      } else if (this.valueType === 'value') {
        this.$set(this.values, 2, {[this.labelKey]: area[this.labelKey], [this.valueKey]: this.area})
      }
      this.$emit('input', this.values)
    }
  },
  watch: {
    value: {
      handler(val) {
        // 数据更新完以后执行
        this.$nextTick(() => {
          if (this.valueType === "code") {
            if (val[0]) {
              this.province = val[0]
              this.cityOptions = this.provinceOptions.find(item => {
                return item[this.valueKey] === val[0]
              }).subarea
            }
            if (val[1]) {
              this.city = val[1]
              this.areaOptions = this.cityOptions.find(item => {
                return item[this.valueKey] === val[1]
              }).subarea
            }
            if (val[2]) {
              this.area = val[2]
            }
          } else if (this.valueType === "value") {
            if (val[0]) {
              this.province = val[0][this.valueKey]
              this.cityOptions = this.provinceOptions.find(item => {
                return item[this.valueKey] === val[0][this.valueKey]
              }).subarea
            }
            if (val[1]) {
              this.city = val[1][this.valueKey]
              this.areaOptions = this.cityOptions.find(item => {
                return item[this.valueKey] === val[1][this.valueKey]
              }).subarea
            }
            if (val[2]) {
              this.area = val[2][this.valueKey]
            }
          }
          this.$emit('input', val)
        })
      },
      immediate: true
    }
  }
}
</script>

<style>

</style>