<template>
  <div id="app">
    <div id="cover"></div>
    <div id="loading" v-show= "loading">
      <Loading></Loading>
    </div>
    <Header></Header>
    <transition name = 'fade' mode="out-in">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
    <button @click="notify">点击</button>
    <!-- <Notification content='test notification'></Notification> -->
  </div>
</template>

<script>

import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
import Loading from './components/loading/loading.vue'


export default {
  mounted () {
    //console.log(this.$store)
    //let i = 1
    //用来出发actions的dispatch，相当于commit是用来出发mutations的.
    /*this.$store.dispatch('updateCountAsync', {
      num: 5,
      time: 2000
    })*/
    /*setInterval(() => {
      this.$store.commit('updateCount', i++)
    }, 1000)*/
    // this.updateCountAsync({
    //   num: 5,
    //   time: 2000
    // })
    /*setInterval(() => {
      this.updateCount(i++)
    }, 1000)*/
  },
  metaInfo: {
    title: 'this\'s the new title'
  },
  components: {
    Header,
    Footer,
    Todo,
    Loading
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount']),
    notify () {
      this.$notify({
        content: 'test notify 1',
        btn: 'close'
      })
    }
  },
  computed: {
    ...mapState(['loading']),
    /*count () {
      return this.$store.state.count
    },*/
    ...mapGetters(['fullName'])
    /*fullName () {
      return this.$store.getters.fullName
    }*/
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
#loading{
  position fixed
  top 0
  right 0
  bottom 0 
  left 0
  background-color rgba(255,255,255,.3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
</style>
