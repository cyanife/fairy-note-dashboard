<style scoped lang="less">
@fansmedal-color-blue: #5caafb;
@fansmedal-color-green: #44c1c1;
@fansmedal-color-yellow: #ffba02;
@fansmedal-color-orange: #ff8417;
@fansmedal-color-red: #f03b62;
@fansmedal-color-purple: #9e59f5;
@fansmedal-color-violet: #8e4cf4;

@userlevel-color-yellow: #dfb87b;
@userlevel-color-cyan: #68decf;
@userlevel-color-aqua: #7eaeff;
@userlevel-color-blue: #518ff9;
@userlevel-color-indigo: #7268fc;
@userlevel-color-purple: #9271f0;
@userlevel-color-aubergine: #9945ef;
@userlevel-color-violet: #b947ee;
@userlevel-color-red: #fe4848;
@userlevel-color-salmon: #ff5c08;
@userlevel-color-orange: #ff940d;
@userlevel-color-gold: #ffd128;

.fansmedal {
  color: white;
}

.fansmedal-5 {
  .fansmedal();
  background: @fansmedal-color-blue;
  //   border-color: @fansmedal-color-blue;
}
.fansmedal-10 {
  .fansmedal();
  background: @fansmedal-color-green;
  //   border-color: @fansmedal-color-blue;
}
.fansmedal-15 {
  .fansmedal();
  background: @fansmedal-color-yellow;
  //   border-color: @fansmedal-color-blue;
}
.fansmedal-20 {
  .fansmedal();
  background: @fansmedal-color-orange;
  //   border-color: @fansmedal-color-blue;
}
.fansmedal-25 {
  .fansmedal();
  background: @fansmedal-color-red;
  //   border-color: @fansmedal-color-blue;
}
.fansmedal-29 {
  .fansmedal();
  background: @fansmedal-color-purple;
  //   border-color: @fansmedal-color-blue;
}
.fansmedal-30 {
  .fansmedal();
  background: @fansmedal-color-violet;
  //   border-color: @fansmedal-color-blue;
}

.userlevel {
  color: white;
}

.userlevel-15 {
  .userlevel();
  background: @userlevel-color-yellow;
}

.userlevel-19 {
  .userlevel();
  background: @userlevel-color-cyan;
}

.userlevel-29 {
  .userlevel();
  background: @userlevel-color-cyan;
}

.userlevel-39 {
  .userlevel();
  background: @userlevel-color-aqua;
}

.userlevel-49 {
  .userlevel();
  background: @userlevel-color-blue;
}

.userlevel-59 {
  .userlevel();
  background: @userlevel-color-indigo;
}

.userlevel-69 {
  .userlevel();
  background: @userlevel-color-purple;
}

.userlevel-79 {
  .userlevel();
  background: @userlevel-color-aubergine;
}

.userlevel-89 {
  .userlevel();
  background: @userlevel-color-violet;
}

.userlevel-99 {
  .userlevel();
  background: @userlevel-color-red;
}

.userlevel-109 {
  .userlevel();
  background: @userlevel-color-orange;
}

.userlevel-119 {
  .userlevel();
  background: @userlevel-color-salmon;
}

.userlevel-129 {
  .userlevel();
  background: @userlevel-color-gold;
}

.medal-left {
  margin-right: 0px;
  border-radius: 50% 0 0 50%;
}

.medal-right {
  border-radius: 0 4px 4px 0;
  border-left: 0px;
}

/deep/ .h-avatar-image {
  background-image: url('../../assets/logo.png');
  background-color: #00ddce;
}

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
        <cell>
          <Avatar class="barrage-avatar" type="default" :src="avatar" noInfo />
        </cell>
        <cell :flex="1">
          <div class="barrage-detail">
            <div>
              <h3 class="barrage-header blue-color">{{ nickname }}</h3>
              <div class="barrage-header h-tag" :class="userLevelColor">{{ level }}</div>
              <div v-if="fansMedal" class="barrage-header">
                <span class="h-tag-circle medal-left" :class="fansMedalColor">{{ fansLevel }}</span>
                <span class="h-tag medal-right" :class="fansMedalColor">{{ fansMedal }}</span>
              </div>
              <div class="barrage-header">{{ sendTime | format }}</div>
            </div>
            <p class="content">{{ content }}</p>
          </div>
        </cell>
        <cell class="barrage-button-container"><Button color="primary" class="barrage-copy-button" @click="goToMute">复制ID</Button></cell>
      </Row>
    </Skeleton>
  </div>
</template>
<script>
export default {
  props: {
    avatar: String,
    userid: Number,
    nickname: String,
    level: Number,
    fansMedal: String,
    fansLevel: Number,
    sendTime: String,
    content: String,
    loading: Boolean
  },
  computed: {
    fansMedalColor: function() {
      if (this.fansLevel < 6) {
        return 'fansmedal-5';
      } else if (this.fansLevel < 11) {
        return 'fansmedal-10';
      } else if (this.fansLevel < 16) {
        return 'fansmedal-15';
      } else if (this.fansLevel < 21) {
        return 'fansmedal-20';
      } else if (this.fansLevel < 26) {
        return 'fansmedal-25';
      } else if (this.fansLevel < 30) {
        return 'fansmedal-29';
      } else if (this.fansLevel == 30) {
        return 'fansmedal-30';
      } else {
        return '';
      }
    },
    userLevelColor: function() {
      if (this.level < 15) {
        return 'userlevel-15';
      } else {
        return 'userlevel-' + Math.floor(Math.floor(this.level / 10) * 10 + 9);
      }
    }
  },
  methods: {
    goToMute() {
      this.$Clipboard({
        text: this.nickname,
        showSuccessTip: 'ID已复制'
      });
    }
  }
};
</script>
