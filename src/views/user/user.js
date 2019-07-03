import axios from 'axios'

export default {
  data() {
    return {
      tableData: [],
      addfenlei: false,
      assainRoleData: {
        username: '',
        rid: ''
      },
      roleList: [],
      total: 0,
      pagesize: 3,
      pagenum: 1,
      currentpage: 1,
      keyword: '',
      dialogFormVisible: false,
      mixSure: false,
      addUserFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式不正确',
            trigger: 'change'
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号码格式不正确',
            trigger: 'change'
          }
        ]
      },
      editUserFormData: {
        id: 0,
        username: '',
        email: '',
        mobile: ''
      },
      editUserRules: {
        email: [
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式不正确',
            trigger: 'change'
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号码格式不正确',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created: function() {
    this.getUserList()
  },
  methods: {
    getUserList: function() {
      let res = axios({
        url: 'http://localhost:8888/api/private/v1/users',
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.keyword
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)

        this.tableData = res.data.data.users
        this.total = res.data.data.total
      })
    },
    onPageChange: function(page) {
      this.pagenum = page
      this.getUserList()
    },
    async changeFun(id, type) {
      let res = await axios({
        url: `http://localhost:8888/api/private/v1/users/${id}/state/${type}`,
        method: 'put',
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(res)
      if (res.data.meta.status) {
        this.$message({
          message: 'res.data.meta.msg',
          type: 'success',
          duration: 1000
        })
        this.getUserList()
      }
    },
    async deleteFun(id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let res = await this.$http({
          url: `/users/${id}`,
          method: 'delete'
        })
        if (res.data.meta.status === 200) {
          this.$message({
            message: res.data.meta.msg,
            type: 'success',
            duration: 1000
          })
          this.getUserList()
        }
      } catch (err) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    addFun() {
      this.dialogFormVisible = true
    },
    async addClassFun() {
      await this.$refs.addUserForm.validate()
      let res = await axios({
        url: 'http://localhost:8888/api/private/v1/users',
        method: 'post',
        data: this.addUserFormData,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(res)
      if (res.data.meta.status == 201) {
        this.$message({
          message: res.data.meta.msg,
          type: 'success',
          duration: 1000
        })
        this.getUserList()
        this.dialogFormVisible = false
      } else {
        this.$message({
          message: res.data.meta.msg,
          type: 'error',
          duration: 1000
        })
      }
    },
    search() {
      console.log('aa')
      this.getUserList()
    },
    async mixFun(id) {
      console.log(id)
      this.mixSure = true
      let res = await axios({
        url: `http://localhost:8888/api/private/v1/users/${id}`,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      // console.log(res);
      this.editUserFormData = res.data.data
    },
    async editUser() {
      try {
        await this.$refs.editUserForm.validate()
        // 向后台提交请求，修改用户数据

        let res = await axios({
          url: `http://localhost:8888/api/private/v1/users/${
            this.editUserFormData.id
          }`,
          method: 'put',
          data: {
            mobile: this.editUserFormData.mobile,
            email: this.editUserFormData.email
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        if (res.data.meta.status == 200) {
          // 提示用户更新成功
          this.$message({
            type: 'success',
            message: res.data.meta.msg,
            duration: 1000
          })
          // 刷新列表
          this.getUserList()
          // 关闭模态框
          this.isEditUserDialogShow = false
        } else {
          this.$message({
            type: 'error',
            message: res.data.meta.msg,
            duration: 1000
          })
        }
      } catch (error) {}

      console.log(res)
    },
    async fenleiFun(row) {
      this.addfenlei = true
      console.log(row)
      this.assainRoleData.username = row.username
      console.log(this.assainRoleData.username)
      let roleResult = await this.$http({
        url: 'roles'
      })

      console.log(roleResult.data.data)
      this.roleList = roleResult.data.data
    },
    makefenleiSureFun() {
      this.addfenlei = false
    }
  }
}
