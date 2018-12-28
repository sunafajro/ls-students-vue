<template>
  <div class="well well-sm small" v-if="Object.keys(user).length">
    <b style="display: block" v-if="!user.teacherId && user.name">{{ user.name }}</b>
    <b style="display: block" v-if="user.teacherId && user.name">
      <a :href="'/teacher/view?id=' + user.teacherId">{{ user.name }}</a>
    </b>
    <i style="display: block" v-if="user.role">{{ user.role }}</i>
    <span style="display: block" v-if="user.roleId === '4'">{{ user.office }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
  },
};
</script>