import KmAddressPicker from './AddressLinkage.vue'

// 为组件添加 install 方法，用于按需引入
KmAddressPicker.install = function (Vue) {
    Vue.component(KmAddressPicker.name, KmAddressPicker)
}

export default KmAddressPicker