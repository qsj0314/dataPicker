import Vue from 'vue'
import dataPickerComponent from './dataPicker'
let instance = null;
let dataPicker = (options = {}) => {
  //如果这个实例被创建了就不需要被创建第二次
  let dataPickerConstructor = Vue.extend( dataPickerComponent )
  if (!instance) {
    instance = new dataPickerConstructor ({
      el: document.createElement('div')
    })
  }
  document.body.appendChild(instance.$el);
  Object.assign(instance.$data, options);
  instance.show = true;
  let cancel = options.cancel;
  instance.cancel = () => {
      instance.show = false;
      cancel()
  }
  let success = options.success;
  instance.success = (val) => {
      instance.show = false;
      success(val)
  }
}
export default function (Vue) {
  Vue.prototype.$dataPicker = dataPicker
}