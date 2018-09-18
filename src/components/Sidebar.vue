<template>
  <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <div class="well well-sm small" v-if="Object.keys(user).length">
      <div v-if="!user.teacherId"><b v-if="user.name">{{ user.name }}</b></div>
      <div v-if="user.teacherId">
        <b v-if="user.name">
          <a :href="`/teacher/view?id=${user.teacherId}`">
            {{ user.name }}
          </a>
        </b>
      </div>
      <div v-if="user.role"><i>{{ user.role }}</i></div>
      <div v-if="user.roleId === '4'">{{ user.office }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      required: true,
      type: Object
    }
  }
};
</script>
