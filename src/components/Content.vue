<template>
  <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <table class="table table-striped table-bordered table-hover table-condensed small">
      <thead v-if="columns.length">
        <th :key="`th-${column.id}`" v-for="column in columns" v-if="column.show">{{ column.name }}</th>
      </thead>
      <tbody v-if="rows.length">
        <tr :key="`tr-${row.id}`" v-for="row in rows" >
          <td :class="column.id === 'type' ? row[column.id] === 'счёт' ? 'warning' : 'success' : ''" :key="`td-${row.id}-${column.id}`" v-for="column in columns" v-if="column.show">{{ row[column.id] }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="rows.length">
      <p><b>Всего по счетам:</b> {{ total.invoices }} р<br />
      <b>Всего по оплатам:</b> {{ total.payments }} р<br />
      <b>Оплаты - счета:</b> {{ total.all }} р</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    total() {
      let invoices = 0;
      let payments = 0;
      if (Array.isArray(this.rows) && this.rows.length) {
        this.rows.forEach(item => {
          if (item.hasOwnProperty("name") && item.hasOwnProperty("num")) {
            invoices += parseFloat(item.sum);
          } else {
            payments += parseFloat(item.sum);
          }
        });
      }
      return {
        invoices,
        payments,
        all: payments - invoices
      };
    }
  },
  props: {
    columns: {
      required: true,
      type: Array
    },
    rows: {
      required: true,
      type: Array
    }
  }
};
</script>
