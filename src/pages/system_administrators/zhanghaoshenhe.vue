/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 10:54:29
 */


<template>
  <div id="zhanghaoshenhe">
    <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 使用说明 -->
    <Instructions :instructionsInfo="instructionsInfo"></Instructions>
    <!-- Table -->
    <div class="table-container">

      <!-- 表格 -->
      <div class="table-body">
        <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
          <el-table-column type="selection" @selection-change="handleSelectionChange"></el-table-column>
          <el-table-column prop="applyDate" label="申请时间"></el-table-column>
          <el-table-column prop="people" label="申请人"></el-table-column>
          <el-table-column prop="course" label="课程名称" ></el-table-column>
          <el-table-column prop="department" label="所在系" ></el-table-column>
          <el-table-column prop="preview" label="申请附件">
              <div slot-scope="scope">
              <div v-if="scope.row.is_img" class="carousel-img">
                <img :src="scope.row.preview" />
              </div>
              <div v-else>
                <a :href="scope.row.preview_url">{{scope.row.preview}}</a>
              </div>
            </div>
          </el-table-column>
          <el-table-column prop="approve" label="审批人" ></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope" class="control-btn">
              <el-button size="small">查看详情</el-button>
              <el-button size="small">通过申请</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableInfo)" size="small" class="control-btn-del">驳回申请</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <!-- 表格控制 -->
      <div class="table-filter">
        <el-button type="primary" size="mini" @click="selection(tableInfo)">全选</el-button>
        <el-button type="primary" size="mini" @click="batchDeleting()">批量驳回</el-button>
        <el-button type="primary" size="mini">批量审核</el-button>
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
          name: "系统设置",
          url: ""
        },
        {
          name: "账号审核",
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
      //选择站点
      siteList: [
        {
          value: 0,
          label: "9401中国美术学院"
        }
      ],
      siteListValue: "",
      //选择栏目
      columnList: [
        {
          value: 0,
          label: "学术交流"
        },
        {
          value: 1,
          label: "通知公告"
        },
        {
          value: 2,
          label: "下载中心"
        },
        {
          value: 3,
          label: "联系我们"
        }
      ],
      columnListValue: "",
      //选择发布状态
      stateList: [
        {
          value: 0,
          label: "已发"
        },
        {
          value: 1,
          label: "待审"
        },
        {
          value: 2,
          label: "草稿"
        }
      ],
      stateValue: "",
      //栏目检索
      titleSearchValue: "",
      //表格
      tableInfo: [
        {
          uid: 20160926002,
          applyDate: "2017-02-20 08:32",
          people:"张三",
          applyCount:"5",
          course:"工业设计导论",
          mergeClass:'14工业甲班，14工业乙班',
          classroom:'A301',
          theTeacher:"李四",
          date:"第八周 周五1，2节",
          class:"14工业甲班",
          state: "已审批",
          approve:"王五 2016-06-29 |08:33",
          remark:"",
          department:'工业设计系',
           preview: "./static/img/test1.jpg"
        },
        {
          uid: 20160926002,
          applyDate: "2017-02-20 08:32",
          people:"张三",
          applyCount:"5",
          mergeClass:'14工业甲班，14工业乙班',
          classroom:'A301',          
          course:"社会实践1",
          date:"第八周 周五1，2节",
          class:"14工业甲班",
          state: "已审批",
          approve:"王五 2016-06-29 |08:33",
          remark:"",
          department:'工业设计系',
           preview: "./static/img/test1.jpg"
          
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

</style>
