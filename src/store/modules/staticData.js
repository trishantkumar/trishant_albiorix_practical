import userData from './../../assets/data.json'
export default ({
    state: {
      users: userData
    },
    getters: {
      getStaticUsers: (state) => state.users = state.users.sort((date1, date2) => new Date(date2.createdAt) - new Date(date1.createdAt)),
    },
    mutations: {
      SET_USERS(state, users) {
        state.users = users;
      },
      ADD_NEW_USER(state, user) {
        state.users.push(user);
      },
      REMOVE_USER(state, user) {
        let index;
        state.users.forEach((data, i) => {
            if(data.email == user.email) {
                index = i;
            }
        })
        state.users.splice(index, 1);
      },
      UPDATE_USER(state, user) {
        let index;
        state.users.forEach((data, i) => {
            if(data.email == user.email) {
                index = i;
            }
        })
        state.users.splice(index, 1);
        state.users.push(user);
      },
    },
    actions: {
        addNewStaticUser({commit}, data) {
            commit("ADD_NEW_USER", data);
        },
        removeStaticUser({commit}, data) {
            commit("REMOVE_USER", data);
        },
        updateStaticUser({commit}, data ) {
            commit("UPDATE_USER", data);
        }
    },
  })