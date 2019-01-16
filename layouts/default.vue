<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          v-show="item.visible"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
    <v-toolbar app fixed :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <h3 v-show = "$auth.loggedIn" v-text="$auth.loggedIn ? $auth.user.name+'님, 안녕하세요?' : '' "></h3>
      <v-toolbar-items>
        <v-btn flat v-show = "$auth.loggedIn" @click="toEdit($auth)">Settings</v-btn>
        <v-btn flat v-show = "!$auth.loggedIn" @click="signIn">Sign In</v-btn>
        <v-btn flat v-show = "$auth.loggedIn" @click="signOut">Sign Out</v-btn>
        <v-btn flat v-show = "!$auth.loggedIn" @click="showRegisterDialog">Register</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
        <v-layout row justify-center>
          <v-dialog v-model="loginDialog" persistent max-width="400px">
            <v-card>
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                <v-container grid-list-md>
                  <v-card-title class="title font-weight-regular justify-space-between">
                    <span>Sign in</span>
                    <v-btn large icon>
                      <v-icon large @click="loginDialog = false" item-right>close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field v-model="loginID" label="ID" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="loginPassword" label="Password" type="password" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn block color="primary" @click="login">Sign in</v-btn>
                    </v-flex>
                    <v-flex xs12>
                       <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12>
                       <v-btn block color="primary" @click="showRegisterDialog">Register</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-layout>
        <v-layout row justify-center>
          <v-dialog v-model="registerDialog" persistent max-width="600px">
            <v-card>
              <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                <v-container grid-list-md>
                <v-card-title class="title font-weight-regular justify-space-between">
                  <span>Sign Up</span>
                  <v-btn large icon>
                    <v-icon large @click="registerDialog = false" item-right>close</v-icon>
                  </v-btn>
                </v-card-title>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field label="ID*" v-model="id" required/>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="name*" v-model="name" required/>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="Email*" v-model="email" required/>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="password" :append-icon="show_password ? 'visibility_off' : 'visibility'"
                        :rules="[rules.more_than_8]" :type="show_password ? 'text' : 'password'"
                        label="Password*" hint="at least 8 characters" counter
                        @click:append="show_password = !show_password">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="password2" :append-icon="show_password ? 'visibility_off' : 'visibility'"
                        :rules="[rules.same_password]" :type="show_password ? 'text' : 'password'"
                        label="Password confirmation*" hint="need to be matched" counter
                        @click:append="show_password = !show_password">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-select
                        v-model="role"
                        :items="['student', 'teacher', 'institute', 'developer', 'operator']"
                        label="Role*"
                        required
                      ></v-select>
                    </v-flex>
                    <v-flex xs12>
                        <small>*indicates required field</small>
                       <v-btn block color="primary" @click="register">Register for CoalaSoftware</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() + ' Coala Software Co., Ltd. All rights reserved.' }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        registerDialog : false,
        loginDialog : false,
        drawer: false,
        clipped: true,
        miniVariant: false,
        title: 'Coala Software',
        valid: true,
        loginID: '',
        loginPassword: '',
        id: '',
        name: '',
        password: '',
        password2: '',
        email: '',
        role: '',
        rules: {
          required: value => !!value || 'Required',
          more_than_8: value => value.length >= 8 || 'More than 8 characters',
          same_password: value => value === this.password || 'Password mismatched'
        },
        show_password: false
      }
    },
    computed: {
      items: function(){
        return [
          { icon: 'home', title: 'Home', to: '/main' , visible: true },
          { icon: 'apps', title: 'Main' , to: '/' , visible: this.$auth.loggedIn },
          { icon: 'face', title: 'My Page', to: '/me' , visible: this.$auth.loggedIn },
        ];
      }
    },
    methods: {
      signIn(){
        this.loginDialog = true;
      },
      signOut(){
        if (this.$auth.loggedIn){
          this.$auth.logout();
        }
      },
      showRegisterDialog(){
        if(this.loginDialog){
          this.loginDialog = false;
        }
        this.registerDialog = true;
      },
      async register(){
        if (this.$refs.registerForm.validate()) {
          await this.$axios.post('api/auth/register', {
            id: this.id,
            password: this.password,
            name: this.name,
            role: this.role,
            email: this.email
          })
          .then( res => {
            this.id = ''
            this.name = ''
            this.password = ''
            this.password2 = ''
            this.email = ''
            this.role = ''
            this.registerDialog = false;
            this.loginDialog = true;
          })
          .catch(err => {
            this.$refs.registerForm.reset()
            this.id = ''
            this.name = ''
            this.password = ''
            this.password2 = ''
            this.email = ''
            this.role = ''
            console.log(err)
          })
        }
      },
      async login(){
        if (this.$refs.loginForm.validate()) {
          await this.$auth.loginWith('local', {
            data: { id: this.loginID, password: this.loginPassword }
          })
          .then( res => {
            this.loginDialog = false;
            this.loginID = ''
            this.loginPassword = ''
            this.$router.push({ name: 'me' })
          })
          .catch(e => {
            console.log(e)
            this.$refs.loginForm.reset()
            this.loginID = ''
            this.loginPassword = ''
          })
        }
      },
      toEdit(auth){
        this.$router.push('/' + auth.user.role + 's/' + auth.user.name +'/about')
      }
    }
  }
</script>
