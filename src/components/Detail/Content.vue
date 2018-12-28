<template>
  <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <table class="table table-striped table-bordered table-hover table-condensed small">
      <thead v-if="columns.length">
        <th :key="`th-${column.id}`" v-for="column in columns" v-if="column.show">{{ column.name }}</th>
      </thead>
      <tbody v-if="rows.length">
        <tr :key="`tr-${row.id}`" v-for="row in rows">
          <td
            :class="column.id === 'type' ? colors[row[column.id]] : ''"
            :key="`td-${row.id}-${column.id}`"
            v-for="column in columns"
            v-if="column.show"
          >
            <span v-if="column.id === 'date'">{{ row[column.id] | formatDate }}</span>
            <span v-if="column.id === 'sum'">{{ row[column.id] | formatNumber }}</span>
            <span v-if="column.id !== 'date' && column.id !== 'sum'">{{ row[column.id] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="rows.length">
      <p>
        <b>Всего по счетам:</b>
        {{ total.invoices | formatNumber }} р
        <br>
        <b>Всего по оплатам:</b>
        {{ total.payments | formatNumber }} р
        <br>
        <b>Оплаты - счета:</b>
        {{ total.all | formatNumber }} р
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import numeral from 'numeral';

moment.locale('ru');

export default {
  computed: {
    ...mapState(['paymentDetails', 'paymentDetailsFilter']),
    columns() {
      return this.paymentDetails.columns;
    },
    rows() {
      if (this.paymentDetailsFilter) {
        return this.paymentDetails.rows.filter(
          item => item.date.substr(0, 4) === this.paymentDetailsFilter
        );
      } else {
        return this.paymentDetails.rows;
      }
    },
    total() {
      let invoices = 0;
      let payments = 0;
      if (Array.isArray(this.rows) && this.rows.length) {
        this.rows.forEach(item => {
          if (item.hasOwnProperty('name') && item.hasOwnProperty('num')) {
            invoices += parseFloat(item.sum);
          } else {
            payments += parseFloat(item.sum);
          }
        });
      }
      return {
        invoices,
        payments,
        all: payments - invoices,
      };
    },
  },
  data() {
    return {
      colors: {
        счёт: 'warning',
        оплата: 'success',
      },
    };
  },
  filters: {
    formatDate(date) {
      return moment(date).format('DD.MM.YYYY');
    },
    formatNumber(value) {
      return numeral(value).format('0,0');
    },
  },
};
</script>
