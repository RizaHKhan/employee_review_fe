<template>
  <div class="login">
    <form action="#" @submit.prevent="login(user)">
      <input type="text" name="email" v-model="user.email" />
      <input type="password" name="password" v-model="user.password" />
      <select name="role" id="role" v-model="user.role">
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="employee">Employee</option>
      </select>
      <button type="submit">Login</button>
    </form>
    <pre>{{ user }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { User } from "../types";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = ref<User>({ email: "", password: "", role: "admin" });

    const login = (user: User): void => {
      store.commit("SET_USER", user);
      router.push({ path: `/${user.role}` });
    };

    return { user, login };
  },
});
</script>
