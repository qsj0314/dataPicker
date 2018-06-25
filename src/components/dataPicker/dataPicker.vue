<template>
  <div class="sj-model">
    <div class="sj-data-picker">
      <div class="sj-data-picker-header">
        <span>取消</span>
        <span>确定{{dataChecked}}</span>
      </div>
      <div class="sj-data-picker-body" ref="dataContent">
        <div class="sj-data-picker-year" ref="year" @touchstart = "touchstart($event, $refs.year, 'year')" @touchmove = "touchmove($event, $refs.year, 'year', yearList)" @touchend = "touchend($event, $refs.year, 'year', yearList)">
          <div class="sj-data-picker-item" v-for="item in yearList" :key="item">{{item}}</div>
        </div>
        <div class="sj-data-picker-month" ref="month"  @touchstart = "touchstart($event, $refs.month, 'month')" @touchmove = "touchmove($event, $refs.month, 'month', monthList)" @touchend = "touchend($event, $refs.month, 'month', monthList)">
          <div class="sj-data-picker-item" v-for="item in monthList" :key="item">{{item}}</div>
        </div>
        <div class="sj-data-picker-day" ref="day"  @touchstart = "touchstart($event, $refs.day, 'day')" @touchmove = "touchmove($event, $refs.day, 'day', dayList)" @touchend = "touchend($event, $refs.day, 'day', dayList)">
          <div class="sj-data-picker-item" v-for="item in dayList" :key="item">{{item}}</div>
        </div>
        <div class="sj-data-picker-selected" ref="selectedContent"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      yearList: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      monthList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      dayList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
                '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      startY: Number,
      distanceY: 120,
      moveY: 0,
      currentIndex: 0,
      minDistance: {},
      maxDistance: 0,
      dataValue: {},
      dataChecked: ''
    };
  },
  mounted () {
    this.$nextTick(function () {
      this.maxDistance = (this.$refs.dataContent.offsetHeight - this.$refs.selectedContent.offsetHeight)/2
      this.minDistance.year = (this.maxDistance + this.$refs.selectedContent.offsetHeight) - this.yearList.length *30
      this.minDistance.month = (this.maxDistance + this.$refs.selectedContent.offsetHeight) - this.monthList.length *30
      this.minDistance.day = (this.maxDistance + this.$refs.selectedContent.offsetHeight) - this.dayList.length *30
    })
    this.dataValue.year  = this.yearList[0]
    this.dataValue.month = this.monthList[0]
    this.dataValue.day = this.dayList[0]
  },
  methods: {
    touchstart (ev, dom, type) {
      ev = ev || event
      if(ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        this.startY = ev.touches[0].clientY;
      }
    },
    touchmove (ev, dom, type, arr) {
      ev = ev || event
      if (ev.touches.length === 1) {
        this.moveY = ev.touches[0].clientY - this.startY;
      }
      // 
      this.resetTranlate();
      // 
      let translateY = this.moveY + this.distanceY
      if ((this.moveY + this.distanceY) > this.maxDistance) {
        translateY = this.maxDistance;
      } else if ((this.moveY + this.distanceY) < this.minDistance[type]) {
        translateY = this.minDistance[type];
      }
      dom.style.transform = 'translateY('+ translateY +'px)'
    },
    touchend (ev, dom, type, arr) {
      this.distanceY = this.distanceY + this.moveY;
      this.distanceY = parseInt(this.distanceY/30)*30;
      this.distanceY = this.distanceY > this.maxDistance ? this.maxDistance : (this.distanceY < this.minDistance[type] ? this.minDistance[type] : this.distanceY);      
      let index = parseInt(this.distanceY/30);
      index = 4 - index;
      this.dataValue[type] = arr[index]
      // 
      this.resetTranlate()
      // 
      this.dataChecked = this.dataValue.year + ' / ' + this.dataValue.month + ' / ' + this.dataValue.day
      dom.style.transform = 'translateY('+ this.distanceY +'px)'
      dom.style.transition = 'all 0.3s'
    },
    resetTranlate () {
      if (this.dataValue.month === '04' || this.dataValue.month === '06' || this.dataValue.month === '09' || this.dataValue.month === '11') {
        if (this.dayList.length === 31) {
          this.dayList.splice(30, 1)
          this.minDistance.day = 150 - (this.dayList.length*30)
          if (this.dataValue.day === '31') { //here
            this.$refs.day.style.transform = 'translateY('+ this.minDistance.day +'px)'
          }
        }
      } else if (this.dataValue.month === '02') {
        let isLeap = this.isLeapYear(this.dataValue.year);
        if (isLeap) {
          if (this.dayList.length === 31) {
            this.dayList.splice(29, 2)
            this.minDistance.day = 150 - (this.dayList.length*30);
            if (this.dataValue.day === '31') { //here
              this.$refs.day.style.transform = 'translateY('+ this.minDistance.day +'px)'
            }
          } else if (this.dayList.length === 30) {
            this.dayList.splice(29, 1)
            this.minDistance.day = 150 - (this.dayList.length*30)
            if (this.dataValue.day === '30') {
              this.$refs.day.style.transform = 'translateY('+ this.minDistance.day +'px)'
            }
          }
        } else {
          if (this.dayList.length === 31) {
            this.dayList.splice(28, 3)
            this.minDistance.day = 150 - (this.dayList.length*30);
            if (this.dataValue.day === '31' || this.dataValue.day === '30' || this.dataValue.day === '29') { //here
              this.$refs.day.style.transform = 'translateY('+ this.minDistance.day +'px)'
            }
          } else if (this.dayList.length === 30) {
            this.dayList.splice(28, 2)
            this.minDistance.day = 150 - (this.dayList.length*30)
            if (this.dataValue.day === '30' || this.dataValue.day === '29') {
              this.$refs.day.style.transform = 'translateY('+ this.minDistance.day +'px)'
            }
          }
        }
      }else {
        this.dayList.length === 30 ? this.dayList.push('31') : ''
        this.dayList.length === 29 ? this.dayList.push(...['30', '31']) : ''
        this.dayList.length === 28 ? this.dayList.push(...['29', '30', '31']) : ''
        this.minDistance.day = 150 - (this.dayList.length*30)
      }
    },
    isLeapYear (yearNum) {
      if (yearNum%4==0&&yearNum%100!=0){
        return true
      }else if (yearNum%400==0){
        return true
      }  
      else{
        return false
      }
    }
  }
};
</script>
<style lang="scss" scoped>
*{
  box-sizing: border-box;
}
.sj-model {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  color: red;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column-reverse;
  .sj-data-picker {
    height: 300px;
    background: #fff;
    box-sizing: border-box;
    .sj-data-picker-header {
      color: blue;
      height: 30px;
      border: 1px solid #eaeaea;
      display: flex;
      span:first-child {
        border-right: 1px solid #eaeaea;
      }
      span {
        flex: 1;
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
    }
    .sj-data-picker-body {
      height: 270px;
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
      .sj-data-picker-item {
        height: 30px;
        text-align: center;
      }
      .sj-data-picker-year,
      .sj-data-picker-month,
      .sj-data-picker-day {
        flex: 1;
        transform: translateY(120px);
        z-index: 99;
      }
      .sj-data-picker-selected {
        height: 30px;
        width: 100%;
        position: absolute;
        border: 1px solid #91030d;
        border-left: none;
        border-right: none;
        align-self: center;
        justify-content: center;
      }
    }
  }
}
</style>

