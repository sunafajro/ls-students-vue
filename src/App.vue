<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  async created() {
    await this.getOfficesInfo();
    await this.getUserInfo();
  },
  methods: {
    ...mapActions(['getOfficesInfo', 'getUserInfo']),
  },
};
</script>
