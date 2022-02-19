<template>
  <BreezeAuthenticatedLayout>
    <template #header>
      <MyHeader :name="title" />
    </template>
        <div class="d-flex m-6 gap-2">

            <b-card
                v-for="cylinder in cylinders"
                :key="cylinder.id"
                :title="'Cylinder: '+cylinder.id"
                img-src="/images/cylinders/1.png"
                img-alt="Image"
                img-top
                tag="article"
                style=""
                class="col-6"
            >
                <b-link class="btn btn-primary" :to="`/cylinders/${cylinder.id}`">Edit</b-link>
                <b-button variant="danger">Button</b-button>
            </b-card>
        </div>

    
  </BreezeAuthenticatedLayout>
</template>

<script>
import BreezeAuthenticatedLayout from '@/layouts/authenticated.vue'
import MyHeader from '@/components/header.vue'
export default {
    data() {
      return {
        title: 'My cylinders',
        cylinders: []
      }
    },
    head() {
        return{
            title: this.title,
        }
    },
    asyncData ({ $axios }, callback) {
        $axios.get('/api/cylinders')
        .then((res) => {
            callback(null, { cylinders: res.data })
        })
    },

    middleware: 'authenticated',

    components: {
        BreezeAuthenticatedLayout,
        MyHeader,
    }
}
</script>