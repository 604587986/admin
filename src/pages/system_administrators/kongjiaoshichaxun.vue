<template>
  <div id="kongjiaoshichaxun">
          <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 提示 -->
       <div class="title">
        设计艺术学院18幢教学楼空教室查询
      </div>
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="columnListValue" clearable placeholder="选择时间" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <!-- 表格 -->
      <div class="course-table">
        <div class="head">
          <div><p>时间</p><p> </p></div>          
          <div><p>周一</p><p>{{date[0]}}</p></div>
          <div><p>周二</p><p>{{date[1]}}</p></div>
          <div><p>周三</p><p>{{date[2]}}</p></div>
          <div><p>周四</p><p>{{date[3]}}</p></div>
          <div><p>周五</p><p>{{date[4]}}</p></div>
          <div><p>周六</p><p>{{date[5]}}</p></div>
          <div><p>周日</p><p>{{date[6]}}</p></div>
        </div>
        <div class="body">
          <div>
            <div class="col">08:30-09:15</div>
            <div class="col">09:15-10:00</div>
            <div class="col">10:45-11:30</div>
            <div class="col">11:30-12:15</div>
            <div class="col">13:10-13:55</div>
            <div class="col">13:55-14:40</div>
            <div class="col">14:40-15:25</div>
            <div class="col">15:25-16:15</div>
          </div>          
          <div>
            <div class="col" v-for="(item,index) in courseList[0]" v-if="item">{{item}}</div>
            <div class="col" v-else>&nbsp;</div>
          </div>
          <div>
            <div class="col" v-for="(item,index) in courseList[1]" v-if="item">{{item}}</div>            
            <div class="col" v-else>&nbsp;</div>            
          </div>
          <div>
            <div class="col" v-for="(item,index) in courseList[2]" v-if="item">{{item}}</div>            
            <div class="col" v-else>&nbsp;</div>            
          </div>
          <div>
            <div class="col" v-for="(item,index) in courseList[3]" v-if="item">{{item}}</div>            
            <div class="col" v-else>&nbsp;</div>            
          </div>
          <div>
            <div class="col" v-for="(item,index) in courseList[4]" v-if="item">{{item}}</div>            
            <div class="col" v-else>&nbsp;</div>            
          </div>
          <div>
            <div class="col" v-for="(item,index) in courseList[5]" v-if="item">{{item}}</div>            
            <div class="col" v-else>&nbsp;</div>            
          </div>
          <div>
            <div class="col" v-for="(item,index) in courseList[6]" v-if="item">{{item}}</div>            
            <div class="col" v-else>&nbsp;</div>            
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
import Crumb from "@/components/Crumb";
export default {
  data() {
    return {
      //面包屑
      crumbs: [
        {
          name: "工作台",
          url: "/pages/system_administrators/System_Administrators"
        },
        {
          name: "申请审批",
          url: ""
        },
        {
          name: "教师预约管理",
          url: ""
        },
        {
          name: "空教室查询",
          url: ""
        }
      ],
      columnListValue: [],
      columnList: [],
      date: ["9.18", "9.19", "9.20", "9.21", "9.22", "9.23", "9.24"],
      courseList: [
        ["1", "2", "3", "4", "5", "6", "7", "8"],
        ["a", "s", "d", "f", "g", "h", "j", "k"],
        ["0", "9", "8", "7", "6", "5", "4", "3"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""]
      ]
    };
  },
  mounted: function() {
    //侧边导航定位
    sessionStorage.setItem("system_menu_idx", 6);
    this.$store.commit("update_system_menu_idx", 6);
  },
  components: {
    Crumb
  }
};
</script>
<style lang="less">
@import "../../assets/css/less_config.less";
#kongjiaoshichaxun {
  .title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 30px;
  }
  .table-container {
    .head {
      display: flex;
      > div {
        flex: 1;
        text-align: center;
      }
    }
    .body {
      display: flex;
      > div {
        width: 14.3%;
        &:nth-child(1) {
          flex: 0 0 117px;
        }
        .col {
          height: 50px;
          padding: 5px 5px;
          word-wrap: break-word;
          text-align: center;
          &:nth-child(odd) {
            background-color: #fafafa;
          }
        }
      }
    }
  }
}
</style>

