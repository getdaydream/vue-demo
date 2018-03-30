<template>
  <div>
    <el-upload class="image-upload">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar">

    </el-upload>
  </div>
</template>

<script>

export default {

};
</script>

<style scoped>
.image-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: inline-block;
  text-align: center;
  outline: none;
}
</style>

