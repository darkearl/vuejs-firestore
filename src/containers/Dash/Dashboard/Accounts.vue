<template>
  <div class="box box-info">
    <div class="box-header with-border">
      <h3 class="box-title">Tài khoản</h3>
      <div class="box-tools pull-right">
        <span class="label label-warning">{{total|formatPrice}} <small>VNĐ</small></span>
      </div>
    </div>
    <!-- /.box-header -->
    <div class="box-body">
      <ul class="products-list product-list-in-box">
        <li class="item" v-for="account in data">
          <div>
            <a href="javascript:void(0)" class="product-title">{{account.name}}
              <span class="label label-success pull-right">{{account.amount|formatPrice}} <small>VNĐ</small></span>
            </a>
          </div>
        </li>
        <!-- /.item -->
      </ul>
      <!-- /.row -->
    </div>
    <!-- /.box-body -->
    <div class="box-footer no-padding">

    </div>
    <!-- /.footer -->
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: ['data'],
  computed: {
    total() {
      return _.sumBy(this.data, 'amount')
    }
  }
}
</script>