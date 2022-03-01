<template>
    <div>
        <div>
            <b-navbar toggleable="lg" type="dark" variant="success">
                <b-navbar-brand to="/dashboard">
                    X Cylinder's
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/dashboard">Dashboard</b-nav-item>
                    <b-nav-item to="/cylinders">My Cylinders</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>{{ $auth.user.name }}</em>
                        </template>
                        <b-dropdown-item @click="logout()">Log Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>    

        <!-- Page Heading -->
        <div class="bg-secondary p-2" v-if="$slots.header">
            <slot name="header" />
        </div>

        <!-- Page Content -->
        <div class="container-fluid">
            <slot />
        </div>
    </div>
</template>

<script>
import BreezeApplicationLogo from '@/components/application-logo.vue'
export default {
    methods: {
        logout() {
            this.$auth.logout()
        }
    },
    components:{
        BreezeApplicationLogo
    }
}
</script>