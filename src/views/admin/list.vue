<template>
  <div class="app-container">
    <el-row class="padding">
      <el-col :span="5">
        <el-input v-model="pagination.keywords" placeholder="请输入管理员名称"></el-input>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">
        <el-button type="primary" @click="loadList">搜索</el-button>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">
        <el-button type="success" @click="add">添加管理员</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95" prop="id"/>
      <el-table-column align="center" label="名称" width="95" prop="username"/>
      <el-table-column align="center" label="昵称" prop="nickname"/>
      <el-table-column align="center" label="手机" prop="mobile" />
      <el-table-column align="center" label="头像"  width="120">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" min-width="70" height="70" style="padding:5px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="密码" prop="password"/>
      <el-table-column align="center" label="创建时间" prop="createTime" :formatter="timeFormatter"/>
      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.$index)" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="padding">
      <el-col :span="24">
        <el-pagination
          background
          :current-page="pagination.current"
          :page-sizes="[10,20, 50, 100]"
          :page-size="pagination.size"
          @size-change="onSizeChange"
          @current-change="onPageChange"
          layout="total,sizes, prev, pager, next,jumper"
          :total="pagination.total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { del, getList } from '@/api/admin'
import DateUtil from '../../utils/DateUtil'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      pagination: {
        current: 1,
        size: 10,
        total: 0,
        order: 'id desc',
        keywords: ''
      },
      keywords: ''
    }
  },
  created() {
    this.loadList()
  },
  methods: {
    loadList() {
      this.loading = true
      getList(this.pagination).then(res => {
        const data = res.data
        this.pagination.total = data.total
        this.list = data.records
        this.loading = false
      }).catch(err => {
        console.err(err)
        this.loading = false
      })
    },
    add() {
      this.$router.push({ path: '/admin/add/' })
    },
    edit(index) {
      const data = this.list[index]
      this.$router.push({ path: '/admin/edit/' + data.id })
    },
    del(index) {
      const data = this.list[index]
      del(data.id).then(res => {
        this.$message.success('删除成功')
        this.list.splice(index, 1)
      }).catch(err => {
        this.$message.error('删除失败:' + err)
      })
    },
    timeFormatter(row) {
      return DateUtil.format(row.createTime)
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar {
    width: 100px;
    height: auto;
  }
  .padding{
    padding:10px 0;
  }
</style>
