/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:28:14
 */


<template>
    <div id="shujubeifen">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>
        <!-- 使用说明 -->
        <Instructions :instructionsInfo="instructionsInfo"></Instructions>
        <!-- Table -->
        <div class="table-container">
            <!-- 表格筛选 -->
            <div class="table-filter">
                <router-link to="/pages/system_administrators/System_Administrators/tianjiayonghu" class="float-left filter-link">
                    <el-button size="mini" type="primary"> <router-link to="/pages/system_administrators/System_Administrators/beifenshezhi" style="color:#fff"> 备份设置</router-link></el-button>
                </router-link>
                <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
                    <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
                </el-input>
            </div>
            <!-- 表格 -->
            <div class="table-body">
                <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
                    <el-table-column type="selection" @selection-change="handleSelectionChange"></el-table-column>
                    <el-table-column prop="name" label="备份名称"></el-table-column>
                    <el-table-column prop="size" label="文件大小"></el-table-column>
                    <el-table-column prop="date" label="备份时间"></el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" class="control-btn">
                            <el-button size="mini" @click="xiugaiyonghu">还原</el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableInfo)" size="mini" class="control-btn-del">删除</el-button>
                        </div>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 表格控制 -->
            <div class="table-filter">
                <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
                <el-button type="primary" size="mini" @click="batchDeleting()">批量删除</el-button>
            </div>
            <!-- 分页 -->
            <Paging></Paging>
        </div>
    </div>
</template>

<script>
/* 引入组件 */
import Crumb from "@/components/Crumb";
import Paging from "@/components/Paging";
import Instructions from "@/components/Instructions";
/* 用户列表 */
export default {
  name: "UserList",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "系统设置",
          url: ""
        },
        {
          name: "数据备份",
          url: ""
        }
      ],
      //使用说明
      instructionsInfo: [
        {
          title: "标题1",
          content: "添加站点使用说明"
        },
        {
          title: "标题2",
          content: "添加站点使用说明"
        }
      ],
      //栏目检索
      titleSearchValue: "",
      //表格
      tableInfo: [
        {
          name: "2016028_1",
          size: "1741Kb",
          date: "2016-06-28 13:00:51"
        },
        {
          name: "2016028_1",
          size: "1741Kb",
          date: "2016-06-28 13:00:51"
        }

      ],
      tableList: []
    };
  },
  components: {
    Crumb,
    Instructions,
    Paging
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 7);
    this.$store.commit("update_system_menu_idx", 7);
  },
  methods: {
    //跳转到修改用户
    xiugaiyonghu(){
      this.$router.push('/pages/system_administrators/System_Administrators/xiugaiyonghu')
    },
    //检索
    articleSearch() {},
    //删除表格行
    deleteRow(index, rows) {
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //表格排序
    sortBlur(a, b) {
      console.log(b[a].uid);
    },
    //选中的时候触发
    handleSelectionChange(val) {
      this.tableList = val;
    },
    //全选
    selection(rows) {
      var that = this;
      if (this.tableInfo.length !== this.tableList.length) {
        rows.forEach(row => {
          that.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        that.$refs.multipleTable.clearSelection();
      }
    },
    //批量删除
    batchDeleting() {
      for (var i = 0; i < this.tableList.length; i++) {
        //console.log(this.tableList[i].uid)
      }
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
