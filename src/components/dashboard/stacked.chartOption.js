function genFormatter(series) {
  return param => {
    let sum = 0;
    series.forEach(item => {
      sum += item.data[param.dataIndex];
    });
    return sum;
  };
}

const getStackedOption = function(data) {
  return {
    title: {
      text: '堆叠区域图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['普通用户', '粉丝团用户', '贵族用户']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        // boundaryGap: false,
        data: Utils.getKeyValue(data, 'xAxis.data') || []
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: data.series.map((item, index) =>
      Object.assign(item, {
        type: 'bar',
        stack: true,
        // stack: '总量',
        label: {
          show: index == data.series.length - 1 ? true : false,
          formatter: genFormatter(data.series),
          fontSize: 16,
          color: 'black',
          position: 'top'
        }
      })
    )
  };
};

export default getStackedOption;
