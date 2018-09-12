<template>
    <Datetime
      input-class="form-control pull-right"
      :hidden-name="name"
      :format="format"
      v-model="content"
      @input="handleInput()"
      value-zone="Asia/Ho_Chi_Minh" >
    </Datetime>
</template>

<script>
    import { Datetime } from 'vue-datetime';
    import 'vue-datetime/dist/vue-datetime.css'
    import { Settings } from 'luxon'
    Settings.defaultLocale = 'vi'
    export default {
        components:{
            Datetime
        },
        props: [ 'name','value' ],
        data() {
            return {
              content:'',
              format: 'dd/LL/yyyy', //https://moment.github.io/luxon/docs/manual/formatting.html#formatting-with-tokens--strings-for-cthulhu-
            }
        },
        created() {
            this.content = this.$options.filters.getIsoString(this.value)
        },
        methods:{
            handleInput () {
              this.$emit('input', this.content)
            }
        }
    }
</script>

<style >
.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #3c8dbc;
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #3c8dbc;
}
</style>