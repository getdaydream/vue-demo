<template>
  <div class="login">
    <div class="main">
      <h4 class="title">
        <div class="normal-title">
          <a
            :class="{active: page === 'login'}"
            @click="switchPage('login')">
            登陆
          </a>
          <b>·</b>
          <a
            :class="{active: page === 'signup'}"
            @click="switchPage('signup')">注册</a>
        </div>
      </h4>

      <!-- 输入邮箱密码 -->
      <form>
        <!-- 昵称输入框 -->
        <div
          v-show="page === 'signup'"
          class="input-container">
          <input
            v-model="username"
            placeholder="你的昵称"
            autocomplete="username"
            type="text"
            style="border-radius:4px 4px 0 0;;border-bottom: none;"
            @keyup.enter="submit">
          <img src="../../static/icon/user.svg">
        </div>
        <!-- 邮箱输入框 -->
        <div
          class="input-container"
        >
          <input
            v-model="email"
            :style="{'border-radius': page === 'login' ? '4px 4px 0 0;' : ''}"
            placeholder="邮箱"
            autocomplete="email"
            type="text"
            style="border-bottom: none;"
            @keyup.enter="submit">
          <img src="../../static/icon/mail.svg">
        </div>
        <!-- 密码输入框 -->
        <div class="input-container">
          <input
            v-model="password"
            placeholder="密码"
            autocomplete="current-password"
            type="password"
            style="border-radius: 0 0 4px 4px;"
            @keyup.enter="submit">
          <img src="../../static/icon/lock.svg">
        </div>
        <el-checkbox
          v-show="page === 'login'"
          v-model="rememberMe"
          class="remember-check">
          记住我
        </el-checkbox>
        <!-- 提交按钮 -->
        <div
          :style="{'margin-top': page === 'signup' ? '35px' : ''}"
          :class="{'login-btn': page === 'login', 'signup-btn': page === 'signup'}"
          class="submit-btn"
          @click="submit">
          {{ page === 'login' ? '登陆' : '注册' }}
        </div>
      </form>
      <!-- 更多登陆方式 -->
      <div class="more-sign">
        <h6>
          {{ page === 'login' ? '第三方账号登陆' : '第三方账号直接注册' }}
        </h6>
        <ul>
          <li @click="redirectGithubOAuth">
            <img
              title="GitHub"
              src="../../static/icon/github.svg">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { emailPattern, usernamePattern } from '../util';
import http from '../api/http';
import { UPDATE_TOKEN, SWITCH_PAGE, UPDATE_USER } from '../store/mutation-types';
import store from '../store/index';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      rememberMe: true
    };
  },
  computed: mapState(['page']),
  watch: {
    // 切换登陆注册时，重置账号密码
    page() {
      this.email = '';
      this.password = '';
    },
    // 不允许昵称邮箱密码中有空格
    username() {
      this.username = this.username.trim();
    },
    email() {
      this.email = this.email.trim();
    },
    password() {
      this.password = this.password.trim();
    }
  },
  activated() {
    if (localStorage.getItem('token')) {
      this.$router.replace({ path: '/' });
    }
  },
  methods: {
    switchPage(page) {
      store.commit(SWITCH_PAGE, { page });
    },
    // 验证邮箱字段
    isEmailValid() {
      if (!this.email.trim()) {
        this.$message({
          type: 'warning',
          message: '请输入邮箱'
        });
        return false;
      }
      if (!emailPattern.test(this.email)) {
        this.$message({
          type: 'warning',
          message: '请输入正确格式的邮箱'
        });
        return false;
      }
      return true;
    },
    // 验证密码字段
    isPasswordValid() {
      if (!this.password.trim()) {
        this.$message({
          type: 'warning',
          message: '请输入密码'
        });
        return false;
      }
      if (this.password.length < 8) {
        this.$message({
          type: 'warning',
          message: '密码长度不能小于8位'
        });
        return false;
      }
      return true;
    },
    // 验证昵称字段
    isUsernameValid() {
      if (!this.username.length) {
        this.$message({
          type: 'warning',
          message: '请输入昵称'
        });
        return false;
      }
      if (!usernamePattern.test(this.username)) {
        this.$message({
          type: 'warning',
          message: '昵称 格式不正确，需要是2-15个字符，只能包含英文中文下划线，不能包含空格。'
        });
        return false;
      }
      return true;
    },
    submit() {
      if (this.page === 'signup' && !this.isUsernameValid()) {
        return;
      }
      if (this.isEmailValid() && this.isPasswordValid()) {
        if (this.page === 'login') {
          this.login();
        } else {
          this.signup();
        }
      }
    },
    // 登陆
    login() {
      http.post('/v1/users/login', {
        email: this.email,
        password: this.password
      }).then(({ data }) => {
        if (data.error) {
          this.$message({
            message: data.error,
            type: 'error'
          });
        } else {
          console.log(data);
          store.commit(UPDATE_TOKEN, { token: data.token });
          store.commit(UPDATE_USER, data.user);
          this.$router.replace({ path: '/' });
          this.$message({
            message: '登陆成功',
            type: 'success'
          });
        }
      });
    },
    // 注册
    signup() {
      http.post('/v1/users/signup', {
        username: this.username,
        email: this.email,
        password: this.password
      }).then((res) => {
        if (res.data.token) {
          store.commit(UPDATE_TOKEN, { token: res.data.token });
          this.$router.replace({ path: '/' });
          this.$message({
            message: '恭喜你，注册成功',
            type: 'success'
          });
        }
      });
    },
    // 跳转获取github授权
    redirectGithubOAuth() {
      http.get('/v1/oauth/github').then((res) => {
        window.location.replace(res.data.redirect);
      });
    }
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  min-height: 750px;
  text-align: center;
  font-size: 14px;
  background-color: #f1f1f1;
}

