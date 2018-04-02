<template>
  <header :class="$style.mainHeader">
    <h1>JTodo</h1>
  </header>
</template>

<script>
/*  export default {
      computed: {
          $style() {
              return {
                  mainHeader: '[path]-[name]-[hash:base64:5]'    //生成一个这种形式的class命名
              }
          }
      }
  } */
</script>

<style lang="stylus" module>
.main-header{
  text-align center
  h1{
    font-size 100px
    color: rgba(175, 47, 47, 0.4)
    font-weight 100
    margin 20px
  }
}
</style>

