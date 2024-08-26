<template>
  <el-menu
    ref="menu"
    class="layout-menu"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#1890ff"
    :collapse="collapse"
    :default-active="$route.name"
  >
    <router-link v-for="(menu, index) in menus" :key="index" :to="menu.path">
      <el-menu-item :index="menu.name">
        <i :class="`el-icon-${menu.meta.icon || 'menu'}`"></i>
        <span slot="title">{{ menu.meta.title }}</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
import routes from '@/router/routes';

export default {
  props: {
    collapse: Boolean
  },
  computed: {
    menus() {
      return routes[0].children || [];
    }
  },
}
</script>

<style>
.layout-menu {
  height: 100%;
  width: 100%;
}
</style>

