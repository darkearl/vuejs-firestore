<template>
  
  <div>layout dash1
  <sidebar display-name="sidebar1"  />
      <router-view/>
    </div>
</template>

<script>

import Sidebar from './Sidebar'


export default {
  name: 'Dash',
  components: {
    Sidebar
  }
}
</script>