<template>
  <div>
    <my-alert ref="alert" />
    <b-form @submit.prevent="submit">
      <b-form-group
        label="Your Password:"
      >
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          required
        />
      </b-form-group>

      <b-form-group
        label="Repeat Password:"
      >
        <b-form-input
          id="passwordRepeat"
          v-model="form.password_confirmation"
          type="password"
          placeholder="Repeat password"
          required
        />
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
        :active="form.processing"
      >
        Reset Password
      </b-button>
    </b-form>
  </div>
</template>

<script>
import myAlert from '~/components/myAlert.vue'
export default {
  components: {
    myAlert
  },

  layout: 'guestLayout',

  data() {
    return {
      form: {
        token: this.$router.currentRoute.params.token,
        email: this.$router.currentRoute.query.email,
        password: '',
        password_confirmation: '',
        processing: false,
      }
    }
  },
  head: {
    title: 'Reset Password',
  },

  methods: {
    async submit() {
      this.processing = true
      try {
        const results = await this.$axios.post('/auth/reset-password', this.form)
        this.form.success = results.data.status
        this.$refs.alert.setAlert(results.data.status, "success")
        this.processing = false
      } catch (e) {
        this.$refs.alert.setAlert(e.response.data.errors, "danger")
      }
    }
  }
}
</script>
