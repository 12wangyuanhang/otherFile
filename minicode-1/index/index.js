var wxCharts = require('../path/wxcharts-min');
var lineChart = null;
Page({
  data:{
    textcolor1:'#014f8e',
    textcolor2:'#bfbfbf',
  },
  onLoad:function(){
    //下面是图表一显示的数据，只需替换掉数据折现就会发生变化实现动态生成
    var x_data=["12-05", "12-06", "12-07", "12-08", "12-09", "12-10", "12-11", "12-12", "12-13", "12-14", "12-15", "12-16", "12-17", "12-18", "12-19"]
    var y_data= ["2710778.83", "3701004.17", "1959107.37", "1875401.10", "1844007.76", "1927753.07", "2214439.68", "2501855.64", "2348521.30", "1815527.72", "1938038.04", "1911152.88", "2062097.59", "2397674.45", "2796167.86"]
    //绘制折线图
    this.OnWxChart(x_data,y_data,'图表一')
  },
  //更换折线图数据为图表一数据
  canvas1_click:function(){
    this.setData({
      textcolor1:'#014f8e',
      textcolor2:'#bfbfbf',
    })  
    var x_data=["12-05", "12-06", "12-07", "12-08", "12-09", "12-10", "12-11", "12-12", "12-13", "12-14", "12-15", "12-16", "12-17", "12-18", "12-19"]
    var y_data= ["2710778.83", "3701004.17", "1959107.37", "1875401.10", "1844007.76", "1927753.07", "2214439.68", "2501855.64", "2348521.30", "1815527.72", "1938038.04", "1911152.88", "2062097.59", "2397674.45", "2796167.86"]
    //绘制折线图
    this.OnWxChart(x_data,y_data,'图表一')
  },
  //更换折线图数据为图表二数据
  canvas2_click:function(){
    this.setData({
      textcolor1:'#bfbfbf',
      textcolor2:'#014f8e',
    })
    var x_data=["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    var y_data= ["113", "620", "332", "540", "580", "580", "603", "100", "605"]
    //绘制折线图
    this.OnWxChart(x_data,y_data,'图表二')
  },
  //图表点击事件
  touchcanvas:function(e){
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  //折线图绘制方法
  OnWxChart:function(x_data,y_data,name){
    var windowWidth = '', windowHeight='';    //定义宽高
    try {
      var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690;   //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 550    //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!');   //如果获取失败
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',     //输入wxml中canvas的id
      type: 'line',     
      categories:x_data,    //模拟的x轴横坐标参数
      animation: true,  //是否开启动画
     
      series: [{
        name: name,
        data: y_data,
        format: function (val, name) {
          return val + '元';
        }
      }
      ],
      xAxis: {   //是否隐藏x轴分割线
        disableGrid: true,
      },
      yAxis: {      //y轴数据
        title: '',  //标题
        format: function (val) {  //返回数值
          return val.toFixed(2);
        },
        min: 400000.00,   //最小值
        gridColor: '#D8D8D8',
      },
      width: windowWidth*1.1,  //图表展示内容宽度
      height: windowHeight,  //图表展示内容高度
      dataLabel: false,  //是否在图表上直接显示数据
      dataPointShape: true, //是否在图标上显示数据点标志
      extra: {
        lineStyle: 'Broken'  //曲线
      },
    });
  }
})