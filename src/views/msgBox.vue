<template>
  <div>
    <label id="msgbox" @click.stop="showMsgbox">点击我显示msgbox</label>
    <p @click="showDataPicker">showDataPicker</p>
  </div>
</template>
<script>
export default {
  name: 'test',
  data(){
    return {
    }
  },
  methods:{
    // showMsgbox(){
    //   this.$msgbox({
    //       title:'温馨提示',
    //       cancel:'取消',
    //       content:'这里是消息弹出内容',
    //       confirm:'确定按钮',
    //       className:'pop-custom'
    //   }).then(()=>{
    //       console.log("我点击了确定按钮")
    //   }).catch((err)=>{
    //     console.log("error");
    //   })
    // },
    showMsgbox(){
      this.$msgbox({
          title:'温馨提示',
          cancel:'取消',
          content:'这里是消息弹出内容',
          confirm:'确定按钮',
          className:'pop-custom',
          // successBtn: this.success,
          // cancelBtn: this.cancel
      })
    },
    success (val) {
      console.log('++++++++++++', val)
    },
    cancel (val) {
      console.log('----------------')
    },
    showDataPicker(){
      this.$dataPicker({
        yearList: [2012, 2013],
        dataChecked: '',
        cancel: this.cancel,
        success: this.success
      })
    }
  }
}
</script>
<style media="screen" lang="scss">
</style>