<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column label="姓名" width="180"></el-table-column>
    <el-table-column label="邮箱" width="180"></el-table-column>
    <el-table-column label="电话"></el-table-column>
    <el-table-column label="用户状态"></el-table-column>
    <el-table-column label="操作"></el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: []
    };
  },
  created: function() {
    axios({
      url: "http://localhost:8888/api/private/v1/users",
      data: {
        query: 1,
        pagenum: 1,
        pagesize: 5
      }
    }).then(res => {
      console.log(res);
    });
  }
};
</script>