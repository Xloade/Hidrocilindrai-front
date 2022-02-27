<template>
    <div>
        <b-alert variant="info">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
        </b-alert>

        <!-- Validation Errors -->
        <ValidationErrors :errors="form.errors" class="mb-4" />

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
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
import ValidationErrors from '~/components/ValidationErrors.vue'
export default {
    head: {
        title: 'Forgot Password',
    },
    layout: 'guest',
    components: {
        ValidationErrors
    },
    data() {
        return {
            form: {
                email: '',
                processing: false,
                errors: []
            }
        }
    },
    methods: {
        async submit() {
            this.processing = true
            this.form.errors = []

            try {
                await this.$axios.post('/auth/forgot-password', this.form)

                this.processing = false
            } catch (e) {
                Object.keys(e.response.data.errors).forEach(key => {
                    Object.values(e.response.data.errors[key]).forEach(error => {
                        this.form.errors.push(error)
                    })
                })
            }
        }
    }
}
</script>