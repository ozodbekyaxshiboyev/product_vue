<template>
      <h2 class="text-center mb-3">Turni uzgartirish</h2>
      <form @submit.prevent="updateType">
            <label for="name" class="form-label">Name</label>
            <input type="text" name="name" id="name" class="form-control" placeholder="userName" required
                   v-model="type.name">

            <label for="description" class="form-label">Description</label>
            <input type="text" name="description" id="description" class="form-control" placeholder="description" required
                   v-model="type.description">

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
  name: "ProductTypeUpdate",

  data() {
    return {
      type: {
        id: "",
        name: "",
        description: "",
      }
    }
  },
  methods: {
    async getType() {
      try {
        const response = await axios.get(`http://localhost:8080/producttype/${this.$route.params.id}`)
        this.type = response.data
        console.log(response.data)
      }catch (e) {
        alert("Xato id kiritildi")
        this.$router.push({name: 'type'})
      }
    },

    async updateType() {
      if (!this.type.name || !this.type.description) return
      try {
        const response = await axios.put(`http://localhost:8080/producttype`, this.type)
      } catch (error) {
        alert(error.message)
      }
      finally {
        this.$router.push({ name: 'type' })
      }
    },

  },

  beforeMount() {
    this.getType()
  },

}
</script>

<style scoped>

</style>