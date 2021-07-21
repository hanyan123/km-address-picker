# address-picker

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```
npm install km-address-picker --save


main.js

import kmAddressPicker from 'km-address-picker'
Vue.use(kmAddressPicker)

```

```
<KmAddressPicker
  v-model="address"
  valueKey="areacode"
  labelKey="areaname"
  valueType="value"
  :level="3"
  :map-json="mapJson"
/>

```


```
// 省市区数据
mapJson: {
  type: Object,
  default: () => {}
},
// v-model绑定数据
value: {
  type: Array,
  default: () => []  
},
// 自定义code字段key
valueKey: {
  type: String,
  default: 'areacode'
},
// 尺寸大小 详见element ui
size: {
  type: String,
  default: 'small'
},
// 自定义label字段key
labelKey: {
  type: String,
  default: 'areaname'
},
// 支持纯code 也支持key:value 默认是code 也可自定义key和value字段 { areaname:'河南', areacode: 'xxxxx' }
valueType: {
  type: String,
  default: 'code' // code：编码，value：name + 编码
},
// 支持两级 三级联动默认是三级联动
level: {
  type: Number,
  default: 3
}

```