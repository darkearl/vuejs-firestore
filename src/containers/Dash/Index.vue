<template>
  <div :class="['wrapper', classes]">
    <header class="main-header">
      <span class="logo-mini">
    		<a href="/"><img src="/static/img/copilot-logo-white.svg" alt="Logo" class="img-responsive center-block logo"></a>
    	</span>
    	<!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">

            <!-- User Account Menu -->
            <li class="dropdown user user-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <!-- The user image in the navbar-->
                <img src="/static/img/logo.png" class="user-image" >
                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                <span class="hidden-xs">hi</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <sidebar />
     <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper" style="min-height: 684px;">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          {{$route.name.toUpperCase() }}
          <small>{{ $route.meta.description }}</small>
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="javascript:;">
              <i class="fa fa-home"></i>Home</a>
          </li>
          <li class="active">{{$route.name.toUpperCase()}}</li>
        </ol>
      </section>
      <section class="content">
        <router-view/>
      </section>
    </div>
    <!-- /.content-wrapper -->
    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; {{year}}
        <a href="javascript:;">ttrung.david</a>.</strong> All rights reserved.
    </footer>
  </div>
</template>

<script>

import Sidebar from './Sidebar'

export default {
  name: 'Dash',
  components: {
    Sidebar
  },
  data() {
    return {
      year: new Date().getFullYear(),
      classes: {
        fixed_layout: true,
        hide_logo: true
      }
    }
  },
  beforeMount(){
    this.init()
  },
  methods: {
    init(){
      this.$store.dispatch('groups/init');
      this.$store.dispatch('tags/init');
      this.$store.dispatch('accounts/init');
    }
  }
}
</script>