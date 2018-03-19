/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="xinxiqunfa">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>

    <router-link to="/pages/system_administrators/System_Administrators/xinzengxinxiqunfa"><el-button type="primary" class="float-right">+群发消息</el-button></router-link>    
    <div class="title">已发信息列表</div> 
    
    <!-- Table -->
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="departmentValue" clearable placeholder="选择系" size="mini" class="float-left column-selection">
          <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="classValue" clearable placeholder="选择班级" size="mini" class="float-left column-selection">
          <el-option v-for="item in classList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-input placeholder="请输入关键字" v-model="searchValue" class="input-with-select title-search float-right" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column prop="id" label="ID" width="50px"></el-table-column>
          <el-table-column prop="date" label="发送时间"></el-table-column>
          <el-table-column prop="title" label="发送标题"></el-table-column>
          <el-table-column prop="peopleSend" label="发送人" width="80px"></el-table-column>
          <el-table-column prop="peopleTo" label="发送对象" width="80px"></el-table-column>
          <el-table-column prop="state" label="已读/未读" ></el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope" class="control-btn">
              <el-button size="small">查看</el-button>
              <el-button size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableInfo)" size="small" class="control-btn-del">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
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
/* 内容管理 */
export default {
  name: "ContentManagement",
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "信息推送",
          url: ""
        },
        {
          name: "信息群发",
          url: ""
        }
      ],
      departmentList: [
        {
          value: 0,
          label: "1系"
        },
        {
          value: 1,
          label: "2系"
        },
        {
          value: 2,
          label: "3系"
        },
        {
          value: 3,
          label: "4系"
        }
      ],
      departmentValue: "",
      classList:[
         {
          value: 0,
          label: "1班"
        },
        {
          value: 1,
          label: "2班"
        },
        {
          value: 2,
          label: "3班"
        },
        {
          value: 3,
          label: "4班"
        }
      ],
      classValue:"",
      searchValue:"",

      tableInfo: [
        {
          id: 1,
          date: "2017-02-20 08:32",
          title:"关于关于7月6日截止办理自费出国留学材料的通知",
          peopleSend:"张三",
          peopleTo:"李四",
          class:"14工业甲班",
          state: "总数303（150人未读/153已读）",
        },
        {
          id: 1,
          date: "2017-02-20 08:32",
          title:"关于关于7月6日截止办理自费出国留学材料的通知",
          peopleSend:"张三",
          peopleTo:"李四",
          class:"14工业甲班",
          state: "总数303（150人未读/153已读）",
        }
      ],
      tableList: []
    };
  },
  components: {
    Crumb,
    Paging
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 4);
    this.$store.commit("update_system_menu_idx", 4);
  },
  methods: {
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
    //选中的时候触发
    handleSelectionChange(val) {
      this.tableList = val;
      //console.log(val[0].uid)
      //this.tableInfo.splice(val.uid, 1)
      //console.log(this.tableList)
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
#xinxiqunfa {
  .title {
    font-size: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 25px;
    padding-bottom: 16px;
    color: #606266;
  }
}
</style>
