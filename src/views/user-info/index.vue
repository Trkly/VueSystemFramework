<template>
  <div class="user-info-container">
    <el-card>
      <div id="userInfoBox" class="user-info-box">
        <!-- 标题 -->
        <h2 class="title">员工信息</h2>
        <div class="header">
          <!-- 头部渲染表格 -->
          <el-descriptions :column="2" border>
            <el-descriptions-item label="姓名">{{ detailData.username }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ detailData.gender }}</el-descriptions-item>
            <el-descriptions-item label="民族">{{ detailData.nationality }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ detailData.mobile }}</el-descriptions-item>
            <el-descriptions-item label="居住地">{{ detailData.province }}</el-descriptions-item>
            <el-descriptions-item label="入职时间">{{ $filters.dateFilter(detailData.openTime) }}</el-descriptions-item>
            <el-descriptions-item label="备注" :span="2">
              <el-tag class="remark" size="small" v-for="(item, index) in detailData.remark" :key="index">{{ item }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系地址" :span="2">{{ detailData.address }}</el-descriptions-item>
          </el-descriptions>
          <!-- 头像渲染 -->
          <el-image class="avatar" :src="detailData.avatar" :preview-src-list="[detailData.avatar]"></el-image>
        </div>
        <div class="body">
          <!-- 内容渲染表格 -->
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item label="经历">
              <ul>
                <li v-for="(item, index) in detailData.experience" :key="index">
                  <span>
                    {{ $filters.dateFilter(item.startTime, 'YYYY/MM') }}
                    ----
                    {{ $filters.dateFilter(item.endTime, 'YYYY/MM') }}
                  </span>
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item label="专业">
              {{ detailData.major }}
            </el-descriptions-item>
            <el-descriptions-item label="荣耀">
              {{ detailData.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 尾部签名 -->
        <!-- <div class="foot">签字：___________日期:___________</div> -->
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { userDetail } from '@/api/user-manage'
import { defineProps, ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 数据相关
const detailData = ref({})
const getUserDetail = async () => {
  const { result } = await userDetail(props.id)
  detailData.value = result
}
getUserDetail()
</script>

<style lang="scss" scoped>
.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    ::v-deep .el-descriptions {
      flex-grow: 1;
    }
    .avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
