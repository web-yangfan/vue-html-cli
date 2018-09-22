<template>
  <div class="header">
    <img src="../../img/logo.png" class="logo">
    <nav>
      <a href="./" :class="{active: active == 'index'}">首页</a>
      <a href="about.html" :class="{active: active == 'about'}">关于我们</a>
    </nav>
  </div>
</template>

<script>
  export default {
    props: ['active'],
    name: 'my-header',
    data() {
      return {};
    },
    mounted() {},
    methods: {},
  };
</script>

<style scoped lang="scss">

</style>
