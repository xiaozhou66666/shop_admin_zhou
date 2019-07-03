<template>
  <el-container>
    <el-header>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <img src="../assets/main.png" alt />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <h1>电商后台管理系统</h1>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple right">
            欢迎上海前端31期星曜会员
            <a href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-col>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
            :collapse-transition="true"
            :router="true"
          >
            <el-submenu v-for="item in getList" :key="item.id" :index="item.id + ''">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group v-for="item1 in item.children" :key="item1.id">
                <el-menu-item :index=" '/' +item1.path" class="el-icon-menu">
                  <span>{{item1.authName}}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<style>
.el-container .el-header {
  background-color: #b3c1cd;
  padding: 0;
  margin: 0;
  padding-right: 20px;
}
.grid-content h1 {
  padding: 0;
  margin: 0;
  color: #ffffff;
  line-height: 60px;
  text-align: center;
  font-size: 28px;
}
.right {
  line-height: 60px;
  font-weight: 700;
  text-align: right;
}
.right a {
  color: orange;
}
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
}
.el-aside span {
  padding-left: 10px;
}
.el-aside div {
  height: 100%;
}
.el-aside div ul {
  height: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      getList: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  async created() {
    let res = await this.$http({
      url: "menus"
    });
    console.log(res);
    this.getList = res.data.data;
  }
};
</script>