<template>
  <div>
    <el-form :inline="true" :model="teacher" class="demo-form-inline">
      <el-form-item label="账号">
        <el-input v-model="teacher.username" maxlength="7" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="teacher.name" maxlength="4" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="teacher.sex" maxlength="4" placeholder="男或女"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--  //按钮-->
    <el-button plain type="danger" @click="deleteByIds">批量删除</el-button>
    <el-button plain type="primary" @click="handleCreate">新增</el-button>
    <el-button plain type="primary" @click="handleDownload">下载模板</el-button>
    <el-upload
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        action="/admin/upload/admin">
      <el-button plain type="primary">点击上传</el-button>
    </el-upload>
    <!--  //添加数据对话框-->
    <el-dialog
        :visible.sync="dialogVisible"
        title="新增管理员"
        width="30%">

      <el-form ref="addteacher" :model="addteacher" :rules="rules" label-width="100px">
        <el-form-item label="头像">
          <el-upload
              v-model="addteacher.profile"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
              action="/admin/admin/uploadProfile"
              class="avatar-uploader">

            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="addteacher.username" maxlength="7" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addteacher.name" maxlength="4" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addteacher.password" maxlength="10" style="width: auto" type="password"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="addteacher.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addteacher.phone" maxlength="11" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址">
          <el-input v-model="addteacher.address" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addTeacher('addteacher')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--  //更新数据对话框-->
    <el-dialog
        :visible.sync="dialogUpdateVisible"
        title="更新管理员"
        width="30%">

      <el-form ref="addteacher" :model="addteacher" :rules="rules" label-width="100px">
        <el-form-item label="头像">
          <el-upload
              v-model="addteacher.profile"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
              action="/admin/admin/uploadProfile"
              class="avatar-uploader">

            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="addteacher.username" maxlength="7" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addteacher.name" maxlength="4" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addteacher.password" maxlength="10" style="width: auto" type="password"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="addteacher.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addteacher.phone" maxlength="11" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址">
          <el-input v-model="addteacher.address" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateTeacher('addteacher')">提交</el-button>
          <el-button @click="dialogUpdateVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--  //表格-->
    <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">

      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          align="center"
          fixed
          label="账号"
          prop="username"
      >
      </el-table-column>
      <el-table-column
          align="center"
          label="头像"
          prop="profile"
      >
        <template slot-scope="scope">
          <img :src="scope.row.profile" height="55" width="55"/></template>
      </el-table-column>
      <el-table-column
          align="center"
          label="姓名"
          prop="name"
      >
      </el-table-column>
      <el-table-column
          align="center"
          label="性别"
          prop="sex"
      >
      </el-table-column>
      <el-table-column
          align="center"
          label="手机"
          prop="phone"
      >
      </el-table-column>
      <el-table-column
          align="center"
          label="地址"
          prop="address"
          width="250">
      </el-table-column>
      <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row)">修改</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--//分页工具条-->
    <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "AdminInformationManage",
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("手机号不能为空"));
      } else if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
        return callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('姓名不能为空'))
      } else {
        callback()
      }
    };

    var validateSex = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('姓别不能为空'))
      } else {
        callback()
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    };

    return {
      loading: true,
      rules: {
        username: [{validator: validateUsername, trigger: 'blur'}],
        name: [{validator: validateName, trigger: 'blur'}],
        sex: [{validator: validateSex, trigger: 'blur'}],
        phone: [{validator: validatePhone, trigger: 'blur'}],
        password: [{validator: validatePassword, trigger: 'blur'}],
      },
      //被选中复选框的数组
      selectedIds: [],
      //总记录数
      totalCount: 0,
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,
      //添加数据对话框是否展示标记
      dialogVisible: false,
      //更新数据对话框是否展示标记
      dialogUpdateVisible: false,
      //学生模型数据
      teacher: {
        username: '',
        name: '',
        sex: '',
      },
      addteacher: {
        username: '',
        name: '',
        password: '',
        sex: '',
        phone: '',
        address: '',
        profile: '',
        oldusername: '',
      },
      //复选框选中数据集合
      multipleSelection: [],
      //表格数据
      tableData: [{
        username: '',
        name: '',
        sex: '',
        phone: '',
        address: '',
        profile: '',
      }
      ]
    }
  },
  mounted() {

    this.selectAll();
  },
  methods: {
    handleSuccess(res) {
      if (res.code == 201) {
        this.$message.success("新增成功");
        this.selectAll();
      } else if (res.code == 400) {
        this.$message.error("新增失败");
      } else {
        this.$message.error(res.msg);
      }

    },

    handleExceed() {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    handleDownload() {
      location.href = "http://localhost/admin/download/admin"
    },
    //更新老师数据
    updateTeacher(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认更新?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios({
              method: "put",
              url: "/admin/admin",
              data: this.addteacher,
            }).then(resp => {
              if (resp.data.code == 201) {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });

                //关闭弹窗
                this.dialogUpdateVisible = false;

                //重新查询
                this.selectAll();

              } else if (resp.data.code == 400) {
                this.$message.error('更新失败');
              } else {
                this.$message.error(resp.data.msg);
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消更新'
            });
          });
        } else {
          this.$message({
            message: '请检查格式',
            type: 'warning'
          });
        }
      });
    },
    //弹出编辑窗口
    handleClick(row) {
      this.axios({
        method: "get",
        url: "/admin/admin/selectByUsername/" + row.username,
      }).then(resp => {
        if (resp.data.code == 200 && resp.data.data != null) {
          this.dialogUpdateVisible = true;
          this.addteacher = resp.data.data;
          //若改用户名 将原用户名保存到oldusername中,sql where使用这个username
          this.addteacher.oldusername = resp.data.data.username;
          this.imageUrl = this.addteacher.profile;
        } else if (resp.data.code == 404) {
          this.$message.error("数据同步失败,自动刷新");
        } else {
          this.$message.error(resp.data.msg);
        }
      }).finally(() => {
        //重新加载数据
        this.selectAll()
      });
    },
    //删除老师
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: "delete",
          url: "/admin/admin/" + row.username,
        }).then(resp => {
          if (resp.data.code == 201) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            //重新查询
            this.selectAll();
          } else if (resp.data.code == 400) {
            this.$message.error("数据同步失败,自动刷新");
          } else {
            this.$message.error(resp.data.msg);
          }
        }).finally(() => {
          this.selectAll()
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },

    //重置表单
    resetForm() {
      this.addteacher = {
        username: '',
        name: '',
        sex: '',
        phone: '',
        address: '',
        profile: '',
        oldusername: '',
      };
    },
    //点击新增按钮
    handleCreate() {
      this.dialogVisible = true;
      this.resetForm();
      this.imageUrl = '';
    },
    //查询分页
    selectAll() {
      this.loading = true;
      this.axios({
        method: "post",
        url: "/admin/admin/selectByPageAndCondition/" + this.currentPage + "/" + this.pageSize,
        data: this.teacher
      }).then(resp => {
        if (resp.data.code == 200) {
          this.tableData = resp.data.data.rows;
          this.totalCount = resp.data.data.totalCount;
        } else if (resp.data.code == 404) {
          this.$message.error("查询失败");
        } else {
          this.$message.error(resp.data.msg);
        }
        this.loading = false;
      })
    },
    //头像上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code == 201) {

        this.addteacher.profile = res.data;
      } else {
        this.$message.error(res.data.msg);
      }

    },
    handleAvatarError() {
      this.$message.error('连接超时');
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.selectAll();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.selectAll();
    },
    //批量删除
    deleteByIds() {
      //弹出确定提示框
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          let multipleSelectionElement = this.multipleSelection[i];
          this.selectedIds[i] = multipleSelectionElement.username;
        }
        this.axios({
          method: "delete",
          url: "/admin/admin/deleteAdmins",
          data: this.selectedIds
        }).then(resp => {
          if (resp.data.code == 201) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            //重新查询
            this.selectAll();
          } else if (resp.data.code == 404) {
            this.$message.error("删除失败");
          } else {
            this.$message.error(resp.data.msg);
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //复选框选中执行方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //查询方法
    onSubmit() {
      this.selectAll();
    },
    addTeacher(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认添加?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios({
              method: "post",
              url: "/admin/admin",
              data: this.addteacher,
            }).then(resp => {
              if (resp.data.code == 201) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });

                //关闭弹窗
                this.dialogVisible = false;

                //重新查询
                this.selectAll();

              } else if (resp.data.code == 400) {
                this.$message.error('添加失败');
              } else {
                this.$message.error(resp.data.msg);
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消添加'
            });
          });
        } else {
          this.$message({
            message: '请检查格式',
            type: 'warning'
          });
        }
      });
    }
  }
}
</script>

<style scoped>

</style>