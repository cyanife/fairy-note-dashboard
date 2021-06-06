const colorArray = [
  {
    top: '#f1556c', //红
    // bottom: 'rgba(11,42,84,.3)'
    bottom: 'white'
  },
  {
    // top: '#ffa800', //黄
    top: '#f9bc0b', //黄
    // bottom: 'rgba(11,42,84,.3)'
    bottom: 'white'
  },
  {
    top: '#0acf97', //绿
    // bottom: 'rgba(11,42,84, 0.3)'
    bottom: 'white'
  },
  {
    top: '#3788ee', //蓝
    // bottom: 'rgba(11,42,84,.3)'
    bottom: 'white'
  },
  {
    top: '#2d7bf4', //深蓝
    // bottom: 'rgba(11,42,84,.3)'
    bottom: 'white'
  }
];
const getRankingOption = function(data) {
  return {
    // backgroundColor: '#0E2A43',
    tooltip: {
      show: true,
      formatter: '{b}:{c}'
    },
    xAxis: {
      type: 'value',
      show: false,
      position: 'top',
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#fff'
        }
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      splitLine: {
        //网格线
        show: false
      },
      axisLabel: {
        interval: 0, //显示所有标签
        rich: {
          red: {
            color: '#fff',
            backgroundColor: '#f1556c',
            width: 30,
            height: 30,
            align: 'center',
            borderRadius: 2
          },
          blue: {
            color: '#fff',
            backgroundColor: '#3788ee',
            width: 25,
            height: 25,
            align: 'center',
            borderRadius: 2
          }
        },
        formatter: function(params) {
          if (parseInt(params) < 2) {
            return ['{red|' + parseInt(params) + '}'].join('\n');
          } else {
            return ['{blue|' + parseInt(params) + '}'].join('\n');
          }
        }
      },
      inverse: 'true', //排序
      axisLine: {
        show: false
      },
      data: ['1', '2', '3', '4', '5']
    },
    series: [
      {
        name: 'ranking',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: [0, '-40%'],
            rich: {
              red: {
                fontSize: 20,
                backgroundColor: '#f1556c',
                color: '#fff',
                borderRadius: 15,
                padding: 5,
                shadowBlur: 5,
                shadowColor: '#336699',
                shadowOffsetX: 6,
                shadowOffsetY: 6
              },
              blue: {
                fontSize: 18,
                backgroundColor: '#3788ee',
                color: '#fff',
                borderRadius: 15,
                padding: 5,
                shadowBlur: 5,
                shadowColor: '#336699',
                shadowOffsetX: 6,
                shadowOffsetY: 6
              }
            },
            formatter: function(params) {
              if (parseInt(params.dataIndex) < 1) {
                return '{red|@' + params.name + '}';
              } else {
                return '{blue|@' + params.name + '}';
              }
            }
          },
          emphasis: {
            show: true,
            position: 'inside',
            formatter: '{c}条',
            fontSize: 18
          }
        },
        itemStyle: {
          normal: {
            show: true,
            color: function(params) {
              let num = colorArray.length;
              return {
                type: 'linear',
                colorStops: [
                  {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  },
                  {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  },
                  {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  },
                  {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  },
                  {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  },
                  {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  },
                  {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  },
                  {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  },
                  {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  },
                  {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  },
                  {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  },
                  {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }
                ],
                globalCoord: false
              };
            },
            barBorderRadius: 70,
            borderWidth: 0,
            borderColor: '#333'
          }
        },
        barCategoryGap: '50%',
        data: Utils.getKeyValue(data, 'series[0].data').sort((a, b) => b.value - a.value)
      }
    ]
  };
};

export default getRankingOption;
