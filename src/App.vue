<template>
  <div class="row">
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <Sidebar :user="user" />
    <Content :details="details" />
  </div>
</template>

<script>
import axios from "axios";
import Content from "./components/Content.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "app",
  components: {
    Content,
    Sidebar
  },
  async created() {
    try {
      const result = await Promise.all([
        this.getStudentDetails(),
        this.getUserInfo()
      ]);
      this.details = result[0].data.detailsData;
      this.user = result[1].data.userData;
    } catch (e) {
      this.error = "Произошла непредвиденная ошибка!";
    }
  },
  data() {
    return {
      details: {
        columns: [],
        rows: []
      },
      error: "",
      user: {}
    };
  },
  methods: {
    getStudentDetails() {
      return axios.post(`/studname/detail?id=${this.studentId}`);
    },
    getUserInfo() {
      return axios.get("/user/get-info");
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
