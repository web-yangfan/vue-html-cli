<template>
    <div class="wrap">
      <my-header active="index"></my-header>
      <div class="content-warp">
        <h1>我是首页</h1>
        <img src="../../img/logo.png" alt="">
      </div>
      
      <p>
        <img src="../../img/index/1.jpg" alt="">
      </p>
      <div class="item2">1</div>
      <div class="item3">2</div>
      <div class="item4">3</div>
      <div class="item5">4</div>
      <my-footer></my-footer>
</div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
      };
    },
    mounted() {},
    methods: {},
  };
</script>

<style scoped lang="scss">
  .content-warp {
    text-align: center;
  }
  h1 {
    color: #42b983;
  }
  img {
    width: 150px;
    height: 150px;
    display: inline-block;
  }
</style>

