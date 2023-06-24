<template>
  <div class="main_container" v-if="userData">
      <div class="primary_section">
        <input type="text" class="search" placeholder="Search by name, email or mobile" v-model="searchQuery" />
        <button @click="openUserDetailsModal(userDetails)">Add New User</button>
      </div>
      <table>
          <tr>
            <th style="width: 25%;">Name</th>
            <th style="width: 30%;">Email</th>
            <th style="width: 15%;">Mobile</th>
            <th style="width: 15%;">Date of Birth</th>
            <th style="width: 15%;">Action</th>
          </tr>
          <tr v-for="(user, index) in filterUsersList" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.mobile }}</td>
            <td>{{ user.dob }}</td>
            <td>
              <div class="action_button">
                <button @click="openUserDetailsModal(user)">Edit</button>
                <button @click="openDeleteModal(user)">Delete</button>
              </div>
            </td>
          </tr>
      </table>

      <!-- Delete Modal Start -->
      <div id="myModal" class="modal" v-if="isUserDeleteModal">
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close" @click="closeModal()">&times;</span>
          <div class="edit_modal_content" style="margin-top: 10px;">
            Are you sure you want to <b>Delete</b> this user?
          </div>
          <div class="edit_modal_buttons">
            <button class="discard_button" @click="closeModal()">Discard</button>
            <button class="blue_button" @click="deleteUser()">Confirm</button>
          </div>
        </div>
      </div>

      <!-- Add Modal Start -->
      <div id="myModal" class="modal" v-if="isUserDetailsModalVisible">
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close" @click="closeModal()">&times;</span>
          <div class="edit_modal_heading">
            <h1>Add or Edit</h1>
          </div>
          <ValidationObserver v-slot="{ handleSubmit }">
            <div class="edit_modal_content">
              <div class="edit_modal_inner_content">
                <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                  <label>Name</label>
                  <br/>
                  <input type="text" v-model="userDetails.name" />
                  <span class="d-block">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="edit_modal_inner_content">
                <ValidationProvider name="Email" rules="required" v-slot="{ errors }">
                  <label>Email</label>
                  <br/>
                  <input type="email" v-model="userDetails.email" />
                  <span class="d-block">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="edit_modal_inner_content">
                <ValidationProvider name="Mobile" rules="required" v-slot="{ errors }">
                  <label>Mobile</label>
                  <br/>
                  <input type="phone" v-model="userDetails.mobile" />
                  <span class="d-block">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="edit_modal_inner_content">
                <ValidationProvider name="Date of Birth" rules="required" v-slot="{ errors }">
                  <label>Date of Birth</label>
                  <br/>
                  <input type="date" :max="currentDate" v-model="userDetails.dob" />
                  <span class="d-block">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="edit_modal_buttons">
              <button class="discard_button"  @click="closeModal()">Discard</button>
              <button class="blue_button" @click="handleSubmit(saveData)">Save</button>
            </div>
          </ValidationObserver>
        </div>
      </div>
  </div>
</template>
<script>
import userData from './../assets/data.json'
import { mapGetters } from 'vuex';

