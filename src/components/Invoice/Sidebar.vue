<template>
  <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <UserInfo/>
    <h4 style="margin-top: 1rem" v-if="invoiceHints.length">{{ invoiceLabels.hints }}:</h4>
    <div
      class="panel panel-default"
      style="margin-top: 0.5rem; padding: 0.5rem"
      :key="'hint-block-' + index"
      v-for="(h, index) in invoiceHints"
    >
      <small>{{ h }}}</small>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UserInfo from '../UserInfo.vue';

export default {
  components: {
    UserInfo,
  },
  computed: {
    ...mapState(['invoiceHints', 'invoiceLabels']),
  },
};
</script>
