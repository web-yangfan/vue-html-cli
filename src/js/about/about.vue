<template>
    <div class="wrap">
        <my-header active="about"></my-header>
        <div class="content-warp">
            <h1>关于我们</h1>
            <img src="../../img/logo.png" alt="">
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
  export default {
    name: 'about',
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

