<template>
    <datepicker input-class="form-control pull-right"  :name="name" format="dd/MM/yyyy" v-model="content" @input="handleInput()" :highlighted="state.highlighted" :language="i18n" monday-first ></datepicker>
</template>

<script>
    import moment from 'moment'
    import datepicker from 'vuejs-datepicker'
    import {vi} from 'vuejs-datepicker/dist/locale'
    export default {
        components:{
            datepicker
        },
        props: [ 'name','value' ],
        data() {
            return {
              content: this.value,
              state: {
                  highlighted: {
                    //days: [6, 0], // Highlight Saturday's and Sunday's
                    daysOfMonth: [5,15], // Highlight 5th and 15th of each month
                  }
              },
              i18n: vi
            }
        },
        watch: {
            value: function(newVal, oldVal) { // watch it
              this.content = newVal
            }
        },
        methods:{
            handleInput () {
              this.$emit('input', this.content)
            }

        }
    }
</script>

<style >
    .vdp-datepicker__calendar .cell.weekend{
        background:  #fff;
        font-weight: bold;
    }
    .vdp-datepicker__calendar .cell.highlighted{
        background: #fff;
        font-weight: bold;
        color: #ff0000;
    }
</style>