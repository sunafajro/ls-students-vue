<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div class="alert alert-warning" v-if="loading">Идет загрузка данных...</div>
      <div class="alert alert-danger" v-if="error">Произошла непредвиденная ошибка!</div>
    </div>
    <Sidebar :filter="filter" :setFilter="setFilter" :user="user" :years="years" v-if="!loading" />
    <Content :columns="columns" :rows="rows" v-if="!loading"/>
  </div>
</template>

<script>
import axios from "axios";
import Content from "./components/Content.vue";
import Sidebar from "./components/Sidebar.vue";
import { getMaxOfArray } from "./utils";

export default {
  name: "app",
  components: {
    Content,
    Sidebar
  },
  computed: {
    columns() {
      return this.details.columns;
    },
    rows() {
      if (this.filter) {
        return this.details.rows.filter(
          item => item.date.substr(0, 4) === this.filter
        );
      } else {
        return this.details.rows;
      }
    }
  },
  async created() {
    try {
      const result = await Promise.all([
        this.getStudentDetails(),
        this.getUserInfo()
      ]);
      this.details = result[0].data.detailsData;
      this.user = result[1].data.userData;
      const { filter, years } = this.prepareYears(
        result[0].data.detailsData.rows
      );
      this.filter = String(filter);
      this.years = years;
      this.loading = false;
    } catch (e) {
      this.error = true;
      this.loading = false;
    }
  },
  data() {
    return {
      details: {
        columns: [],
        rows: []
      },
      error: false,
      filter: "",
      loading: true,
      user: {},
      years: []
    };
  },
  methods: {
    getStudentDetails() {
      return axios.post(`/studname/detail?id=${this.studentId}`);
    },
    getUserInfo() {
      return axios.get("/user/get-info");
    },
    setFilter(str) {
      this.filter = str;
    },
    prepareYears(rows) {
      const years =
        Array.isArray(rows) && rows.length
          ? rows.map(item => item.date.substr(0, 4))
          : [];
      const unique = years.filter((item, i, ar) => ar.indexOf(item) === i);
      const arr = [{ text: "-выбрать год-", value: "" }];
      return {
        filter: unique.length
          ? getMaxOfArray(unique.map(item => parseInt(item)))
          : "",
        years: arr.concat(
          unique.map(item => {
            return { text: item, value: item };
          })
        )
      };
    }
  },
  props: {
    studentId: {
      required: true,
      type: Number
    }
  }
};
</script>
