<template>
  <div class="app-container">
    <el-form ref="userForm" :model="data" :rules="formRules" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="data.mobile" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="data.username" />
          </el-form-item>
        </el-col>
      </el-row>
      <div v-show="this.data.id>0?false:true">
      <el-row>
        <el-col :span="8">
          <el-form-item label="密码" prop="password">
            <el-input v-model="data.password" />
          </el-form-item>
        </el-col>
      </el-row>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="data.nickname" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="图片" prop="avatar">
        <el-upload
          action="/admapi/upload"
          list-type="picture-card"
          :headers="headers"
          :on-preview="picturePreview"
          :on-remove="pictureRemove"
          :on-success="pictureSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="pictureVisible">
          <img width="100%" :src="dialogPicture" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfoById, update, add } from '@/api/admin'
import { getToken } from '../../utils/auth'

export default {
  data() {
    // 数据校验
    const validateMobile = (rule, value, callback) => {
      const regex = /^\d{11}$/g
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        if (!regex.test(value)) {
          callback(new Error('请输入11号手机号码！'))
        }
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }

    return {
      data: {
        id: 0,
        username: '',
        nickname: '',
        password: '',
        avatar: ''
      },
      pictureVisible: false,
      dialogPicture: '',
      headers: { 'authToken': getToken() },
      // 数据校验：判空、正则匹配。
      formRules: {
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile, message: '手机号不能为空' }],
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        nickname: [{ required: true, trigger: 'blur', message: '昵称不能为空' }],
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }]
      }
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
          const adminAction = this.data.id > 0 ? update : add
          adminAction(this.data).then(res => {
            this.$message.success('保存成功')
            this.$router.push({ path: '/admin/list' })
          }).catch(err => {
            this.$message.error('保存失败:' + err)
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/admin/list' })
    },
    picturePreview(file) {
      console.log(file.url)
      this.dialogPicture = file.url
      this.pictureVisible = true
    },
    pictureRemove(file) {
      console.log(file)
    },
    pictureSuccess(response) {
      const data = response.data
      this.data.avatar = data.url
      console.log(123)
      console.log(this.data.avatar)
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

