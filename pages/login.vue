<template>
    <div>
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

            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                placeholder="Enter password"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4">
                <b-form-checkbox v-model="form.remember">Remember me</b-form-checkbox>
            </b-form-group>

            <b-button type="submit" variant="primary" :active="form.processing">Login</b-button>
            <b-link to="/forgot-password" class="btn btn-secondary">
                Forgot your password?
            </b-link>
        </b-form>
    </div>
</template>

<script>
import ValidationErrors from '~/components/ValidationErrors.vue'
export default {
    head: {
        title: 'Login',
    },
    layout: 'guest',
    components: {
        ValidationErrors
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
                remember: false,
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
                await this.$auth.loginWith('laravelSanctum', { data: this.form })
            
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