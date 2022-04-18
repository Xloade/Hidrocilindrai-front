<template>
  <div>
    <my-alert ref="alert" />

    <b-form @submit.prevent="submit">
      <b-form-group
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
      <b-button
        type="submit"
        variant="primary"
      >
        Submit
      </b-button>
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
        processing: false,
      }
    }
  },
  head: {
    title: 'Forgot Password',
  },
  methods: {
    async submit() {
      this.processing = true
      this.form.errors = []

      try {
        const result = await this.$axios.post('/auth/forgot-password', {email: this.form.email})
        this.$refs.alert.setAlert(result.data.status, "success")
        this.processing = false
      } catch (e) {
        this.$refs.alert.parseError(e)
      }
    }
  }
}
</script>
