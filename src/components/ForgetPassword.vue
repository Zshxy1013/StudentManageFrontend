<template>
  <div id="app" style="width: 50%;margin: auto">

    <el-card shadow="always">
      <div slot="header" style="text-align: center">
        <h2>忘记密码</h2>
      </div>

      <el-form ref="formLabelAlign" :label-position="labelPosition" :model="formLabelAlign" :rules="rules"
               label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="formLabelAlign.username" maxlength="7"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formLabelAlign.phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="formLabelAlign.code" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="formLabelAlign.password" maxlength="10" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="formLabelAlign.checkPass" maxlength="10" type="password"></el-input>
        </el-form-item>

        <br>
        <br>

        <div class="box">
          <el-button icon="el-icon-back" round type="primary" @click="back">返回</el-button>
          <el-button icon="el-icon-key" round type="primary" @click="forget('formLabelAlign')">确定</el-button>
          <el-button icon="el-icon-phone" round type="primary" @click="sendcode">发送验证码</el-button>
        </div>
      </el-form>
    </el-card>


  </div>
</template>

<script>
export default {
  name: "FogetPassword",

  methods: {
    back() {
      this.$router.push('/')
    },
    sendcode() {
      this.axios({
        method: "post",
        url: "/sms/sendcode",
        data: this.formLabelAlign,
      }).then(resp => {
        if (resp.data.code == 201) {
          this.$message({
            message: '验证码发送成功',
            type: 'success'
          });
        } else if (resp.data.code == 400) {
          this.$message({
            message: '验证码发送失败',
            type: 'warning'
          });
        } else {
          this.$message.error(resp.data.msg);
        }
      })
    },
    forget(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: "post",
            url: "/sms/checkcode",
            data: this.formLabelAlign,
          }).then(resp => {
            if (resp.data.code == 200) {
              this.$message({
                message: resp.data.msg,
                type: 'success'
              });
            } else if (resp.data.code == 404) {
              this.$message({
                message: resp.data.msg,
                type: 'warning'
              });
            } else {
              this.$message.error(resp.data.msg);
            }
          })
        } else {
          this.$message({
            message: '请检查格式',
            type: 'warning'
          });
        }
      });
    }
  },
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        callback()
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    };
    var validatePassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    };
    var validateCheckPassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formLabelAlign.password) {

        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };


    return {
      labelPosition: 'right',
      formLabelAlign: {
        username: '',
        phone: '',
        code: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [{validator: validateAccount, trigger: 'blur'}],
        phone: [{validator: validatePass, trigger: 'blur'}],
        code: [{validator: validatePass1, trigger: 'blur'}],
        password: [{validator: validatePassWord, trigger: 'blur'}],
        checkPass: [{validator: validateCheckPassWord, trigger: 'blur'}],
      }
    }
  }
}
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
}

html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  height: 95%;
}
</style>