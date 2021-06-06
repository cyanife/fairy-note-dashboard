<style lang="less">
.app-header {
  color: rgba(49, 58, 70, 0.8);

  &-info &-icon-item {
    cursor: pointer;
    // display: inline-block;
    float: left;
    padding: 0 15px;
    height: @layout-header-height;
    line-height: @layout-header-height;
    margin-right: 10px;
    &:hover {
      background: @hover-background-color;
    }
    i {
      font-size: 18px;
    }
    a {
      color: inherit;
    }
    .h-badge {
      margin: 20px 0;
      display: block;
    }
  }
  .h-dropdownmenu {
    float: left;
  }

  &-dropdown {
    float: right;
    margin-left: 10px;
    padding: 0 20px 0 15px;
    .h-icon-down {
      right: 20px;
    }
    cursor: pointer;
    &:hover,
    &.h-pop-trigger {
      background: @hover-background-color;
    }
    &-dropdown {
      padding: 5px 0;
      .h-dropdownmenu-item {
        padding: 8px 20px;
      }
    }
  }
  .h-select {
    line-height: 1.5;
    float: left;
    margin-top: 15px;
    margin-right: 20px;
    width: 120px;
    &-show,
    &-show:hover,
    &-show.focusing {
      outline: none;
      box-shadow: none;
      border-color: transparent;
      border-radius: 0;
    }
    &-show.focusing {
      border-bottom: 1px solid #eee;
    }
  }
}
</style>

<template>
  <div class="app-header">
    <div style="width:50px;float:left;">
      <Button
        :icon="siderCollapsed ? 'icon-align-right' : 'icon-align-left'"
        size="l"
        noBorder
        class="font20"
        @click="siderCollapsed = !siderCollapsed"
      ></Button>
    </div>
    <div class="float-right app-header-info">
      <div class="app-header-icon-item" v-tooltip content="系统布局配置" theme="white" @click="showSettingModal">
        <i class="icon-content-left"></i>
      </div>
      <DropdownMenu class="app-header-dropdown" trigger="hover" offset="0,5" :width="150" placement="bottom-end" :datas="infoMenu" @onclick="trigger">
        <span>{{ user.name }}</span>
      </DropdownMenu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { UPDATE_SIDERCOLLAPSE } from '../store/mutation-types';

export default {
  data() {
    return {
      infoMenu: [
        { key: 'password', title: '修改密码', icon: 'h-icon-lock' },
        { key: 'logout', title: '退出登录', icon: 'h-icon-outbox' }
      ]
    };
  },
  computed: {
    ...mapGetters(['user']),
    siderCollapsed: {
      get() {
        return this.$store.state.siderCollapsed;
      },
      set(value) {
        this.$store.commit(UPDATE_SIDERCOLLAPSE, value);
      }
    }
  },
  mounted() {
    this.listenResize();
  },
  methods: {
    listenResize() {
      let windowWidth = window.innerWidth;
      const resizeEvent = window.addEventListener('resize', () => {
        if (windowWidth == window.innerWidth) {
          return;
        }
        if (this.siderCollapsed && window.innerWidth > 900) {
          this.siderCollapsed = false;
        } else if (!this.siderCollapsed && window.innerWidth < 900) {
          this.siderCollapsed = true;
        }
        windowWidth = window.innerWidth;
      });
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', resizeEvent);
      });
      window.dispatchEvent(new Event('resize'));
    },
    trigger(data) {
      if (data == 'logout') {
        this.$store.dispatch('logout');
        this.$router.replace({ name: 'Login' });
      } else {
        this.$emit('open-change-password');
      }
    },
    showSettingModal() {
      this.$emit('open-setting');
    }
  }
};
</script>
