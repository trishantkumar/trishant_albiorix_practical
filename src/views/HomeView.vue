<template>
  <div class="home">
    <UserSection />
  </div>
</template>

<script>
// @ is an alias to /src
import UserSection from '@/components/UserSection.vue'

export default {
  name: 'HomeView',
  components: {
    UserSection
  }
}
</script>
