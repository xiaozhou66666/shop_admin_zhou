<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="第一步" description="基本信息"></el-step>
      <el-step title="第二步" description="商品图片"></el-step>
      <el-step title="第三步" description="商品内容"></el-step>
    </el-steps>
    <el-tabs
      tab-position="left"
      style=" margin-top: 20px;"
      @tab-click="tabClick"
      v-model="activeName"
    >
      <el-tab-pane label="基本信息" name="basic">
        <el-form ref="form" :model="addForm" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="addForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="addForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="addForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="addForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <div class="block">
              <el-cascader
                :options="options"
                v-model="addForm.goods_cat"
                :props=" defaultProps"
                clearable
              ></el-cascader>
            </div>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio v-model=" addForm.is_promote" label="1">是</el-radio>
            <el-radio v-model=" addForm.is_promote" label="0">否</el-radio>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="next(1)">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="pic">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          list-type="picture-card"
          :headers="headers"
          :on-success="onFileUploadSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button type="primary" @click="next(2)">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="角色内容" name="contant" style="height:300px;">
        <quill-editor v-model="addForm.goods_introduce"></quill-editor>
        <el-button type="primary" @click="addGood">确定</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      headers: {
        Authorization: localStorage.getItem("token")
      },
      active: 0,
      activeName: "",
      addForm: {
        goods_name: "",
        goods_cat: [],
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: "",
        pics: [],
        is_promote: 0,
        goods_introduce: ""
      },
      options: [],
      defaultProps: {
        value: "cat_id",
        label: "cat_name"
      }
    };
  },
  methods: {
    async addGood() {
      let newGood = {
        goods_name: this.addForm.goods_name,
        goods_cat: this.addForm.goods_cat.join(),
        goods_price: this.addForm.goods_price,
        goods_number: this.addForm.goods_number,
        goods_weight: this.addForm.goods_weight,
        goods_introduce: this.addForm.goods_introduce,
        pics: this.addForm.pics,
        is_promote: this.addForm.is_promote
      };
      let res = await this.$http({
        url: "goods",
        method: "post",
        data: newGood
      });
      if (res.data.meta.status == 201) {
        this.$router.push("/goods");
      }
    },
    onFileUploadSuccess(res) {
      this.addForm.pics.push({ pic: res.data.tmp_path });
    },
    next(value) {
      this.active = value;
      if (value === 1) {
        this.activeName = "pic";
      } else {
        this.activeName = "contant";
      }
    },
    tabClick(tab) {
      this.active = +tab.index;
    }
  },
  async created() {
    let res = await this.$http({
      url: "categories",
      params: {
        type: 3
      }
    });
    console.log(res);
    this.options = res.data.data;
  }
};
</script>