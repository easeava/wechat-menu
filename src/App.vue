<template>
  <div id="app">
    <wechat-menu v-model="buttons" />
    <pre>
  {{buttons}}
    </pre>
  </div>
</template>

<script>
import WechatMenu from '@/components/menu'

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
