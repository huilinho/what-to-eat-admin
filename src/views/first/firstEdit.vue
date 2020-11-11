<template>
  <div class="app-container">
    <el-form ref="userForm" :model="data" :rules="formRules" label-width="120px">

      <el-row>
        <el-col :span="6">
          <el-form-item label="饭堂">
            <el-select v-model="data.canteen" placeholder="请选择饭堂">
              <el-option v-for="canteen in CanteenList" :label="canteen.label" :value="canteen.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="楼层" prop="floor">
            <el-select v-model="data.floor" placeholder="选择楼层">
              <el-option v-for="floor in FloorList" :label="floor.label" :value="floor.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="窗口名" prop="name">
            <el-input v-model="data.name" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="图片" prop="url">
        <el-upload
          action="http://localhost:8527/admapi/upload"
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
import { getInfoById, update, add } from '@/api/window'
import { getToken } from '../../utils/auth';

export default {
  data() {
    return {
      data: {
        id: 0,
        name: '',
        url: '',
        canteen: '',
        floor: ''
      },
      headers: { 'authToken': getToken() },
      FloorList: [
        { value: 1, label: '一楼' },
        { value: 2, label: '二楼' }
      ],
      CanteenList: [
        { value: 1, label: '一饭' },
        { value: 2, label: '二饭' },
        { value: 3, label: '三饭' },
        { value: 4, label: '四饭' }
      ],
      // 数据校验：判空、正则匹配。
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '窗口名不能为空' }]
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
            this.$router.push({ path: '/firstCanteen/list' })
          }).catch(err => {
            this.$message.error('保存失败:' + err)
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/firstCanteen/list' })
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
      this.data.url = data.url
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

