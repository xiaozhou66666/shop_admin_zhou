<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="grid-content bg-purple-light">
      <el-button type="success" plain @click="$router.push('./good-add')">添加商品</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="180"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>4
      <el-table-column label="操作">
        <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
        <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pagesize"
      :current-page="pagenum"
      :total="+total"
      @current-change="pagemake"
    ></el-pagination>
  </div>
</template>
<style>
.el-breadcrumb {
  margin-bottom: 10px;
}
</style>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 5,
      total: ""
    };
  },
  methods: {
    async getList() {
      let res = await this.$http({
        url: "goods",
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      this.tableData = res.data.data.goods;
      this.total = res.data.data.total;
    },
    pagemake(value) {
      this.pagenum = value;
      this.getList();
    }
  },
  async created() {
    this.getList();
  }
};
</script>