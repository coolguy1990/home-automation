<template>
  <v-container fluid class="pa-0">
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <div class="text-xs-center">
          <v-card class="elevation-0">
            <v-card-text>
              <div>
                <v-btn small primary light @click.native.stop="testing">Small Button</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Socket from '@/utils/Sockets';

  export default {
    name: 'Button',
    data () {
      return {
        clicked: false,
      };
    },
    mounted () {
      Socket.on('module', this.module);
    },
    methods: {
      testing (event) {
        Socket.emit('button-clicked', this.clicked = !this.clicked);
      },
      module (room) {
        console.log(room);
      },
    },
  };
</script>
