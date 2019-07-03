<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="{row}">
          <el-row v-for="level1 in row.children" class="level1" :key="level1.id" type="flex">
            <el-col :span="6">
              <el-tag closable @close="closeFun(row,level1.id)">{{level1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>

            <el-col>
              <el-row v-for="level2 in level1.children" type="flex" :key="level2.id">
                <el-col :span="6">
                  <el-tag
                    closable
                    type="success"
                    class="level2"
                    @close="closeFun(row,level2.id)"
                  >{{level2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col>
                  <el-tag
                    closable
                    v-for="level3 in level2.children"
                    :key="level3.id"
                    type="warning"
                    class="level3"
                    @close="closeFun(row,level3.id)"
                  >{{level3.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="描述" width="180"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template v-slot="{row}">
          <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
          <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            plain
            @click="modelFun(row)"
          >分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分类权限模态框 -->
    <el-dialog title="角色授权" :visible.sync="dialogFormVisible">
      <el-form>
        <el-tree
          :data="rightsList"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :default-checked-keys="checkedRights"
          :props="defaultProps"
          ref="rightsTree"
        ></el-tree>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="makeSureFun">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      checkedRights: [],
      rightsList: [],
      defaultProps: {
        children: "children",
        // 当前节点展示的文字的属性名
        label: "authName"
      },
      currentEditRoleId: -1
    };
  },
  methods: {
    async getList() {
      let res = await this.$http({
        url: "/roles"
      });
      console.log(res);

      this.tableData = res.data.data;
    },
    async closeFun(row, id) {
      let res = await this.$http({
        url: `roles/${row.id}/rights/${id}`,
        method: "delete"
      });
      if (res.data.meta.status == 200) {
        this.$message({
          type: "success",
          message: res.data.meta.msg,
          duration: 1000
        });
        this.getList();
      }
      console.log(res);
    },
    async modelFun(row) {
      this.currentEditRoleId = row.id;
      this.dialogFormVisible = true;
      let res = await this.$http({
        url: "rights/tree"
      });
      this.rightsList = res.data.data;
      console.log(res);
      let level1Ids = [];
      let level2Ids = [];
      let level3Ids = [];
      row.children.filter(level1 => {
        level1Ids.push(level1.id);
        level1.children.filter(level2 => {
          level2Ids.push(level2.id);
          level2.children.filter(level3 => {
            level3Ids.push(level3.id);
          });
        });
      });
      let result = [...level1Ids, ...level2Ids, ...level3Ids];
      this.checkedRights = result;
      console.log(result);
    },
    async makeSureFun() {
      let ids = [
        ...this.$refs.rightsTree.getCheckedKeys(),
        ...this.$refs.rightsTree.getHalfCheckedKeys()
      ].join();
      let res = await this.$http({
        url: `roles/${this.currentEditRoleId}/rights`,
        method: "post",
        data: {
          rids: ids
        }
      });
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
.level1 {
  padding: 20px 0;
  border-bottom: 1px dashed #cccccc;
}
.level1:last-child {
  border-bottom: none;
}
.level2 {
  margin-bottom: 20px;
}
.level3 {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
