<template>
  <aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar user panel (optional) -->
      <!--
      <div class="user-panel">
        <div class="pull-left image">
          <img src="/static/img/logo.png" />
        </div>
        <div class="pull-left info">
          <div>
            <p class="white">{{ displayName }}</p>
          </div>
          <a href="javascript:;">
            <i class="fa fa-circle text-success"></i> Online
          </a>
        </div>
      </div>
      -->
        <!-- MAIN MENU -->
        <ul class="sidebar-menu">
          <li class="header">MAIN NAVIGATION</li>
          <router-link tag="li" class="pageLink" to="/">
            <a>
              <i class="fa fa-desktop"></i>
              <span class="page">Dashboard</span>
            </a>
          </router-link>
          <router-link tag="li" class="pageLink" to="/events">
            <a>
              <i class="fa fa-calendar text-yellow"></i>
              <span class="page">Sự kiện</span>
            </a>
          </router-link>
          <router-link tag="li" class="pageLink" to="/tags">
            <a>
              <i class="fa fa-tags text-aqua"></i>
              <span class="page">Danh mục</span>
            </a>
          </router-link>
          <router-link tag="li" class="pageLink" to="/accounts">
            <a>
              <i class="fa fa-credit-card text-green"></i>
              <span class="page">Tài khoản</span>
            </a>
          </router-link>
          <!--<router-link tag="li" class="pageLink" to="/setting">-->
          <!--  <a>-->
          <!--    <i class="fa fa-credit-card"></i>-->
          <!--    <span class="page">Cài đặt</span>-->
          <!--  </a>-->
          <!--</router-link>-->
        </ul>

    </section>
    <!-- /.sidebar -->
  </aside>
</template>
<script>

export default {
  name: 'Sidebar',
  props: ['displayName', 'pictureUrl'],
}
</script>

<style>
/* override default */
.sidebar-menu > li > a {
  padding: 12px 15px 12px 15px;
}
.sidebar-menu li.active > a > .fa-angle-left,
.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}
.treeview-title {
  z-index: 1;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-90deg);
  }
}
</style>