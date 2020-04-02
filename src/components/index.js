import WechatMenu from './menu'

export const install = Vue => {
  Vue.component('wechat-menu', WechatMenu)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { WechatMenu }

export default {
  install
}
