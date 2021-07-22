<template>
  <div class="address-box">
    <el-select
      v-if="level >= 1"
      v-model="areaModel[0]"
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
      v-if="level >= 2"
      v-model="areaModel[1]"
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
      v-if="level >= 3"
      v-model="areaModel[2]"
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
import { cloneDeep } from 'lodash'
const type = {
  code: 'code',
  value: 'value',
  text: 'text'
}
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
      default: 'small',
      validator: val => ['medium', 'small', 'mini'].indexOf(val) > -1
    },
    valueType: {
      type: String,
      default: 'code', // code：编码，value：name + 编码
      validator: val => ['code', 'value', 'text'].indexOf(val) > -1
    },
    level: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      values: [],
      province: '',
      provinceOptions: [],
      city: '',
      cityOptions: [],
      area: '',
      areaOptions: [],
      areaModel: ['', '', '']
    }
  },
  created() {
    this.provinceOptions = this.mapJson.data
    this.setValues()
  },
  methods: {
    provinceChange(val) {
      this.city = ''
      this.area = ''
      this.areaOptions = []
      let province = this.findOptions(this.provinceOptions, val)
      this.cityOptions = province.subarea
      // 组合数据
      this.values = [
        {[this.labelKey]: province[this.labelKey], [this.valueKey]: this.areaModel[0]}
      ]
      this.$emit('input', this.formateValues()[this.valueType])
    },
    cityChange(val) {
      this.area = ''
      let city = this.findOptions(this.cityOptions, val)
      this.areaOptions = city.subarea
      // 组合数据
      this.$set(this.values, 1, {[this.labelKey]: city[this.labelKey], [this.valueKey]: this.areaModel[1]})
      this.$emit('input', this.formateValues()[this.valueType])
    },
    areaChange(val) {
      let area = this.findOptions(this.areaOptions, val)
      // console.log(this.getOptions)
      // 组合数据
      this.$set(this.values, 2, {[this.labelKey]: area[this.labelKey], [this.valueKey]: this.areaModel[2]})
      this.$emit('input', this.formateValues()[this.valueType])
    },

    // 查找下级数据
    findOptions(options, code) {
      if (code) {
        return options.find(item => item[this.valueKey] === code)
      } else {
        return []
      }
    },
    formateValues() {
      return {
        [type['code']]: this.values.slice(0, this.level + 1).map(item => item[this.valueKey]),
        [type['value']]: this.values.slice(0, this.level + 1).map(item => item),
        [type['text']]: this.values.slice(0, this.level + 1).map(item => item[this.labelKey])
      }
    },
    // 判断默认值是不是code
    isCode(val) {
      return typeof Number(val) === 'number'
    },
    // 组件初始化时设置默认值
    setValues() {
      if (this.value.length) {
        this.areaModel = cloneDeep(this.value)
        let codeFlag = this.value.every(item => this.isCode(item))
        if (codeFlag) {
          let province = this.areaModel[0] ? this.findOptions(this.provinceOptions, this.areaModel[0]) : {}
          this.cityOptions = province.subarea
          let city = this.areaModel[1] ? this.findOptions(this.cityOptions, this.areaModel[1]) : {}
          this.areaOptions = city.subarea
        }
      }
    }
  },
}
</script>

<style>

</style>