<template>
  <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <UserInfo/>
    <div v-if="Array.isArray(paymentDetailsYears) && paymentDetailsYears.length">
      <h4>Фильтры:</h4>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <select class="form-control form-control-sm" v-model="year">
            <option
              :key="`opt-${item.value}`"
              v-for="item in paymentDetailsYears"
              :value="item.value"
            >{{ item.text }}</option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UserInfo from '../UserInfo.vue';

export default {
  components: {
    UserInfo,
  },
  computed: {
    ...mapState(['paymentDetailsFilter', 'paymentDetailsYears']),
    year: {
      get() {
        return this.$store.state.paymentDetailsFilter;
      },
      set(value) {
        this.$store.commit('updatePaymentDetailsFilter', { filter: value });
      },
    },
  },
};
</script>
