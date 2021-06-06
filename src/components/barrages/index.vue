<style lang="less"></style>
<template>
  <div class="frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">历史弹幕</span>
      <div class="middle-right text-gray" style="right: 25px;">本房间历史弹幕</div>
    </div>
    <div class="h-panel-bar">
      <Form ref="form">
        <FormItem :required="true" :show-label="false">
          <div class="h-input-group">
            <FormItem prop="dateRange.from" label="开始日期" :show-label="false">
              <DatePicker v-model="params.dateRange.from" placeholder="开始日期" type="datehour"></DatePicker>
            </FormItem>
            <span class="h-input-addon">-</span>
            <FormItem prop="dateRange.to" label="结束日期" :show-label="false">
              <DatePicker v-model="params.dateRange.to" placeholder="结束日期" type="datehour"></DatePicker>
            </FormItem>
            <div class="h-input-addon">
              <Select v-model="params.sort" :datas="dicts.sort" :no-border="true" :null-option="false"></Select>
            </div>
          </div>
        </FormItem>
        <FormItem :required="true" :show-label="false">
          <div class="h-input-group">
            <div class="h-input-addon">
              <Select v-model="params.mode" :datas="dicts.mode" :no-border="true" :null-option="false"></Select>
            </div>
            <Search v-model="params.keyword" :placeholder="placeholder" @search="getData(true)" showSearchButton
              ><i class="h-icon-search"></i
            ></Search>
          </div>
        </FormItem>
      </Form>
    </div>
    <div class="h-panel-body">
      <div>
        <Barrage
          v-for="(b, index) of pageData"
          :key="index"
          :avatar="b.chatmsg.ic"
          :userid="b.userid"
          :nickname="b.nickname"
          :level="b.chatmsg.level"
          :fansMedal="b.chatmsg.bnn"
          :fansLevel="b.chatmsg.bl"
          :sendTime="b.time"
          :content="b.chatmsg.txt"
          :loading="loading"
        ></Barrage>
      </div>
      <Pagination v-if="pagination.total > 0" align="right" v-model="pagination" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dicts: {
        sort: [
          { key: 'DESC', title: '倒序' },
          { key: 'ASC', title: '正序' }
        ],
        mode: [
          { key: 0, title: '用户名', placeholder: '水友ID' },
          { key: 1, title: '弹幕内容', placeholder: '关键词' }
        ]
      },
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      barrages: [],
      loading: true,
      params: {
        keyword: null,
        mode: 0,
        sort: 'DESC',
        dateRange: {
          from: null,
          to: null
        }
      }
    };
  },
  methods: {
    getData(reload = false) {
      this.loading = true;
      R.Barrages.get(this.params)
        .then(resp => {
          let { barrages, messages } = resp;
          if (barrages) {
            this.barrages = barrages;
            this.pagination.total = barrages.length;
            if (reload) {
              this.pagination.page = 1;
            }
          }
          if (messages) {
            messages.forEach(this.$Message);
          }
        })
        .finally(() => (this.loading = false));
    }
  },
  computed: {
    pageData: function() {
      let offset = (this.pagination.page - 1) * this.pagination.size;
      let pageData =
        offset + this.pagination.size >= this.barrages.length
          ? this.barrages.slice(offset, this.barrages.length)
          : this.barrages.slice(offset, offset + this.pagination.size);
      return pageData;
    },
    placeholder: function() {
      return this.dicts.mode.find(x => x.key === this.params.mode).placeholder || '';
    }
  }
};
</script>
