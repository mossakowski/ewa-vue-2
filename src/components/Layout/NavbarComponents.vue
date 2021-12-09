<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">EWA</b-navbar-brand>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Wyloguj się</b-button>
        </b-nav-form>

      </b-navbar-nav>
  </b-navbar>  
</template>

<script>
export default {
    name : 'NavbarComponents'
}
</script>
