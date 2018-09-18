<template>
  <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <table class="table table-striped table-bordered table-hover table-condensed small">
      <thead v-if="details.columns.length">
        <th ></th>
      </thead>
      <tbody v-if="details.rows.length">
        <td></td>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      required: true,
      type: Object
    }
  }
};
</script>
