<template>
  <div style="height: 100%;">
    <div style="height:calc(100% - 42px);overflow-x: hidden;">
      <group title="单位选择">
        <!-- 弹出联动单位选择 -->
        <!-- 底部弹出picker -->
        <popup-picker :title="title4" :data="list3" :columns="3" v-model="value4" show-name @on-show="pickerShow"
                      @on-hide="pickerHide" :popup-style="popupStyle"></popup-picker>
      </group>
      <group title="设备选择">
        <!-- 弹出联动设备选择 -->
        <popup-picker :title="deviceTitle" :data="list3" :columns="3" v-model="value4" show-name @on-show="pickerShow"
                      @on-hide="pickerHide" :popup-style="popupStyle"></popup-picker>
      </group>
      <!-- 选择组 -->
      <group :title="clooerType1.title">
        <checker
          v-model="clooerType1.selected"
          type="checkbox"
          default-item-class="demo5-item"
          selected-item-class="demo5-item-selected" style="margin-top:10px;display: flex;"
        >
          <checker-item v-for="data in clooerType1.data" :value="data.id" style="margin-bottom:10px;">{{data.title}}
          </checker-item>
        </checker>
      </group>
      <group :title="clooerType2.title">
        <checker
          v-model="clooerType2.selected"
          type="checkbox"
          default-item-class="demo5-item"
          selected-item-class="demo5-item-selected" style="margin-top:10px;display: flex;"
        >
          <checker-item v-for="data in clooerType2.data" :value="data.id" style="margin-bottom:10px;">{{data.title}}
          </checker-item>
        </checker>
      </group>
      <group :title="clooerType3.title">
        <checker
          v-model="clooerType3.selected"
          type="radio"
          radio-required
          default-item-class="demo5-item"
          selected-item-class="demo5-item-selected" style="margin-top:10px;display: flex;"
        >
          <checker-item v-for="data in clooerType3.data" :value="data.id" style="margin-bottom:10px;">{{data.title}}
          </checker-item>
        </checker>
      </group>
      <!-- 开始日期 -->
      <group :title="calendarGroupTitle">
        <calendar v-model="calendarStar" :title="calendarStarTitle" @on-show="pickerShow" @on-hide="pickerHide"
                  disable-future></calendar>
      </group>
      <!-- 结束日期 -->
      <group>
        <calendar v-model="calendarEnd" :title="calendarEndTitle" @on-show="pickerShow" @on-hide="pickerHide"
                  disable-future></calendar>
      </group>
    </div>
    <!-- 底部button -->
    <flexbox :gutter="0">
      <flexbox-item>
        <x-button @click.native="reset">重置</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button :gradients="['#409eff', '#409eff']" @click.native="submit">确定</x-button>
      </flexbox-item>
    </flexbox>
    <!-- 假遮罩 -->
    <div v-transfer-dom>
      <div v-show="show1"
           style="background: rgba(0,0,0,.5);position:fixed;top:0;left:0;width:100%;height:100%;z-index:503;">
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {
    TransferDom,
    Group,
    XInput,
    XButton,
    Flexbox,
    FlexboxItem,
    Checker,
    CheckerItem,
    PopupPicker,
    XSwitch,
    Calendar
  } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Group, XInput, XButton, Flexbox, FlexboxItem, Checker, CheckerItem, PopupPicker, XSwitch, Calendar
    },
    data() {
      return {
        search: '',
        popupStyle: {
          'z-index': '504'
        },
        show1: false,
        title4: '单位',
        list3: [{
          name: '中国',
          value: 'china',
          parent: 0
        }, {
          name: '美国',
          value: 'USA',
          parent: 0
        }, {
          name: '广东',
          value: 'china001',
          parent: 'china'
        }, {
          name: '广西',
          value: 'china002',
          parent: 'china'
        }, {
          name: '美国001',
          value: 'usa001',
          parent: 'USA'
        }, {
          name: '美国002',
          value: 'usa002',
          parent: 'USA'
        }, {
          name: '广州',
          value: 'gz',
          parent: 'china001'
        }, {
          name: '深圳',
          value: 'sz',
          parent: 'china001'
        }, {
          name: '广西001',
          value: 'gx001',
          parent: 'china002'
        }, {
          name: '广西002',
          value: 'gx002',
          parent: 'china002'
        }, {
          name: '美国001_001',
          value: '0003',
          parent: 'usa001'
        }, {
          name: '美国001_002',
          value: '0004',
          parent: 'usa001'
        }, {
          name: '美国002_001',
          value: '0005',
          parent: 'usa002'
        }, {
          name: '美国002_002',
          value: '0006',
          parent: 'usa002'
        }],
        value4: [],
        // 状态部分数据
        clooerType1: "",
        clooerType2: "",
        clooerType3: "",
        //  所有单位部分
        deviceTitle: "设备",
        calendarStar: 'TODAY',
        calendarEnd: 'TODAY',
        calendarGroupTitle: "预警日期范围选择",
        calendarStarTitle: "开始日期",
        calendarEndTitle: "结束日期",
      }
    },
    mounted() {
      this.filterCondition();
    },
    methods: {
      //筛选数据加载
      filterCondition() {
        this.clooerType1 = {
          title: '预警类型',
          selected: ['11', "112", "211", "212"],
          data: [
            {id: '11', title: '高温'},
            {id: '112', title: '低温'},
            {id: '211', title: '断电'},
            {id: '212', title: '其他'}
          ]
        };
        this.clooerType2 = {
          title: '预警级别',
          selected: ['1111', "1122", "2111"],
          data: [
            {id: '1111', title: '一级'},
            {id: '1122', title: '二级'},
            {id: '2111', title: '三级'}
          ]
        }
        this.clooerType3 = {
          title: '预警状态',
          selected: '1011',
          data: [
            {id: '1011', title: '未处理'},
            {id: '1022', title: '已处理'}
          ]
        }
      },
      //确认
      submit() {
        this.$emit('reset'); //  调用父组件的方法
        this.show1 = false;
      },
      //重置方法
      reset() {
        this.filterCondition();
        this.search = "";
        this.value4 = [];
      },
      // 单位选择弹出时打开假的遮罩层
      pickerShow() {
        this.show1 = true;
      },
      //单位选择关闭时关闭假的遮罩层
      pickerHide() {
        this.show1 = false;
      }
    }
  }
</script>

<style scoped>
  .demo5-item {
    width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    flex: 1;
    margin: 0 8px;
    font-size: 12px;
  }

  .demo5-item-selected {
    background: #ffffff url(../../assets/checker-active.png) no-repeat right bottom;
    border-color: #ff4a00;
  }
</style>
<style>
  .vux-popup-dialog.vux-popup-bottom.vux-popup-show {
    z-index: 505;
  }
</style>
