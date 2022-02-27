<template>
    <div>
        <!-- Validation Errors -->
        <ValidationErrors :errors="form.errors" class="mb-4" />
        <b-form @submit.prevent="submit">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
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
                v-model="form.name"
                placeholder="Enter name"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Your Password:" label-for="input-3">
                <b-form-input
                id="input-3"
                v-model="form.password"
                type="password"
                placeholder="Enter password"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Repeat Password:" label-for="input-4">
                <b-form-input
                id="input-4"
                v-model="form.password_confirmation"
                type="password"
                placeholder="Repeat password"
                required
                ></b-form-input>
            </b-form-group>


            <b-button type="submit" variant="primary" :active="form.processing">Register</b-button>
        </b-form>
    </div>
</template>

<script>
import ValidationErrors from '~/components/ValidationErrors.vue'
export default {
    head: {
        title: 'Register',
    },
    layout: 'guest',
    components: {
        ValidationErrors
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                terms: false,
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
                await this.$axios.post('/auth/register', this.form)

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
