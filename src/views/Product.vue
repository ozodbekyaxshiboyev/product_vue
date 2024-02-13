<template>

  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-center">Mahsulotlar</h1>

        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Product Type</th>
            <th scope="col">Product Status</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="product in products" :key="product.id">
            <th scope="row">{{ product.id }}</th>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.productType.name }}</td>
            <td>{{ product.productStatus.name }}</td>
            <td>
              <a class="btn btn-primary" :href="`/product/${product.id}`">Edit</a></td>
            <td>
              <button class="btn btn-danger mx-2" @click="$event => deleteProduct(product.id)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>


  <br>
  <br>
  <br>
  <br>
  <hr/>
  <h2 class="text-center mb-3">Mahsulot qo`shish</h2>
  <form @submit.prevent="addProduct">

    <label for="name" class="form-label">Name</label>
    <input type="text" name="name" id="name" class="form-control" placeholder="userName" required v-model="name">


    <label for="description" class="form-label">Description</label>
    <input type="text" name="description" id="description" class="form-control" placeholder="Description" required
           v-model="description">


    <label for="price" class="form-label">Price</label>
    <input type="number" name="price" id="price" class="form-control" placeholder="price" required v-model="price">


    <div class="input-group">
      <select v-model="productType" class="form-select">
        <option disabled>Turini tanlang...</option>
        <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
      </select>
    </div>

    <div class="input-group">
      <select v-model="productStatus" class="form-select">
        <option disabled>Holatini tanlang...</option>
        <option v-for="status in statuses" :key="status.id" :value="status.id">{{ status.name }}</option>
      </select>
    </div>


    <div class="row">
      <div class="col-md-12 form-group">
        <input type="submit" value="Mahsulotni qo`shish" class="btn btn-primary w-100">
      </div>
    </div>

  </form>


</template>


<script>
import axios from 'axios'

export default {
  name: "Product",

  data() {
    return {
      products: [],
      types: [],
      statuses: [],
      name: "",
      description: "",
      price: "",
      productType: "",
      productStatus: "",
    }
  },
  methods: {
    async getProducts() {
      const response = await axios.get('http://localhost:8080/product')
      this.products = response.data
      console.log(response.data)
    },

    addProduct() {
      if (!this.name || !this.description || parseFloat(this.price) <= 0) {
        alert("Ma`lumotlarni to`g`ri kiriting")
        return
      }
      const newProduct = {
        name: this.name,
        description: this.description,
        price: this.price,
        productType: this.productType,
        productStatus: this.productStatus,
      }
      this.name = ""
      this.description = ""
      this.price = ""
      this.productType = ""
      this.productStatus = ""

      this.createProduct(newProduct)
    },

    async createProduct(item) {
      try {
        const response = await axios.post('http://localhost:8080/product', item)
        this.products.push(response.data)
      } catch (error) {
        alert("Mahsulot yaratishda xatolik!")
      }
    },

    async deleteProduct(id) {
      console.log(id)
      try {
        await axios.delete(`http://localhost:8080/product/${id}`)
        this.products = this.products.filter(c => c.id !== id)
      } catch (error) {
        alert(error.message)
      }
    },

    async getTypes() {
      const response = await axios.get('http://localhost:8080/producttype')
      this.types = response.data
    },
    async getStatuses() {
      const response = await axios.get('http://localhost:8080/productstatus')
      this.statuses = response.data
    },

  },

  mounted() {
    this.getProducts()
    this.getTypes()
    this.getStatuses()
  },

}
</script>

<style scoped>
.container{
  background-color: #f2f2f2;
}
</style>