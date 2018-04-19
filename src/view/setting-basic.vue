<template>
  <div>
    <table class="setting-table">
      <!-- 头像 -->
      <tr>
        <td>
          <img
            v-show="user.avatar"
            :src="user.avatar"
            class="avatar">
        </td>
        <td>
          <el-upload
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            action="http://192.168.0.104:3000/api/v1/images?directory=avatar">
            <el-button
              size="small"
              type="primary">更改头像</el-button>
            <div
              slot="tip"
              class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </td>
      </tr>
      <!-- 用户名 -->
      <tr>
        <td>用户名</td>
        <td>
          <el-input
            :value="user.username"
            size="medium"
            @input="modifyUsername"/>
          <el-button
            v-show="newUsername && newUsername !== user.username"
            type="primary"
            size="small"
            @click="saveUsername">
            保存
          </el-button>
        </td>
      </tr>
      <tr>
        <td>电子邮件</td>
        <td/>
      </tr>
    </table>
  </div>
</template>

<script>
// 设置头像，用户名等
import { mapState, mapActions, mapMutations } from 'vuex';
import { UPDATE_USER } from '../store/mutation-types';


export default {
  data() {
    return {
      // 修改过后
      newUsername: ''
    };
  },
  computed: {
    ...mapState(['user']),
    headers() {
      return {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      };
    }
  },
  methods: {
    ...mapActions(['updateUser']),
    ...mapMutations([UPDATE_USER]),
    // TODO 上传验证 删除已有
    handleAvatarSuccess(res, file) {
      console.log(res);
      console.log(file);
      this.$message({
        type: 'success',
        message: '修改头像成功'
      });
      this.UPDATE_USER({ avatar: file.url });
    },
    // 用户修改用户名触发该函数
    modifyUsername(newUsername) {
      this.newUsername = newUsername;
    },
    saveUsername() {
      this.updateUser({ username: this.newUsername })
        .then(() => {
          this.$message({
            type: 'success',
            message: '修改用户名成功'
          });
        });
    }
  }
};
</script>

<style scoped>
.setting-table {
  width: 100%;
  border-collapse: collapse;
}

.setting-table tr {
  border-bottom: 1px solid #e4e7ed;
}

.setting-table tr td:first-child {
  width: 150px;
  font-size: 16px;
  color: #909399;
}

.setting-table tr td {
  padding: 20px 0;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.el-input {
  width: 180px;
}
</style>

