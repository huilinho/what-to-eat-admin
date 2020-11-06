<template>
  <div class="app-container">
    <el-form ref="userForm" :model="data" :rules="formRules" label-width="120px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="账号" prop="username">
            <el-input v-model="data.username"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item label="密码" prop="password">
            <el-input v-model="data.password"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="data.nickname"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item label="备注" prop="motto">
            <el-input v-model="data.motto"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item label="等级" prop="rank">
            <el-select v-model="data.rank" placeholder="选择等级">
              <el-option v-for="rank in rankList" :label="rank.label" :value="rank.value"/>
            </el-select>
            <!--        或者-->
            <!--        <el-select v-model="data.rank" placeholder="用户角色">-->
            <!--          <el-option  label="管理员" value="1"/>-->
            <!--          <el-option  label="用户" value="2"/>-->
            <!--        </el-select>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getInfoById, update, add } from '@/api/user'

  export default {
    data() {
      // 数据校验
      const validateAccount = (rule, value, callback) => {
        const regex = /^[A-Za-z0-9]{4,20}$/g
        if (value === '') {
          callback(new Error('请输入账号'))
        } else {
          if (!regex.test(value)) {
            callback(new Error('账号只能由字母、数字构成,最少4位最高20位！'))
          }
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        const regex = /^[A-Za-z0-9$@#%^&]{6,20}$/g
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (!regex.test(value)) {
            callback(new Error('密码只能由字母、数字、$、@、#、%、^、&构成,最少6位最高20位！'))
          }
          callback()
        }
      }

      return {
        data: {
          id: 0,
          username: '',
          nickname: '',
          password: '',
          motto: '',
          createTime: 0
        },
        //数据校验：判空、正则匹配。
        formRules: {
          username: [{ validator: validateAccount, trigger: 'blur' }],
          nickname: [{ required: true, trigger: 'blur', message: '昵称不能为空' }],
          password: [{ validator: validatePassword, trigger: 'blur' }]
        },
        rankList: [
          { value: 1, label: '普通' },
          { value: 9, label: '管理员' }
        ]
      }
    },
    mounted() {
      const params = this.$route.params
      this.data.id = params.id
      this.loadInfo()
    },
    methods: {
      loadInfo() {
        if (this.data.id > 0) {
          getInfoById(this.data.id).then(res => {
            this.data = res.data
          }).catch(err => {
            this.$message.error('获取管理员信息失败:' + err)
          })
        }
      },
      onSubmit() {
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            let userAction = this.data.id > 0 ? update : add
            userAction(this.data).then(res => {
              this.$message.success('保存成功')
              this.$router.push({ path: '/user/list' })
            }).catch(err => {
              this.$message.error('保存失败:' + err)
            })
          } else {
            return false
          }
        })
      },
      onCancel() {
        this.$router.push({ path: '/user/list' })
      }
    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

