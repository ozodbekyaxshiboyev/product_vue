<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-center">Mahsulot statuslari</h1>

        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="status in statuses" :key="status.id">
            <th scope="row">{{ status.id }}</th>
            <td>{{ status.name }}</td>
            <td>{{ status.description }}</td>
            <td>
              <a class="btn btn-primary" :href="`/status/${status.id}`">Edit</a>
              <button class="btn btn-danger mx-2" @click="$event => deleteStatus(status.id)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <h2 class="text-center mb-3">Mahsulot statusi qo`shish</h2>
  <form @submit.prevent="addStatus">
    <label for="name" class="form-label">Name</label>
    <input type="text" name="name" id="name" class="form-control" placeholder="name" required
           v-model="name">

    <label for="description" class="form-label">Description</label>
    <input type="text" name="description" id="description" class="form-control" placeholder="description"
           required
           v-model="description">
    <div class="row">
      <div class="col-md-12 form-group">
        <input type="submit" value="Qo`shish" class="btn btn-primary w-100">
      </div>
    </div>
  </form>
</template>


<script>
import axios from 'axios'

export default {
  name: "ProductStatus",

  data() {
    return {
      statuses: [],
      name: "",
      description: "",
    }
  },
  methods: {
    async getStatuses() {
      const response = await axios.get('http://localhost:8080/productstatus')
      this.statuses = response.data
      console.log(response.data)
    },

    addStatus() {
      if (!this.name || !this.description) return
      const newStatus = {
        name: this.name,
        description: this.description,
      }
      this.name = ""
      this.description = ""

      this.createStatus(newStatus)
    },

    async createStatus(item) {
      try {
        const response = await axios.post('http://localhost:8080/productstatus', item)
        this.statuses.push(response.data)
      } catch (error) {
        alert("Bu nomni status mavjud!")
      }
    },

    async deleteStatus(id){
      try {
        const response = await axios.delete(`http://localhost:8080/productstatus/${id}`)
        this.statuses = this.statuses.filter(c => c.id !== id)
      } catch (error) {
        alert("Bu statusni uchirib bo`lmadi, bog`liqliklar bo`lishi mumkin")
      }
    },

  },

  mounted() {
    this.getStatuses()
  },

}
</script>

<style scoped>

</style>