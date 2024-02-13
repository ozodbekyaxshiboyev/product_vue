<template>
  <h2 class="text-center mb-3">Mahsulot ma`lumotlarini uzgartirish</h2>
  <form @submit.prevent="updateProduct">
    <label for="name" class="form-label">Name</label>
    <input type="text" name="name" id="name" class="form-control" placeholder="userName" required
           v-model="product.name">

    <label for="description" class="form-label">Description</label>
    <input type="text" name="description" id="description" class="form-control" placeholder="description" required
           v-model="product.description">

    <label for="price" class="form-label">Price</label>
    <input type="number" name="price" id="price" class="form-control" placeholder="price" required v-model="product.price">


    <div class="input-group">
      <select v-model="this.product.productType" class="form-select">
        <option disabled value="">Turini tanlang...</option>
        <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
<!--        <option v-for="type in types" :key="type.id" :value="type.id" v-if="[{selected: this.product.productType===type.id},]">{{ type.name }}</option>-->
      </select>,
    </div>

    <div class="input-group">
      <select v-model="this.product.productStatus" class="form-select">
        <option disabled>Holatini tanlang...</option>
        <option v-for="status in statuses" :key="status.id" :value="status.id">{{ status.name }}</option>
      </select>
    </div>


    <div class="row">
      <div class="col-md-12 form-group">
        <input type="submit" value="Update" class="btn btn-success w-100">
      </div>
    </div>

  </form>


</template>


<script>
import axios from 'axios'
import product from "@/views/Product.vue";

export default {
  name: "ProductUpdate",

  data() {
    return {
      product: {
        id: "",
        name: "",
        description: "",
        price: "",
        productType: "",
        productStatus: "",
      },
      types: [],
      statuses: [],
    }
  },
  methods: {

    async getProduct() {
      try {
        const response = await axios.get(`http://localhost:8080/product/${this.$route.params.id}`)
        this.product = response.data
        console.log(response.data)
      } catch (e) {
        alert("Xato id kiritildi")
        this.$router.push({name: 'product'})
      }
    },

    async updateProduct() {
      if (!this.product.name || !this.product.description || !this.product.price > 0) return
      try {
        await axios.put(`http://localhost:8080/product`, this.product)
        this.$router.push({name: 'product'})
      } catch (error) {
        alert("Iltimos ma`lumotlarni to`g`ri va to`liq kiriting")
      }
    },

    async getTypes() {
      const response = await axios.get('http://localhost:8080/producttype')
      this.types = response.data
      // this.types = this.types.filter(c => c.id !== this.product.productType.id)
    },
    async getStatuses() {
      const response = await axios.get('http://localhost:8080/productstatus')
      this.statuses = response.data
      // this.statuses = this.statuses.filter(c => c.id !== this.product.productStatus.id)
    },

  },

  beforeMount() {
    this.getProduct()
    this.getTypes()
    this.getStatuses()
  },

}
</script>

<style scoped>

</style>