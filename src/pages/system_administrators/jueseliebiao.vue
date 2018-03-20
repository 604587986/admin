/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-01-31 15:51:10 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-02-02 17:28:14
 */


<template>
    <div id="jueseliebiao">
        <!-- 面包屑 -->
        <Crumb :crumbs="crumbs"></Crumb>

        <!-- Table -->
        <div class="table-container">
            <!-- 表格筛选 -->
            <div class="table-filter">
                <el-input placeholder="请输入关键字" v-model="titleSearchValue" class="input-with-select title-search float-right" size="mini">
                    <el-button slot="append" icon="el-icon-search" @click="articleSearch()"></el-button>
                </el-input>
            </div>
            <!-- 表格 -->
            <div class="table-body">
                <el-table ref="multipleTable" :data="tableInfo" stripe size="small">
                    <el-table-column prop="id" label="ID" width="50px"></el-table-column>
                    <el-table-column prop="title" label="标题" width="150px"></el-table-column>
                    <el-table-column label="相应权限">
                        <div slot-scope="scope">
                            <el-checkbox v-for="(item,index) in scope.row.power" :key="item.id" :label="item.label" :checked="item.value" v-model="item.value" @change="afun(scope.row.power)"></el-checkbox>
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
          name: "角色列表",
          url: ""
        }
      ],

      //栏目检索
      titleSearchValue: "",
      //表格
      tableInfo: [
        {
          id: 1,
          title: "系统管理员",
          power: [
            { value: true, label: "权限1" ,id:1},
            { value: true, label: "权限2" ,id:2},
            { value: true, label: "权限3" ,id:3},
            { value: true, label: "权限4" ,id:4},
            { value: true, label: "权限5" ,id:5}
          ]
        },
        {
          id: 2,
          title: "系统管理员",
          power: [
            { value: true, label: "权限1" ,id:1},
            { value: false, label: "权限2" ,id:2},
            { value: true, label: "权限3" ,id:3},
            { value: true, label: "权限4" ,id:4},
            { value: true, label: "权限5" ,id:5}
          ]
        }
      ]
    };
  },
  components: {
    Crumb,

    Paging
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 7);
    this.$store.commit("update_system_menu_idx", 7);
  },
  methods: {
      afun(val){
          console.log(val);        
      },
      bfun(id){
          console.log(id)
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#jueseliebiao {
  .el-checkbox {
    margin: 0 20px 5px 0;
  }
}
</style>
