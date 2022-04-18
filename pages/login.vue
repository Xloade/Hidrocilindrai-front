<template>
  <div>
    <my-alert ref="alert" />
    <b-form @submit.prevent="submit">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        />
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Your Name:"
      >
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          required
        />
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox v-model="form.remember">
          Remember me
        </b-form-checkbox>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        :active="form.processing"
      >
        Login
      </b-button>
      <b-link
        to="/forgot-password"
        class="btn btn-secondary"
      >
        Forgot your password?
      </b-link>
    </b-form>
  </div>
</template>

<script>
import myAlert from '~/components/myComponents/myAlert.vue'
export default {
  components: {
    myAlert
  },
  layout: 'guestLayout',
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false,
        processing: false,
      }
    }
  },
  head: {
    title: 'Login',
  },

  methods: {
    async submit() {
      this.processing = true

      try {
        await this.$auth.loginWith('laravelSanctum', { data: this.form })

        this.processing = false
      } catch (e) {
        this.$refs.alert.parseError(e)
      }
    }
  }
}
</script>
