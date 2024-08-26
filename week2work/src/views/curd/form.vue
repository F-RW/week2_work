<template>
  <el-form ref="form" :model="model" :rules="rules" size="small" label-width="100px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="model.name"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-select v-model="model.gender" placeholder="请选择性别">
        <el-option label="女性" value="famale"></el-option>
        <el-option label="男性" value="male"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input-number v-model="model.age"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="handleSubmit">确定</el-button>
      <el-button plain size="small" @click="handleCancel" style="margin-left: 8px">取消</el-button>
    </el-form-item>
  </el-form>
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
    model: {
      name: '',
      gender: null,
      age: 18,
    },
    rules: {
      name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
      age: [{ required: true, message: '请输入年龄', trigger: 'change' }],
    }
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
    // 点击确定提交表单的操作
    handleSubmit(name) {
      this.$refs.form.validate(valid => {
        if (valid) {
          const result = this.submitPure ? this.getPureModel() : JSON.parse(JSON.stringify(this.model));
          this.$emit("submit", result);
        }
      });
    },
    // 校验表单
    validate() {
      this.$refs.form.validate(valid => {
        this.$emit("validate", valid);
      });
    },
    // 重置表单
    reset() {
      Object.keys(this.model).forEach(key => {
        this.model[key] = undefined;
      });
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    // 点击取消的操作
    handleCancel() {
      this.$emit("cancel");
    }
  }
};
</script>
