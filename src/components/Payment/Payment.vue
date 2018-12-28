<template>
  <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <form @submit.prevent="sendData">
      <div class="form-group">
        <b>{{ paymentLabels.paymentByCash }}</b>
        <input class="form-control" @input="calculateTotalPayment" v-model="value_cash">
      </div>
      <div class="form-group">
        <b>{{ paymentLabels.paymentByCard }}</b>
        <input class="form-control" @input="calculateTotalPayment" v-model="value_card">
      </div>
      <div class="form-group">
        <b>{{ paymentLabels.paymentByBank }}</b>
        <input class="form-control" @input="calculateTotalPayment" v-model="value_bank">
      </div>
      <div class="alert alert-success" v-cloak>
        <b>Итог:</b>
        {{ total }} р.
      </div>
      <div class="form-group">
        <b>{{ paymentLabels.receipt }}</b>
        <input class="form-control" v-model="receipt">
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-6">
          <div class="form-group">
            <input type="checkbox" v-model="remain">
            <b>{{ paymentLabels.remain }}</b>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6">
          <div class="form-group">
            <input type="checkbox" v-model="corp">
            <b>{{ paymentLabels.corp }}</b>
          </div>
        </div>
      </div>
      <div class="form-group" v-if="offices.length">
        <select class="form-control" v-model="calc_office">
          <option :value="null">{{ paymentLabels.select }}</option>
          <option :value="o.id" :key="'office-' + o.id" v-for="o in offices">{{ o.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <input class="btn btn-success" type="submit" :value="paymentLabels.create">
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['offices', 'paymentLabels']),
  },
  data() {
    return {
      calc_office: null,
      corp: false,
      value_cash: '0',
      value_card: '0',
      value_bank: '0',
      receipt: '',
      remain: false,
      total: '0',
    };
  },
  methods: {
    calculateTotalPayment() {
      var cache = this.prepareValues(this.value_cash);
      var card = this.prepareValues(this.value_card);
      var bank = this.prepareValues(this.value_bank);
      this.total = (cache + card + bank).toFixed(2);
    },
    prepareValues(value) {
      value = value.replace(/,/gi, '.');
      value = parseFloat(value);
      value = Number.isNaN(value) ? 0 : value;
      return value;
    },
    sendData() {
      fetch('/moneystud/create?sid=$model->calc_studname', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Monestud: {
            calc_office: this.calc_office,
            corp: this.corp,
            value_cash: this.value_cash,
            value_card: this.value_card,
            value_bank: this.value_bank,
            receipt: this.receipt,
            remain: this.remain,
          },
        }),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
          }
        })
        .then(result => {
          console.log(result);
        });
    },
  },
};
</script>