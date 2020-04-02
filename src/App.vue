<template>
  <div id="app">
    <wechat-menu v-model="buttons" />
    <pre>
  {{buttons}}
    </pre>
  </div>
</template>

<script>
import { WechatMenu } from '../lib/wechat-menu.umd'
import '../lib/wechat-menu.css'

export default {
  name: 'App',

  components: {
    WechatMenu
  },

  data () {
    return {
      buttons: [
      ]
    }
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

html, body {
  font-size: 14px;
}
</style>
