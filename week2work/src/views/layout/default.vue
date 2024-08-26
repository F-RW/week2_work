<template>
  <el-container class="layout-default">
    <el-aside class="layout-default__menu" :style="{ width: `${collapse ? 64 : 256}px` }">
      <layout-menu :collapse="collapse"></layout-menu>
    </el-aside>
    <el-container class="layout-default__main" :style="{ 'margin-left': `${collapse ? 64 : 256}px` }">
      <el-header>
        <layout-header @collapse-menu="collapse = !collapse" :collapse="collapse"></layout-header>
      </el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutMenu from './components/menu';
import LayoutHeader from './components/header';

export default {
  components: { LayoutMenu, LayoutHeader },
  data: () => ({
    collapse: false,
  }),
}
</script>

<style>
.layout-default .el-header {
  padding: 0;
}
.layout-default__menu {
  position: fixed;
  overflow-x: hidden;
  background-color: #001529;
  transition: width 300ms;
  overflow-x: hidden !important;
  height: 100vh;
}
.layout-default__main {
  transition: margin 300ms;
}
.layout-default__menu, .layout-default__menu .el-menu {
  border: 0 !important;
}
</style>

