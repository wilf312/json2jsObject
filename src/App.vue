<template>
  <v-app>
    <v-toolbar
      app
    >
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <Content/>
    </v-content>
  </v-app>
</template>

<script>
import Content from './components/Content'

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      rightDrawer: false,
      title: 'JSON 2 JS Object'
    }
  },
  name: 'App',
  components: {
    Content
  }
}
</script>

<style>

  #app {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  textarea {
    min-height: 70vh;
  }
</style>