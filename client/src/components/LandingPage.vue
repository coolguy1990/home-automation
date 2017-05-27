<template>
  <div>
    <p>Landing Page for Home Automation</p>

    <router-link :to="{ name: 'home'}">Dashboard</router-link>
  </div>
</template>

<script>
  import Socket from '@/utils/Sockets'

  export default {
    name: 'LandingPage',
    created () {
      Socket.on('message', function (data) {
        console.warn(data)
      })
    },
  }
</script>
