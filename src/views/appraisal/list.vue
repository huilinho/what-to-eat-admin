<template>
  <div class="app-container">
    <el-row class="padding">
      <el-col :span="5">
        <el-input v-model="pagination.keywords" placeholder="请输入用户名称" />
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">
        <el-button type="primary" @click="loadList">搜索</el-button>
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
      <el-table-column align="center" label="ID" width="95" prop="id" />
      <el-table-column align="center" label="用户名" width="95" prop="userId" :formatter="UserFormatter" />
      <el-table-column align="center" label="菜式" prop="dishesId" :formatter="DishFormatter" />
      <el-table-column align="center" label="评价内容" prop="appraisal" />
      <el-table-column align="center" label="创建时间" prop="createTime" />
      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="del(scope.$index)">删除</el-button>
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
          layout="total,sizes, prev, pager, next,jumper"
          :total="pagination.total"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { del, getList, getUser, getDish } from '@/api/appraisal'
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
      userList: [],
      dishList: []
    }
  },
  created() {
    this.loadList()
    this.loadDish()
    this.loadUser()
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
    loadUser() {
      getUser().then(res => {
        console.log(res.data)
        this.userList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    loadDish() {
      getDish().then(res => {
        console.log(res.data)
        this.dishList = res.data
      }).catch(err => {
        console.log(err)
      })
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
    },
    UserFormatter(value) {
      for (const index in this.userList) {
        if (this.userList[index].id === value.userId) {
          return this.userList[index].username
        }
      }
    },
    DishFormatter(value) {
      for (const index in this.dishList) {
        if (this.dishList[index].id === value.dishesId) {
          return this.dishList[index].name
        }
      }
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
