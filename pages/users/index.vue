<template>
  <div>
    <BreezeAuthenticatedLayout>
      <template #header>
        <div class="d-flex">
          <my-header :name="title" />
          <b-button
            variant="success"
            @click="$refs.userForm.open(null)"
          >
            Add
          </b-button>
        </div>
      </template>
      <div class="">
        <my-alert ref="alert" />
        <div class="row">
          <b-table
            :items="users"
            :fields="fields"
          >
            <template #cell(roles)="{ item }">
              <template v-if="item.roles[0]">
                {{ item.roles[0].name }}
              </template>
            </template>

            <template #cell(actions)="{ item }">
              <b-button
                variant="info"
                size="sm"
                @click="$refs.userForm.open(item.id)"
              >
                Edit
              </b-button>
              <b-button
                variant="danger"
                size="sm"
                @click="remove(item.id)"
              >
                Remove
              </b-button>
            </template>
          </b-table>
        </div>
      </div>
    </BreezeAuthenticatedLayout>
    <user-form
      ref="userForm"
      @done="$nuxt.refresh"
    />
  </div>
</template>

<script>
import BreezeAuthenticatedLayout from '~/layouts/authenticatedLayout.vue'
import myAlert from '~/components/myComponents/myAlert.vue'
import userForm from '~/components/modals/userForm.vue'
import MyHeader from '~/components/myComponents/myHeader.vue'
export default {

  components: {
    BreezeAuthenticatedLayout,
    MyHeader,
    myAlert,
    userForm
  },

  middleware: 'authenticated',
  asyncData ({ $axios }, callback) {
    $axios.get('/api/admin/user')
      .then((res) => {
        callback(null, { users: res.data })
      })
  },
  data() {
    return {
      title: 'Users',
      users: [],
      fields: [
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'email',
          label: 'E-mail',
        },
        {
          key: 'roles',
          label: 'Role',
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
    }
  },
  head() {
    return{
      title: this.title,
    }
  },
  methods:{
    remove(id){
      this.$axios.delete("/api/admin/user/"+id)
        .then((message) => {
          this.$refs.alert.parseSuccess(message)
          this.$nuxt.refresh()
        })
        .catch((error) => {
          this.$refs.alert.parseError(error)
        })
    }
  }
}
</script>
