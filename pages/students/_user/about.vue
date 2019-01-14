<template>
  <v-layout column>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-flex tag="h1">User Profile</v-flex>
    <v-text-field
      label="Username"
      v-model="user.username"
      :rules="[rules.required]"
      readonly
      required
    ></v-text-field>

    <v-text-field
      label="Email"
      v-model="user.email"
      :rules="[rules.required]"
      :readonly="!editable"
      required
    ></v-text-field>

    <v-select
      label="Role"
      v-model="user.role"
      :items="['student', 'teacher', 'institute', 'developer', 'operator']"
      :rules="[rules.required]"
      :readonly="!editable"
      required
    ></v-select>

    <v-btn
      v-if ="editable"
      color="success"
      @click="save"
    >
      Edit
    </v-btn>
  </v-form>
  <div class="text-xs-center">
    <v-dialog
      v-model="successDialog"
      width="500"
    >
      <v-card>
        <v-card-text>
          정보가 성공적으로 변경되었습니다.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="successDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</v-layout>
</template>

<script>

export default {
  middleware: ['auth'],
  data() {
    return {
      editable: this.$auth.user.name === this.$route.params.user,
      valid: true,
      username: '',
      email: '',
      role: '',
      rules: {
        required: value => !!value || 'Required',
      },
      show_password: false
    }
  },
  async asyncData({route, $axios, redirect}){
    const user = await $axios.$get('/api/user/' + route.params.user)
    .catch( err => {
      console.log(err)
      redirect('/')         // invalid user
    })

    return {
      user,
      successDialog: false
    }
  },
  methods: {
    async save() {
      if (this.$refs.form.validate()) {
        await this.$axios.put('/api/user/' + this.$route.params.user, this.user)
        .then( res => {
          this.successDialog = true;
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    showEditDialog(){
      this.editDialog = true;
    },
  }
}
</script>
