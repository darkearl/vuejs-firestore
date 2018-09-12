<template>
  <div>
    <div v-for="column in columns" class="col-xs-12 col-md-4" >
      <div class="info-box">
        <span class="info-box-icon bg-aqua"><i class="ion ion-ios-gear-outline"></i></span>
        <div class="info-box-content">
          <span class="info-box-text">{{column.name}}</span>
          <span class="info-box-number">{{column.amount|formatPrice}} <small>VNĐ</small></span>
        </div>
        <!-- /.info-box-content -->
      </div>
      <!-- /.info-box -->
    </div>
  </div>
</template>

<script>
  export default {
    props: ['columns']
  }
</script>

<style>
  .info-box{
    min-height: 50px;
  }
  .info-box-icon{
    height: 55px;
    line-height: 55px;
  }
</style>