export default {
  name : "StaticDataView",
  data() {
    return {
      isUserDetailsModalVisible: false,
      isUserDeleteModal: false,
      userData: userData,
      userDetails: {
        "name" : "",
        "email" : "",
        "mobile" : "",
        "dob" : "",
      },
      searchQuery: "",
      deleteModalData: [],
      modalType: "",
      currentDate: ""
    }
  },
  async mounted() {
    this.currentDate = new Date().toJSON().slice(0, 10); // set max input field date to today
    this.userData = await this.getStaticUsers;
  },
  methods: {
    saveData() {
      if(this.modalType == 'update') {
        this.updateUserData();
      }
      if(this.modalType == 'addNew') {
        this.saveNewUserData();
      }
    },
    openDeleteModal(user) {
      this.isUserDeleteModal = true;
      this.deleteModalData = user;
    },
    deleteUser() {
      this.$store.dispatch('removeStaticUser', this.deleteModalData).then(async () => {
        this.closeModal();
        this.userData = await this.getStaticUsers;
      });
    },
    openUserDetailsModal(user) {
      if(user.email) {
        this.modalType = "update"
      } else {
        this.modalType = "addNew"
      }
      this.isUserDetailsModalVisible = true;
      this.userDetails = user;
    },
    closeModal() {
      this.isUserDetailsModalVisible = false;
      this.isUserDeleteModal = false;
      this.modalType = "";
      this.userDetails = {
          "name" : "",
          "email" : "",
          "mobile" : "",
          "dob" : "",
        }
    },
    updateUserData() {
      this.$store.dispatch('updateStaticUser', this.userDetails).then(async () => {
        this.closeModal();
        this.userData = await this.getStaticUsers;
        this.$swal.fire({
          icon: "success",
          text: "User Updated Successfully",
          showConfirmButton: true,
        });
      });
    },
    saveNewUserData() {
      let flag
      this.userData.forEach(data => {
          if(data.email == this.userDetails.email) {
            flag = true;
          }
      })
      if(flag) {
          this.closeModal();
          this.$swal.fire({
          icon: "error",
          text: "Email already exists!",
          showConfirmButton: true,
        })
      }
      else {
        this.$store.dispatch('addNewStaticUser', this.userDetails).then(async () => {
          this.closeModal();
          this.$swal.fire({
            icon: "success",
            text: "New User Added Successfully",
            showConfirmButton: true,
          });
          this.userData = await this.getStaticUsers;
        });
      }
    }
  },
  computed: {
    filterUsersList() {
      if(this.searchQuery.charAt(2) != '') {
        var filterData =[]
        this.userData.forEach(data => {
          if (data.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            data.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            data.mobile.includes(this.searchQuery)) {
            filterData.push(data);
          }
        })
        return filterData;
      } else {
        return this.userData;
      }
    },
    ...mapGetters(['getStaticUsers']),
  }
}
</script>
<style scoped>
input.search {
  width: 260px;
  border: 1px solid #555;
  display: block;
  padding: 9px 4px 9px 40px;
  background: transparent url("./../assets/icons8-search-20.svg") no-repeat 13px;
}
button{
  cursor: pointer;
}
.discard_button {
  background-color: #E3E4E5;
  border: #E3E4E5;
  color: black;
  font-size: 15px;
  font-weight: 600;
  width: 80px;
  height: 30px
}
.blue_button {
  background-color: #3CB6DE;
  border: #3CB6DE;
  color: white;
  font-size: 15px;
  font-weight: 600;
  width: 80px;
  height: 30px
}
.action_button {
  display: flex;
  justify-content: space-around;
}
.action_button button {
  color: white;
  font-size: 15px;
  font-weight: 600;
}
.main_container {
  width: 1000px;
  margin: auto;
}

.action_button button:first-child {
  background-color: #3CB6DE;
  border: #3CB6DE;
}
.action_button button:nth-child(2) {
  background-color: red;
  border: red;
}

.primary_section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  height: 30px;;
}
.primary_section input {
  width: 220px;
}

.primary_section button {
  background-color: #3CB6DE;
  border: #3CB6DE;
  color: white;
  font-size: 15px;
  font-weight: 600;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 2px solid black;
  text-align: center;
  padding: 8px;
}
th {
  font-size: 20px;
  color: black;
}

/* Modal CSS */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 35%;
  border-radius: 20px;
  border: 2px solid white;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.edit_modal_content {
  text-align: left;

}
.edit_modal_inner_content {
  margin: 10px 0;
}

.edit_modal_inner_content label {
  font-size: larger;
  color: #8E9091;
  font-weight: 600;
}

.edit_modal_inner_content input {
  margin-top: 10px;
  width: 100%;
  height: 25px;
}
.edit_modal_buttons {
  margin-top: 2rem;
  text-align: right;
}
.edit_modal_buttons button {
  margin: 0 10px;
}
.d-block {
  display: block;
  color: red;
}
</style>