<style lang="less"></style>

<template>
  <div>
    <Layout class="app-frame" v-if="!loading" :siderCollapsed="siderCollapsed" :siderFixed="layoutConfig.siderFixed">
      <Sider :theme="layoutConfig.siderTheme">
        <appMenu :theme="layoutConfig.siderTheme"></appMenu>
      </Sider>
      <Layout :headerFixed="layoutConfig.headerFixed">
        <HHeader theme="white">
          <appHead @open-setting="openSetting = true" @open-change-password="openChangePassword = true" :layoutConfig="layoutConfig"></appHead>
        </HHeader>
        <Content>
          <div class="app-frame-content">
            <router-view></router-view>
          </div>
          <HFooter>
            <appFooter></appFooter>
          </HFooter>
        </Content>
      </Layout>
    </Layout>
    <Modal v-model="openSetting" type="drawer-right">
      <appLayoutSetting :layoutConfig="layoutConfig"></appLayoutSetting>
    </Modal>
    <Modal v-model="openChangePassword">
      <appChangePassword @close="openChangePassword = false" @validated="changePassword"></appChangePassword>
    </Modal>
  </div>
</template>

<script>
import appLayoutSetting from './modules/app-layout-setting';
import appChangePassword from './modules/app-changepw';
import appHead from './app-header';
import appMenu from './app-menu';
import appFooter from './app-footer';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loading: true,
      openSetting: false,
      openChangePassword: false,
      layoutConfig: {
        siderTheme: 'dark',
        headerFixed: true,
        siderFixed: true
      }
    };
  },
  mounted() {
    // 如果无后台数据，将此处屏蔽
    this.init();

    // 如果无后台数据，将此处打开
    // this.loading = false;

    const listener = G.addlistener('SYS_MENU_REFRESH', () => {
      this.initMenu();
    });
    this.$once('hook:beforeDestroy', function() {
      G.removelistener(listener);
    });
  },
  async beforeRouteUpdate(to, from, next) {
    G.trigger('SYS_MENU_UPDATE');
    next();
  },
  methods: {
    init() {
      this.$Loading('加载中');
      this.loadLayoutConfig();
      // this.$store.dispatch('updatePermission').then(() => {
      this.initMenu();
      // this.initDict();
      this.loading = false;
      this.$Loading.close();
      // });
    },
    // initDict() {
    //   R.Dict.get().then(resp => {
    //     if (resp.ok) {
    //       let dicts = resp.body;
    //       for (let dict of dicts) {
    //         HeyUI.addDict(dict.name, dict.data);
    //       }
    //     }
    //     this.loading = false;
    //     this.$Loading.close();
    //   });
    // },
    // updateLayoutConfig({ key, value }) {
    //   this.layoutConfig[key] = value;
    // },
    initMenu() {
      G.trigger('SYS_MENU_UPDATE');
    },
    loadLayoutConfig() {
      let config = Utils.getLocal2Json('SYS_CONFIG_LAYOUT');
      if (config) {
        this.layoutConfig = config;
      }
    },
    changePassword(data) {
      let params = {};
      params.userId = this.user.id;
      params.oldPassword = data.oldPassword;
      params.newPassword = data.newPassword1;
      R.Auth.changePassword(params)
        .then(() => {
          this.$Message('修改成功');
          this.openChangePassword = false;
        })
        .catch(() => {
          this.$Message.error('修改失败，请重试！');
        });
    }
  },
  computed: {
    ...mapGetters(['user', 'siderCollapsed'])
  },
  components: {
    appHead,
    appMenu,
    appFooter,
    appLayoutSetting,
    appChangePassword
  }
};
</script>
