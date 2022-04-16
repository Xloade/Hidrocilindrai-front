<template>
  <div>
    <b-alert
      v-model="showDismissibleAlert"
      variant="info"
    >
      Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
    </b-alert>

    <b-alert
      v-model="verificationLinkSent"
      variant="success"
    >
      A new verification link has been sent to the email address you provided during registration.
    </b-alert>

    <b-form @submit.prevent="submit">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        />
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        :disabled="form.processing"
      >
        Resend Verification Email
      </b-button>
      <b-button
        variant="secondary"
        @click="logout()"
      >
        Log Out
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  layout: 'guestLayout',
  data() {
    return {
      form: {
        status: '',
        processing: false
      }
    }
  },
  head: {
    title: 'Verify Email',
  },

  computed: {
    verificationLinkSent() {
      return this.status === 'verification-link-sent';
    }
  },

  methods: {
    async submit() {
      this.processing = true

      await this.$axios.post('/auth/email/verification-notification')

      this.status = 'verification-link-sent'
      this.processing = false
    },
  },
}
</script>
