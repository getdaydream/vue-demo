<template>
  <button
    :class="[
      type ? 'gd-button-' + type : ''
    ]"
    class="gd-button"
  >

    <i
      v-if="icon"
      :class="icon"/>
    <span v-if="$slots.default"><slot/></span>
  </button>
</template>

<script>
export default {
  name: 'GdButton',
  props: {
    // 'default' | 'switch'
    type: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.gd-button {
  display: inline-block;
  padding: 0;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  min-width: 60px;
  margin-right: 10px;
}

.gd-button-default {
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.gd-button-default:hover {
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid transparent !important;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3);
}

.gd-button-default:focus {
  outline: none;
}
</style>
