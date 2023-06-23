import Vue from 'vue'
import Vuex from 'vuex'
// import axios from "axios"
// import env from "@/../env.js"
import apiData from './modules/dataFromApi'
import staticData from './modules/staticData'


Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  //   users: []
  // },
  // getters: {
  //   getUsers: (state) => state.users,
  // },
  // mutations: {
  //   SET_USERS(state, users) {
  //     state.users = users;
  //   },

  // },
  // actions: {
  //   async fetchUsers({ commit }) {
  //     try {
  //       const data = await axios.get(
  //         env.API_URL + "/users"
  //       );
  //       commit("SET_USERS", data.data);
  //     } catch (error) {
  //       alert(error);
  //       console.log(error);
  //     }
  //   },
  //   addNewUser(context, newUserDetails) {
  //     let data = {
  //       "name" : newUserDetails.name,
  //       "email" : newUserDetails.email,
  //       "mobile" : newUserDetails.mobile,
  //       "dob" : newUserDetails.dob,
  //     }
  //     axios.post(env.API_URL + "/users", data, {
  //       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  //     }).then(async () => {
  //     }).catch(error => {
  //       console.log(error)
  //     });
  //   },
  //   removeUser(context, id) {
  //       axios.delete(env.API_URL + "/users/" + id).then(() => {
  //       }).catch(error => {
  //         console.log(error)
  //       });
  //   },
  //   updateUser(context, editModalData ) {
  //     let data = {
  //         "name" : editModalData.name,
  //         "email" : editModalData.email,
  //         "mobile" : editModalData.mobile,
  //         "dob" : editModalData.dob,
  //       }
  //       axios.post(env.API_URL + "/users/" + editModalData._id, data, {
  //         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  //       }).then(() => {
  //       }).catch(error => {
  //         console.log(error)
  //       });
  //   }
  // },
  modules: {
    apiData,
    staticData
  }
})
