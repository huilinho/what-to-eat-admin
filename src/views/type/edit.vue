<template>
  <div class="app-container">
    <el-form ref="userForm" :model="data" :rules="formRules" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="种类名" prop="name">
            <el-input v-model="data.name" />
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
import { getInfoById, update, add } from '@/api/type'

export default {
  data() {
    return {
      data: {
        id: 0,
        name: ''
      },
      // 数据校验：判空、正则匹配。
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '种类名不能为空' }]
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
          const typeAction = this.data.id > 0 ? update : add
          typeAction(this.data).then(res => {
            this.$message.success('保存成功')
            this.$router.push({ path: '/type/list' })
          }).catch(err => {
            this.$message.error('保存失败:' + err)
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/type/list' })
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

