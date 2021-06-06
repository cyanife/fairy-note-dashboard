const getTrendOption = function(data) {
  return {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['弹幕数量']
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Utils.getKeyValue(data, 'xAxis.data') || []
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: [
      {
        name: '弹幕数量',
        type: 'line',
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        },
        smooth: true,
        markLine: {
          data: [{ type: 'average', name: '平均值' }]
        },
        data: data.series[0].data || []
      }
    ]
  };
};

export default getTrendOption;
