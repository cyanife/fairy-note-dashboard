<style lang="less">
.app-home-vue {
  .home-part-body {
    height: 600px;
    .echarts-vue {
      height: 600px;
    }
  }

  .progress-div {
    > p {
      padding: 8px 0;
    }
    .h-progress {
      &-title {
        color: @dark2-color;
        font-size: 15px;
      }
      &-text {
        width: 40px;
      }
    }
  }
}
</style>
<template>
  <div class="app-home-vue frame-page">
    <Row :space="30">
      <Cell :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <div class="h-panel">
          <div class="relative">
            <Tabs class="common-panel-tabs" v-model="type" :datas="{ type1: '弹幕数量', type2: '用户分布' }"></Tabs>
            <div class="middle-right" style="right: 25px;">
              <!-- <span class="text-hover" @click="openMore">查看更多</span> -->
              <span class="text-hover">过去一周</span>
            </div>
          </div>
          <div class="home-part-body">
            <Chart :options="trendOption" v-if="type == 'type1'" key="type1"></Chart>
            <Chart :options="stackedOption" v-if="type == 'type2'" key="type2"></Chart>
          </div>
        </div>
        <Loading text="加载中" :loading="loading"></Loading>
      </Cell>
      <Cell :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">发言之星</div>
            <div class="middle-right" style="right: 25px;">过去24小时</div>
          </div>
          <div class="home-part-body">
            <Chart :options="rankingOption"></Chart>
          </div>
        </div>
      </Cell>
    </Row>
  </div>
</template>
<script>
import getTrendOption from './trend.chartOption';
import getStackedOption from './stacked.chartOption';
import getRankingOption from './ranking.chartOption';

export default {
  data() {
    return {
      trendOption: {},
      stackedOption: {},
      rankingOption: {},
      // trendData: null,
      // stackedData: null,
      // rankingData: null,
      type: 'type1',
      loading: false
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   R.Dashboard.get()
  //     .then(resp => {
  //       next(vm => vm.setData(resp.body));
  //     })
  //     .catch(err => next(vm => vm.showError(err)));
  // },
  // beforeRouteUpdate(to, from, next) {
  //   R.Dashboard.get()
  //     .then(resp => {
  //       this.setData(resp.body);
  //       next();
  //     })
  //     .catch(err => {
  //       this.showError(err);
  //       next();
  //     });
  // },
  created() {
    this.fetchData();
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    openMore() {
      this.$router.push({ name: 'Chart' });
    },
    fetchData() {
      this.loading = true;
      R.Dashboard.get()
        .then(resp => {
          this.setData(resp);
        })
        .catch(err => {
          this.showError(err);
        })
        .finally(() => (this.loading = false));
    },
    setData(data) {
      if (data.trendData) {
        // this.trendOption.xAxis.data = data.trendData.xAxis;
        // this.trendOption.series.data = data.trendData.data;
        // this.trendOption.timestamp = data.trendData.timestamp;
        this.trendOption = getTrendOption(data.trendData);
      }
      if (data.stackedData) {
        this.stackedOption = getStackedOption(data.stackedData);
      }
      if (data.rankingData) {
        this.rankingOption = getRankingOption(data.rankingData);
      }
    },
    showError(err) {
      this.$Message['error'](err.message);
    }
  }
};
</script>
