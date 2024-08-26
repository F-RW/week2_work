<template>
  <el-card shadow="never">
    <el-form inline :model="model" size="small">
      <el-form-item label="姓名">
        <el-input v-model="model.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="model.gender" placeholder="请选择性别">
          <el-option label="女性" value="famale"></el-option>
          <el-option label="男性" value="male"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">查询</el-button>
        <el-button plain @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    props: {
      value: {
        type: Object,
        default: () => {
          return {};
        }
      },
    },
    data: () => ({
      model: {}
    }),
    watch: {
      value: {
        handler(val) {
          if (val) {
            Object.keys(this.model).forEach(key => {
              this.model[key] = val[key];
            });
          } else {
            Object.keys(this.model).forEach(key => {
              this.model[key] = null;
            });
          }
        },
        immediate: true,
      },
      model: {
        handler(val) {
          this.$emit("input", val);
        },
        deep: true
      }
    },
    methods: {
      handleSubmit() {
        this.$emit('search', this.model);
      },
      handleReset() {
        Object.keys(this.model).forEach(key => {
          this.model[key] = null;
        });
      }
    }
  }
</script>
