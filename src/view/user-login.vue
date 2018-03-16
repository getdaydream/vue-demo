<template>
  <div class="login">
    <div class="main">
      <h4 class="title">
        <div class="normal-title">
          <a :class="{active: actived === 'login'}" @click="actived = 'login'">登陆</a>
          <b>·</b>
          <a :class="{active: actived === 'signup'}" @click="actived = 'signup'">注册</a>
        </div>
      </h4>
      <form>
        <input placeholder="你的昵称" type="text">
        <input placeholder="邮箱" type="text">
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      // 'login' | 'signup'
      actived: 'login'
    };
  },
  methods: {
  }
};
</script>

<style>
.login {
  height: 100%;
  min-height: 750px;
  text-align: center;
  font-size: 14px;
  background-color: #f1f1f1;
}

.main {
  width: 400px;
  margin: 60px auto 0;
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
  padding: 10px;
}

.active {
  font-weight: 700;
  color: #ea6f5a;
  border-bottom: 2px solid #ea6f5a;
}

input {
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  width: 100%;
  height: 50px;
  margin-bottom: 0;
  padding: 4px 12px 4px 35px;
  border: 1px solid #c8c8c8;
  border-radius: 0 0 4px 4px;
  background-color: hsla(0, 0%, 71%, 0.1);
  vertical-align: middle;
}
</style>

