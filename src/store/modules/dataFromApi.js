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
      SET_USERS(state, data) {
        state.users = data;
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