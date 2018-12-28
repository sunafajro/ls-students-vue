<template>
  <div class="row">
    <Sidebar/>
    <Content/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Content from './Content.vue';
import Sidebar from './Sidebar.vue';

export default {
  components: {
    Content,
    Sidebar,
  },
  async created() {
    await this.getInvoiceData();
  },
  methods: {
    ...mapActions(['getInvoiceData']),
  },
};
</script>
