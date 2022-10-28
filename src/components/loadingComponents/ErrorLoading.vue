<template lang="ts">
<div>{{ message }}</div>;
</template>
<script>
export default {
  name: 'errorLoadingComponent',
  setup() {
    return {
      message: 'Ops! Algo Aconteceu',
    };
  },
};
</script>
<style lang=""></style>
