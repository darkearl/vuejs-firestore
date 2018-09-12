<template>
  <div id="app" >
    <router-view/>
    <notifications group="alert" position="top center" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>