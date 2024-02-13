<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-center">Mahsulot turlari</h1>

        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="type in types" :key="type.id">
            <th scope="row">{{ type.id }}</th>
            <td>{{ type.name }}</td>
            <td>{{ type.description }}</td>
            <td>
              <a class="btn btn-primary" :href="`/type/${type.id}`">Edit</a>
              <button class="btn btn-danger mx-2" @click="$event => deleteType(type.id)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <h2 class="text-center mb-3">Tur qo`shish</h2>
  <form @submit.prevent="addType">
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
  name: "ProductType",

  data() {
    return {
      types: [],
      name: "",
      description: "",
    }
  },
  methods: {
    async getTypes() {
      const response = await axios.get('http://localhost:8080/producttype')
      this.types = response.data
      console.log(response.data)
    },

    addType() {
      console.log("Method ishladi::::::::::::::::::::")
      if (!this.name || !this.description) return
      const newType = {
        name: this.name,
        description: this.description,
      }
      this.name = ""
      this.description = ""

      this.createType(newType)
    },

    async createType(item) {
      try {
        const response = await axios.post('http://localhost:8080/producttype', item)
        this.types.push(response.data)
      } catch (error) {
        alert("Bu nomni type mavjud!")
      }
    },

    async deleteType(id){
      try {
        const response = await axios.delete(`http://localhost:8080/producttype/${id}`)
        this.types = this.types.filter(c => c.id !== id)
      } catch (error) {
        alert("Bu turni uchirib bo`lmadi, bog`liqliklar bo`lishi mumkin")
      }
    },

  },

  mounted() {
    this.getTypes()
  },

}
</script>

<style scoped>

</style>