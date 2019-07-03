<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="authName" label="权限" width="180"></el-table-column>
        <el-table-column prop="path" label="路径" width="180"></el-table-column>
        <el-table-column prop="address" label="层级">
          <template v-slot="{row}">
            <span>{{row.level | num}}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-breadcrumb>
</template>
  <script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  filters: {
    num(value) {
      if (value === "0") {
        return "一级";
      } else if (value === "1") {
        return "二级";
      } else {
        return "三级";
      }
    }
  },
  async created() {
    let res = await this.$http({
      url: "rights/list"
    });
    console.log(res);
    this.tableData = res.data.data;
  }
};
</script>