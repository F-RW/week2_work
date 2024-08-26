<template>
  <div class="page-curd">
    <curd-search @search="handleSearch"></curd-search>
    <div class="page-curd__action-bar">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="handleNew">新增</el-button>
      <el-button icon="el-icon-delete" size="small" :disabled="tableSelection && tableSelection.length <= 0" @click="handleDeleteMul">批量删除</el-button>
    </div>
    <el-table size="mini" :data="tableData" class="page-curd__table" border @selection-change="handleTableSelectionChange">
      <el-table-column type="selection" min-width="35"></el-table-column>
      <el-table-column label="姓名" prop="name" min-width="100">
        <template slot-scope="{ row }">
          <span><i class="el-icon-user-solid"></i>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="gender">
        <template slot-scope="{ row }">
          <el-tag v-if="row.gender === 'male'" size="small">男性 ♂</el-tag>
          <el-tag v-else type="danger" size="small">女性 ♀</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="操作" min-width="140" fixed="right">
        <template slot-scope="slotScope">
          <el-button class="eagle-scheme__table-btn" type="text" icon="el-icon-view" title="详情" @click="handleView(slotScope)"></el-button>
          <el-button class="eagle-scheme__table-btn" type="text" icon="el-icon-edit" title="编辑" @click="handleEdit(slotScope)"></el-button>
          <el-button type="text" icon="el-icon-delete" title="删除" @click="handleDelete(slotScope)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-curd__pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    >
    </el-pagination>
    <el-dialog :visible.sync="dialogVisible" :title="title" width="450px" :close-on-click-modal="dialogMode === 'view'" append-to-body>
      <template v-if="dialogMode === 'view'">
        <el-row :gutter="20">
          <el-col :span="12">姓名：{{ formModel.name }}</el-col>
          <el-col :span="12">
            性别：
            <template v-if="formModel.gender">
              <el-tag v-if="formModel.gender === 'male'" size="small">男性 ♂</el-tag>
              <el-tag v-else type="danger" size="small">女性 ♀</el-tag>
            </template>
          </el-col>
          <el-col :span="12" style="margin-top: 20px;">年龄：{{ formModel.age }}</el-col>
        </el-row>
      </template>
      <template v-else>
        <curd-form ref="curdForm" v-model="formModel" @submit="handleSubmit" @cancel="handleCancel"></curd-form>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import CurdSearch from './search';
import CurdForm from './form';

export default {
  components: { CurdSearch, CurdForm },
  data: () => ({
    dialogMode: 'new',
    dialogVisible: false,
    tableData: [],
    currentPage: 1,
    pageSize: 10,
    total: 3,
    tableSelection: [],
    formModel: {},
    currentRow: {},
  }),
  computed: {
    title() {
      if (this.dialogMode === 'view') {
        return '查看';
      }
      return this.dialogMode === 'edit' ? '编辑' : '新增';
    }
  },
  created() {
    this.handleSearch();
  },
  methods: {
    async handleSearch(value, needReset) {
      if (needReset) {
        this.currentPage = 1;
      }
      const params = {
        ...value,
        page: this.currentPage,
        size: this.pageSize,
      };
      this.$request.get('/user/page', { params }).then(response => {
        const { result: { list, total } = {} } = response;
        this.tableData = list;
        this.total = total;
      });
    },
    handleNew() {
      if (this.$refs['curdForm']) { this.$refs['curdForm'].reset(); }
      this.dialogMode = 'new';
      this.dialogVisible = true;
      this.formModel = {};
    },
    handleView({ row }) {
      this.dialogMode = 'view';
      this.dialogVisible = true;
      this.formModel = { ...row };
    },
    handleEdit({ row }) {
      if (this.$refs['curdForm']) { this.$refs['curdForm'].reset(); }
      this.dialogMode = 'edit';
      this.$request.get('/user/get', { params: { id: row.id } }).then(response => {
        const { result } = response;
        this.formModel = result;
        this.currentRow = result;
        this.dialogVisible = true;
      });
    },
    handleDelete({ row }) {
      this.$request.post('/user/delete', [row.id]).then(response => {
        const { success } = response;
        if (success) {
          this.$message.success('删除成功');
          this.handleSearch();
        }
      });
    },
    handleDeleteMul() {
      const ids = this.tableSelection.map(selection => selection.id);
      this.$request.post('/user/delete', ids).then(response => {
        const { success } = response;
        if (success) {
          this.$message.success('删除成功');
          this.handleSearch();
        }
      });
    },
    handleSubmit() {
      if (this.dialogMode === 'new') {
        this.$request.post('/user/add', { ...this.formModel, id: undefined }).then(response => {
          const { success } = response;
          if (success) {
            this.$message.success('新增成功');
            this.handleSearch();
            this.dialogVisible = false;
          }
        });
      } else if (this.dialogMode === 'edit') {
        this.$request.post('/user/update', { ...this.formModel, id: this.currentRow.id }).then(response => {
          const { success } = response;
          if (success) {
            this.$message.success('编辑成功');
            this.handleSearch();
            this.dialogVisible = false;
          }
        });
      }
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleTableSelectionChange(selection) {
      this.tableSelection = selection;
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handleSearch();
    },
  }
}
</script>

<style>
.page-curd__action-bar {
  margin: 20px 0px;
}
.page-curd__table {
  margin-bottom: 20px;
}
.page-curd .el-icon-user-solid {
  padding-right: 10px;
}
.page-curd__pagination {
  text-align: right;
}
</style>
