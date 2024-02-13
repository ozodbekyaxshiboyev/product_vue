<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink :to="{name: 'product'}" class="navbar-brand">MAHSULOTLAR</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink :to="{name: 'type'}" class="navbar-brand">Turlar</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{name: 'status'}" class="navbar-brand">Statuslar</RouterLink>
          </li>

        </ul>
      </div>
    </div>
  </nav>
  <hr/>
  <br>
  <br>
  <br>
  <br>

</template>

<script>

</script>

<style></style>
