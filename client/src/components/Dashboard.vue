<template>
  <v-app id="example-2">
    <v-navigation-drawer persistent light :mini-variant.sync="mini" v-model="drawer">
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/lego/4.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Admin</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="indigo darken-4">
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Sidebar</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <div class="title"></div>
        <button-comp></button-comp>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import Button from './Button.vue';

  export default {
    name: 'Dashboard',
    components: {
      'button-comp': Button,
    },
    data () {
      return {
        drawer: true,
        items: [
          {
            title: 'Home',
            icon: 'dashboard',
          },
          {
            title: 'About',
            icon: 'question_answer',
          },
        ],
        mini: false,
        right: null,
      };
    },
  };
</script>
