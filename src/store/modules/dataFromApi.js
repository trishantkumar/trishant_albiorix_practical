import axios from "axios"
import env from "@/../env.js"
export default ({
    state: {
      users: [],
      status: ''
    },
    getters: {
      getUsers: (state) => state.users,
    },
    mutations: {
      SET_USERS(state, flag) {
        state.users = flag;
      },
    },
    actions: {
      async fetchUsers({ commit }) {
        try {
          const data = await axios.get(
            env.API_URL + "/users"
          );
          commit("SET_USERS", data.data);
        } catch (error) {
          alert(error);
          console.log(error);
        }
      },
    },
  })