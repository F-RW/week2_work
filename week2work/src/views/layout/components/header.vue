<template>
  <div class="layout-header">
    <i class="icon-collapse" :class="`el-icon-s-${collapse ? 'unfold' : 'fold'}`" @click="collapseMenu"></i>
    <div v-if="$route.name === 'index'" class="el-page-header">
      <div class="el-page-header__content">首页</div>
    </div>
    <el-page-header v-else @back="goBack" :content="content"></el-page-header>
  </div>
</template>

<script>
export default {
  props: {
    collapse: {
      type: Boolean,
    }
  },
  data: () => ({
    content: ''
  }),
  watch: {
    $route: {
      handler(to) {
        this.content = to.meta.title;
      },
      immediate: true
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    collapseMenu() {
      this.$emit('collapse-menu');
    }
  },
}
</script>

<style>
.layout-header {
  position: relative;
  height: 100%;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
  align-items: center;
}
.layout-header .icon-collapse {
  cursor: pointer;
  font-size: 20px;
  padding-right: 20px;
}
</style>
