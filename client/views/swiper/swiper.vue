<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(banner, index) in banners" :key="index">
        <img :src="banner">
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        banners: [ 'http://iph.href.lu/500x500', 'http://iph.href.lu/500x500', 'http://iph.href.lu/500x500' ],
        swiperOption: {
          autoplay: 5000,
          initialSlide: 1,
          loop: true,
          pagination: '.swiper-pagination',
          onSlideChangeEnd: swiper => {
            console.log('onSlideChangeEnd', swiper.realIndex)
          }
        }
      }
    },
    mounted () {
      console.log('app init')
      // setTimeout(() => {
      //   this.banners.push('/5.jpg')
      //   console.log('banners update')
      // }, 3000)
      console.log(
        'This is current swiper instance object', this.mySwiper,
        'It will slideTo banners 3')
      this.mySwiper.slideTo(3)
    }
  }
</script>

<style lang="scss" scoped>
  .my-swiper {
    height: 300px;
    width: 100%;
    .swiper-slide {
      text-align: center;
      font-size: 38px;
      font-weight: 700;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .swiper-pagination {
      > .swiper-pagination-bullet {
        background-color: red;
      }
    }
  }
</style>