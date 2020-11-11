<template>
  <div class="app-container">
    <el-row class="padding">
      <el-col :span="5">
        <el-input v-model="pagination.floor" placeholder="请输入楼层" />
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">
        <el-button type="primary" @click="loadList">搜索</el-button>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="1">
        <el-button type="success" @click="add">添加菜式</el-button>
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
      <el-table-column align="center" label="ID"  prop="id" />
      <el-table-column align="center" label="窗口名" prop="name" />
      <el-table-column align="center" label="楼层"  prop="floor" />
      <el-table-column align="center" label="图片" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.url" min-width="100" height="100" style="padding:5px">
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.$index)">编辑</el-button>
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
import { del, getList } from '@/api/window'

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
  data: function() {
    return {
      list: [],
      loading: false,
      pagination: {
        current: 1,
        size: 10,
        total: 0,
        order: '',
        keywords: '3',
        floor: ''
      }
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
      this.$router.push({ path: '/thirdCanteen/add/' })
    },
    edit(index) {
      const data = this.list[index]
      this.$router.push({ path: '/thirdCanteen/edit/' + data.id })
    },
    del(index) {
      const data = this.list[index]
      del(data.id).then(res => {
        this.$message.success('删除成功')
        this.list.splice(index, 1)
      }).catch(err => {
        this.$message.error('删除失败:' + err)
      })
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
