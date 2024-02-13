<template>
  <div>
    <div class="container">
      <Navbar/>
      <RouterView/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {Navbar},
}
</script>

<style>
.container, .text-center {
  background-color: beige;
  color: #181818;
  //display: flex;
  //flex-wrap: wrap;

}
</style>
