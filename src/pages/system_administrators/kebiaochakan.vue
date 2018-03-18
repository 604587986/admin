<template>
  <div id="kebiaochakan">
          <!-- 面包屑 -->
    <Crumb :crumbs="crumbs"></Crumb>
    <!-- 提示 -->
       <div class="title">
        设计艺术学院视觉传达设计系 2017-2018学年第一学期本科专业教学进程表
      </div>
    <div class="table-container">
      <!-- 表格筛选 -->
      <div class="table-filter">
        <el-select v-model="columnListValue" clearable placeholder="选择课程" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="columnListValue" clearable placeholder="选择班级" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
          <el-select v-model="columnListValue" clearable placeholder="选择月份" size="mini" class="float-left column-selection">
          <el-option v-for="item in columnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
          <el-select v-model="columnListValue" clearable placeholder="选择周次" size="mini" class="float-left column-selection">
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
          name: "课表管理",
          url: ""
        },
        {
          name: "课表管理",
          url: ""
        },
        {
          name: "课表查看",
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
    sessionStorage.setItem("system_menu_idx", 2);
    this.$store.commit("update_system_menu_idx", 2);
  },
  components: {
    Crumb
  }
};
</script>
<style lang="less">
@import "../../assets/css/less_config.less";
#kebiaochakan {
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
          font-size: 14px;
          border: 1px solid #000;
          margin-left: -1px;
          margin-top: -1px;
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