.main {
  width: 400px;
  margin: 150px auto 0;
  padding: 50px 50px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  vertical-align: middle;
  display: inline-block;
}

@media screen and (max-width: 768px) {
  .login {
    height: auto;
    min-height: 0;
    background-color: transparent;
  }
  .main {
    position: absolute;
    left: 50%;
    margin: 0 0 0 -200px;
    box-shadow: none;
  }
}

.title {
  margin: 0 auto 50px;
  padding: 10px;
  font-weight: 400;
  color: #969696;
}

.title a {
  display: inline;
  padding: 10px;
}

.active {
  font-weight: 700;
  color: #ea6f5a;
  border-bottom: 2px solid #ea6f5a;
}

.tooltip {
  border: 1px solid #ea6f5a;
  background-color: #fff;
}

.input-container {
  width: 100%;
  position: relative;
}

.input-container img {
  position: absolute;
  top: 15px;
  left: 10px;
  width: 18px;
}

input {
  width: 100%;
  height: 50px;
  margin-bottom: 0;
  padding: 4px 12px 4px 35px;
  border: 1px solid #c8c8c8;
  margin: 0;
  background-color: hsla(0, 0%, 71%, 0.1);
}

input:focus {
  outline: none;
}

.remember-check {
  float: right;
  margin: 15px 0;
}

.login-btn {
  background: #187cb7;
}

.login-btn:hover {
  background: #3194d0;
}

.signup-btn {
  background: #42c02e;
}

.signup-btn:hover {
  background: #3db922;
}

.submit-btn {
  width: 100%;
  padding: 9px 18px;
  font-size: 18px;
  border: none;
  border-radius: 25px;
  color: #fff;
  cursor: pointer;
  clear: both;
}

.more-sign {
  margin-top: 50px;
}

h6 {
  position: relative;
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 500;
  color: #b5b5b5;
}

h6::before {
  left: 30px;
  content: "";
  border-top: 1px solid #b5b5b5;
  display: block;
  position: absolute;
  width: 60px;
  top: 5px;
}

h6::after {
  right: 30px;
  content: "";
  border-top: 1px solid #b5b5b5;
  display: block;
  position: absolute;
  width: 60px;
  top: 5px;
}

ul {
  margin-bottom: 10px;
  list-style: none;
  padding: 0;
}

li {
  margin: auto;
  display: flex;
  width: 50px;
  height: 50px;
  cursor: pointer;
}

li img {
  margin: auto;
  width: 30px;
}
</style>
