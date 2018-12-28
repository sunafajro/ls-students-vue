<template>
  <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <div
      class="alert alert-info"
      v-if="invoiceLabels.total"
    >{{ invoiceLabels.total }}: {{ totalSum }} р. - {{ totalSale }} р. = {{ totalSumWithSale }} р.</div>
    <form @submit.prevent="onSubmit" style="margin-bottom: 2rem">
      <div class="form-group" v-if="invoiceServices.length">
        <b>{{ invoiceLabels.service }}:</b>
        <select class="form-control" v-model="serviceId">
          <option :value="null">{{ invoiceLabels.select}}</option>
          <option
            :key="'service_' + item.id"
            :value="item.id"
            v-for="item in invoiceServices"
          >#{{ item.id }} {{ item.name }} ({{ item.value }} р.)</option>
        </select>
      </div>
      <div class="row">
        <div :class="invoicePermSale.id ? 'col-sm-6' : 'col-sm-12'" v-if="invoiceProcSales.length">
          <div class="form-group">
            <b>{{ invoiceLabels.procsale }}:</b>
            <select
              class="form-control"
              :disabled="permsaleId !== null ? true : false"
              v-model="procsaleId"
            >
              <option :value="null">{{ invoiceLabels.select}}</option>
            </select>
          </div>
        </div>
        <div :class="invoiceProcSales.length ? 'col-sm-6' : 'col-sm-12'" v-if="invoicePermSale.id">
          <div class="form-group">
            <b>{{ invoiceLabels.permsale }}:</b>
            <select
              class="form-control"
              :disabled="procsaleId !== null ? true : false"
              v-model="permsaleId"
            >
              <option :value="null">{{ invoiceLabels.select}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6" v-if="invoiceRubSales.length">
          <b>{{ invoiceLabels.rubsaleid }}</b>
          <select
            class="form-control"
            :disabled="rubsaleValue !== 0 ? true : false"
            v-model="rubsaleId"
          >
            <option :value="null">{{ invoiceLabels.select}}</option>
          </select>
        </div>
        <div
          :class="invoiceRubSales.length ? 'col-sm-6' : 'col-sm-12'"
          v-if="invoiceLabels.rubsaleval"
        >
          <div class="form-group">
            <b>{{ invoiceLabels.rubsaleval }}</b>
            <input
              class="form-control"
              :disabled="rubsaleId !== null ? true : false"
              v-model="rubsaleValue"
            >
          </div>
        </div>
      </div>
      <div class="form-group" style="display: flex; justify-content: space-between">
        <div style="padding-top: 0.4rem">
          <button
            style="marginRight: 5px"
            class="btn btn-primary"
            @click="clickCalculateButton"
            v-if="invoiceLabels.calculate"
          >{{ invoiceLabels.calculate }}</button>
          <input
            style="marginRight: 5px"
            class="btn btn-success"
            type="submit"
            :value="invoiceLabels.addsale"
            v-if="invoiceLabels.addsale"
          >
        </div>
        <div>
          <div>
            <input type="checkbox" v-model="remain" v-if="invoiceLabels.remain">
            {{ invoiceLabels.remain }}
          </div>
          <div>
            <input type="checkbox" v-model="corp" v-if="invoiceLabels.corp">
            {{ invoiceLabels.corp }}
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'invoiceLabels',
      'invoicePermSale',
      'invoiceProcSales',
      'invoiceRubSales',
      'invoiceServices',
    ]),
  },
  data() {
    return {
      corp: false,
      lessonNum: 0,
      officeId: null,
      permsaleId: null,
      procsaleId: null,
      remain: false,
      rubsaleId: null,
      rubsaleValue: 0,
      serviceId: null,
      totalSale: 0,
      totalSum: 0,
      totalSumWithSale: 0,
      // validation: {
      //   service: null,
      //   num: null,
      //   office: null,
      // },
      // sending: false,
      // saveResult: null,
    };
  },
  methods: {
    calcInvoiceSum() {
      let totalValue = 0;
      let totalWithSale = 0;
      let totalSale = 0;
      let serviceVal =
        this.serviceId !== null
          ? this.getValueById(this.serviceId, this.invoiceServices)
          : null;
      let procSaleVal =
        this.procsaleId !== null
          ? this.getProcSaleValue(this.procsaleId)
          : null;
      let rubSaleVal =
        this.rubsaleId !== null ? this.getRubSaleValue(this.rubsaleId) : null;

      /* считаем полную стоимость без скидок */
      totalValue = this.lessonNum * serviceVal;
      totalWithSale = totalValue;

      if (rubSaleVal) {
        /* вычитаем рублевую назначенную скидку */
        totalWithSale = totalWithSale - rubSaleVal;
      } else if (this.rubsaleValue) {
        /* или вычитаем рублевую введеную скидку */
        totalWithSale = totalWithSale - this.rubsaleValue;
      }

      if (procSaleVal) {
        /* вычитаем процентную назначенную скидку */
        totalWithSale = totalWithSale - totalWithSale * procSaleVal * 0.01;
      } else if (this.permsaleId !== '0') {
        /* вычитаем процентную постоянную скидку */
        totalWithSale =
          totalWithSale - totalWithSale * this.invoicePermSale.value * 0.01;
      }

      /* олучаем размер скидки и округляем в большую сторону */
      if (totalWithSale === 0) {
        totalSale = totalValue - totalWithSale;
      } else {
        totalSale = Math.round(totalValue - totalWithSale);
      }

      return {
        totalSum: totalValue,
        totalSumWithSale: totalValue - totalSale,
        totalSale: totalSale,
      };
    },
    clickCalculateButton() {
      const { totalSum, totalSumWithSale, totalSale } = this.calcInvoiceSum();
      this.totalSum = totalSum;
      this.totalSumWithSale = totalSumWithSale;
      this.totalSale = totalSale;
    },
    getValueById(id) {
      return this.invoiceServices.reduce((a, v) => {
        if (v.id === id) {
          a = parseFloat(v.value).toFixed(2);
        }
      }, '');
    },
    onSubmit() {},
  },
};
</script>
