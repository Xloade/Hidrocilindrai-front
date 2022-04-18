<template>
  <div>
    <my-alert ref="alert" />

    <b-form @submit.prevent="submit">
      <b-form-group
        label="Email address:"
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
        label="Your Name:"
      >
        <b-form-input
          id="name"
          v-model="form.name"
          placeholder="Enter name"
          required
        />
      </b-form-group>

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
        Register
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
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
        processing: false,
      }
    }
  },
  head: {
    title: 'Register',
  },

  methods: {
    async submit() {
      this.processing = true

      try {
        await this.$axios.post('/auth/register', this.form)

        await this.$auth.loginWith('laravelSanctum', { data: this.form })

        this.processing = false
      } catch (e) {
        this.$refs.alert.parseError(e)
      }
    }
  }
}
</script>
