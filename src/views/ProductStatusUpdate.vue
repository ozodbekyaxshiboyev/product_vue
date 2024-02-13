<template>
      <h2 class="text-center mb-3">Statusni uzgartirish</h2>
      <form @submit.prevent="updateStatus">
            <label for="name" class="form-label">Name</label>
            <input type="text" name="name" id="name" class="form-control" placeholder="userName" required
                   v-model="status.name">

            <label for="description" class="form-label">Description</label>
            <input type="text" name="description" id="description" class="form-control" placeholder="description" required
                   v-model="status.description">

        <div class="row">
          <div class="col-md-12 form-group">
            <input type="submit" value="Update" class="btn btn-success w-100">
          </div>
        </div>

      </form>


</template>


<script>
import axios from 'axios'

export default {
  name: "ProductStatusUpdate",

  data() {
    return {
      status: {
        id: "",
        name: "",
        description: "",
      }
    }
  },
  methods: {
    async getStatus() {
      try {
        const response = await axios.get(`http://localhost:8080/productstatus/${this.$route.params.id}`)
        this.status = response.data
        console.log(response.data)
      }catch (e) {
        alert("Xato id kiritildi")
        this.$router.push({name: 'status'})
      }
    },

    async updateStatus() {
      if (!this.status.name || !this.status.description) return
      try {
        const response = await axios.put(`http://localhost:8080/productstatus`, this.status)
      } catch (error) {
        alert(error.message)
      }
      finally {
        this.$router.push({ name: 'status' })
      }
    },

  },

  beforeMount() {
    this.getStatus()
  },

}
</script>

<style scoped>

</style>