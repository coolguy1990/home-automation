<template>
  <div>
    <p>Landing Page for Home Automation</p>

    <router-link :to="{ name: 'home'}">Dashboard</router-link>
  </div>
</template>

<script>
  export default {
    name: 'LandingPage',
  }
</script>
