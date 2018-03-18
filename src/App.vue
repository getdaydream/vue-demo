<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

*,
:after,
:before {
  box-sizing: border-box;
}

img {
  display: block;
}

a {
  cursor: pointer;
}

h4,
h5,
h6 {
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 1.1;
}

h4 {
  font-size: 18px;
}
</style>
