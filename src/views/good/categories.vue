<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="grid-content bg-purple-light">
      <el-button type="success" plain @click="motaiShow">添加分类</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-tree-column
        file-icon="el-icon-notebook-2"
        folder-icon="el-icon-folder"
        prop="cat_name"
        label="分类名称"
        width="220"
        tree-key="cat_id"
        parent-key="cat_pid"
        :indent-size="50"
        level-key="cat_level"
      ></el-table-tree-column>
      <el-table-column label="是否有效" width="180">
        <template v-slot="{row}">{{row.cat_deleted ? '否':'是'}}</template>
      </el-table-column>
      <el-table-column prop="cat_level" label="层级"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="+total"
      :current-page="pagenum"
      :page-size="pagesize"
      @current-change="pagesizechange"
    ></el-pagination>
    <!-- 添加模态框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :prop="fromMain">
        <el-form-item label="分类名称" label-width="100px">
          <el-input autocomplete="off" v-model="fromMain.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级名称" label-width="100px">
          <el-cascader :options="options" v-model=" fromMain.catArr" :props="defaultProps"></el-cascader>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFun">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 5,
      total: "",
      dialogFormVisible: false,
      fromMain: {
        cat_name: "",
        catArr: []
      },
      options: [],
      defaultProps: {
        value: "cat_id",
        label: "cat_name",
        checkStrictly: true
      }
    };
  },
  methods: {
    async getList() {
      let res = await this.$http({
        url: "categories",
        params: {
          type: 3,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      console.log(res);

      this.tableData = res.data.data.result;
      this.total = res.data.data.total;
    },
    pagesizechange(value) {
      this.pagenum = value;
      this.getList();
    },
    async motaiShow() {
      let res = await this.$http({
        url: "categories",
        params: {
          type: 2
        }
      });
      console.log(res);
      this.options = res.data.data;
      this.dialogFormVisible = true;
    },
    async addFun() {
      let cat_level = this.fromMain.catArr.length;
      let cat_pid = this.fromMain.catArr.pop() || 0;
      let cat_name = this.fromMain.cat_name;
      let res = this.$http({
        url: "categories",
        method: "post",
        data: {
          cat_level,
          cat_pid,
          cat_name
        }
      });
      console.log(res);
      this.getList();
      this.dialogFormVisible = false;
    }
  },
  async created() {
    this.getList();
  }
};
</script>
<style>
.el-input__inner {
  margin-left: 10px;
}
</style>
