<style lang="less">
.search-filter {
  padding: 0px 10px 20px 0;
}
.search-daterange {
  display: flex;
}

@media (max-width: 550px) {
  .search-daterange {
    flex-direction: column;
  }
}
</style>
<template>
  <div class="frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">全站发言</span>
      <div class="middle-right text-gray" style="right: 25px;">全站最近的10条弹幕</div>
    </div>
    <div class="h-panel-bar">
      <div>
        <Search v-model="params.keyword" placeholder="请输入水友ID" @search="getData()" showSearchButton>
          <i class="h-icon-search"></i>
        </Search>
      </div>
    </div>
    <div class="h-panel-body">
      <div>
        <BarrageRecent
          v-for="(b, index) of barrages"
          :key="index"
          :roomName="b.anchorName"
          :sendTime="b.time"
          :content="b.txt"
          :loading="loading"
        ></BarrageRecent>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      barrages: [],
      loading: true,
      params: {
        keyword: null
      }
    };
  },
  methods: {
    getData() {
      this.loading = true;
      R.Recent.get(this.params)
        .then(resp => {
          let respJson = JSON.parse(resp.data);
          if (respJson.msg == '成功' && respJson.data && respJson.data.danmuVoList) {
            this.barrages = respJson.data.danmuVoList;
          }
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
