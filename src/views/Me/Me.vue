<template>
  <div class="me">
    <Login v-if="!userInfo.user_id" />
    <me-top v-else />
  </div>
</template>

<script>
import Login from './../Login/Login'
import SelectLogin from './../Login/SelectLogin'
import MeTop from './Metop'
import { mapState } from 'vuex'
export default {
  name: 'me',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  components: {
    SelectLogin,
    MeTop,
    Login
  }
}
</script>

<style lang="stylus" scoped>
.me
  max-width 640px
  position relative
</style>
