<style scoped lang="less">
.barrage-vue {
  padding: 20px 0;
  margin: 0 10px;

  .barrage-header {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
  }

  .barrage-button-container::after {
    content: '';
    width: 0;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }

  .barrage-copy-button {
    vertical-align: middle;
  }

  &:first-of-type {
    padding-top: 0;
  }

  + .barrage-vue {
    border-top: @border;
  }
}
</style>
<template>
  <div class="barrage-vue">
    <Skeleton active :loading="loading">
      <Row :space-x="20" type="flex">
        <cell :flex="1">
          <div class="barrage-detail">
            <div>
              <h3 class="barrage-header blue-color">{{ roomName }}</h3>
              <div class="barrage-header">{{ sendTime | format }}</div>
            </div>
            <p class="content">{{ content }}</p>
          </div>
        </cell>
      </Row>
    </Skeleton>
  </div>
</template>
<script>
export default {
  props: {
    roomName: String,
    sendTime: String,
    content: String,
    loading: Boolean
  }
};
</script>
