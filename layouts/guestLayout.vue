<template>
  <div>
    <div>
      <b-navbar
        toggleable="lg"
        type="dark"
        variant="success"
      >
        <b-navbar-brand to="/dashboard">
          X Cylinder's
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse
          id="nav-collapse"
          is-nav
        >
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/login">
              Log in
            </b-nav-item>
            <b-nav-item to="/register">
              Register
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- Page Content -->
    <div class="container">
      <div class="col-lg-6 col-md-8 col-12 mx-auto my-4">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'guest'
}
</script>
