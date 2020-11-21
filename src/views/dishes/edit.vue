<template>
  <div class="app-container">
    <el-form ref="userForm" :model="data" :rules="formRules" label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="菜式名称" prop="name">
            <el-input v-model="data.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row />
      <el-row>
        <el-form-item label="窗口" prop="windowId">
          <el-select v-model="data.windowId" placeholder="请选择窗口">
            <el-option v-for="(window, i) in windowList" :key="i" :label="window.name" :value="window.windowId" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="种类" prop="typeId">
          <el-select v-model="data.typeId" placeholder="请选择种类">
            <el-option v-for="(type, i) in typeList" :key="i" :label="type.name" :value="type.typeId" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-form-item label="图片" prop="cover">
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
import { getInfoById, update, add } from '@/api/dishes'
import { getToken } from '../../utils/auth'
import { getTypeList } from '../../api/type'
import { getNameList } from '../../api/window'

export default {
  data: function() {
    return {
      data: {
        cover: '',
        id: 0,
        support: 0,
        name: '',
        typeId: '',
        windowId: ''
      },
      canteenId: 1,
      floor: 1,
      pictureVisible: false,
      dialogPicture: '',
      typeList: [],
      windowList: [],
      headers: { 'authToken': getToken() },
      // 数据校验：判空、正则匹配。
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '菜式名不能为空' }]
      }
    }
  },
  mounted() {
    const params = this.$route.params
    this.data.id = params.id
    this.loadInfo()
    this.loadWindowList()
    this.loadTypeList()
  },
  methods: {
    loadTypeList() {
      getTypeList().then(res => {
        this.typeList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    loadInfo() {
      if (this.data.id > 0) {
        getInfoById(this.data.id).then(res => {
          this.data = res.data
        }).catch(err => {
          this.$message.error('获取信息失败:' + err)
        })
      }
    },
    loadWindowList() {
      getNameList().then(res => {
        this.windowList = res.data
        console.log(this.windowList)
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          const dishesAction = this.data.id > 0 ? update : add
          dishesAction(this.data).then(res => {
            this.$message.success('保存成功')
            this.$router.push({ path: '/dishes/list' })
          }).catch(err => {
            this.$message.error('保存失败:' + err)
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$router.push({ path: '/dishes/list' })
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
      this.data.cover = data.url
      console.log(this.data.cover)
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

