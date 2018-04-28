<template>
  <div style="width:100%;height: 100%;overflow: hidden;">
    <x-header slot="header" :title="this.$route.name" @on-click-back="goBack" :left-options="{preventGoBack: true}"
              style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:#409eff;">
      <a slot="right" style="color:#fff;" @click="showPopupFilter">
        <i class="iconfont icon-sousuo" style="font-size:20px;"></i>
        <small style="vertical-align: top;">筛选</small>
      </a>
    </x-header>
    <!-- 数据总计结果 -->
    <group :gutter="0">
      <cell title="当前未处理报警30条"></cell>
    </group>
    <!-- 数据展示列表 -->
    <div style="height:calc(100% - 39px);overflow-x:hidden;background: #fff;">
      <n-pannel :list="Yj_IndexData" :type="type" @on-click-item="showPopupComment"></n-pannel>
    </div>
    <!-- 详情弹出层 -->
    <p-filter ref="popup" :popupWidth="popupWidth">
      <s-frame slot="Popup" @reset="show" v-if="PopupShow=='comment'" :link="link" :name="name"></s-frame>
      <s-filter slot="Popup" @reset="submitLoad" v-if="PopupShow=='filter'"></s-filter>
    </p-filter>
  </div>
</template>

<script type="es6">
  import {Flexbox, FlexboxItem, Group, Cell, XHeader} from 'vux'
  import {getYjIndexData} from '@/api/api';

  export default {
    components: {
      Group,
      Cell,
      XHeader,
      PFilter: resolve => {
        require(['@/components/popupFilter.vue'], resolve)
      },
      SFrame: resolve => {
        require(['@/views/Frame.vue'], resolve)
      },
      SFilter: resolve => {
        require(['@/views/Popup/Filter.vue'], resolve)
      },
      NPannel: resolve => {
        require(['@/components/newPannel.vue'], resolve)
      }
    },
    data() {
      return {
        PopupShow: "",//判断加载哪个组件
        popupWidth: '100%', //弹出层的宽度设置
        loadingShow: true,
        type: '5',
        Yj_IndexData: [],
        link: "", //frame弹出层要接收的路径
        name: ""
      }
    },
    mounted() {
      if (!sessionStorage.getItem('warn')) {
        this.alert("提示", "试用应用的演示数据，仅供APP体验，试用期间该弹窗可暂时关闭！", "知道了", this.setSession); //使用main中的全局方法调用弹窗
      }
      this.Yj_getIndexData();
    },
    methods: {
      //设置sessionstorage来打开warn弹窗
      setSession() {
        sessionStorage.setItem('warn', 'yes');
      },
      //加载数据
      Yj_getIndexData() {
        //使用api中的getYjIndexData获取首页数据
        let _this = this;
        getYjIndexData("").then((res) => {
          if (res.data) {
            _this.Yj_IndexData = res.data;
          } else {
            _this.confirm("提示", "数据加载出错，请尝试刷新或者联系管理员！", "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
          }
          _this.loadingRemove(); //  使用main中的全局方法关闭loading
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
          _this.loadingRemove(); //  使用main中的全局方法关闭loading
        });
      },
      //  通过postMessage调用iframe父组件的方法
      goBack() {
        let link = parent.window.location.href.split("#");
        window.parent.postMessage('closeLwFrame', link[0]);
      },
      //打开详情
      showPopupComment(item) {
        this.PopupShow = "comment";
        this.popupWidth = "100%";
        this.link = item.link;
        this.name = item.id;
        this.show();
      },
      //打开筛选
      showPopupFilter() {
        this.PopupShow = "filter";
        this.popupWidth = "87%";
        this.show();
      },
      //调用子组件的方法打开详情
      show() {
        this.$refs.popup.show(); //  调用子组件的方法
      },
      //弹出的子组件filter调用的父组件index的方法
      submitLoad() {
        this.show();
        this.getIndexData();
      }
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  img {
    width: 100%;
  }
</style>
