<template>
    <div>
        <h1>首页</h1>
        <h2>内容</h2>
        <h3>列表</h3>
        <img src="../../img/2.jpg" alt="">
    </div>
</template>

<script>
  require('../../css/index/module-1.scss')
  import '../../css/index/module-2.css'
  export default {
    name: 'home',
    data() {
      return {};
    },
    mounted() {},
    methods: {},
  };
</script>

<style scoped lang="scss">
    h1 {
        color: red;
    }
    div {
        img {
            width: 100px;
            height: 100px;
            border: 1px solid red;
        }
        h2 {
            color: aqua;
        }
    }
</style>

