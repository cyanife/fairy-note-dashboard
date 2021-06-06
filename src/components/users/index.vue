<style lang="less">
.user-header {
  margin-bottom: 5px;

  .user-header-item {
    display: inline-block;
    vertical-align: middle;
    margin: 5px 10px 5px 0px;
  }
}
</style>

<template>
  <div class="frame-page">
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">用户</span>
      </div>
      <div class="h-panel-body" style="padding-top: 15px">
        <div class="user-header">
          <div class="user-header-item">
            <Search @search="getUsers" v-model="username" v-width="200" showSearchButton placeholder="用户名">
              <i class="h-icon-search"></i>
            </Search>
          </div>
          <div class="user-header-item">
            <button class="h-btn h-btn-primary" @click="openUserDetail()">
              <i class="h-icon-plus"></i>
              <span>添加</span>
            </button>
          </div>
        </div>
        <Table ref="table" :datas="users" stripe :loading="loading">
          <TableItem title="ID" prop="id" :width="100" sort="auto"></TableItem>
          <TableItem title="邮箱" prop="email" :width="200"></TableItem>
          <TableItem title="用户名" prop="name" :width="200"></TableItem>
          <TableItem title="操作" align="center" :width="150">
            <template v-slot:default="user">
              <button class="h-btn h-btn-s" @click="openUserDetail(user.data)">
                <i class="h-icon-edit"></i>
                <span>编辑</span>
              </button>
              <button class="h-btn h-btn-s h-btn-red" @click="deleteUser(user.data.id)">
                <i class="h-icon-trash"></i>
                <span>删除</span>
              </button>
            </template>
          </TableItem>
          <div slot="empty">无数据</div>
        </Table>
      </div>
    </div>
  </div>
</template>

<script>
import UserDetail from './modules/user-detail';
export default {
  data() {
    return {
      loading: true,
      // 用户
      username: null,
      users: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.getUsers();
    },
    getUsers(name) {
      this.loading = true;
      return R.Users.getAll(name)
        .then(resp => {
          let { users } = resp;
          if (users) {
            this.users = users;
            this.$refs.table.triggerSort({ prop: 'id', type: 'asc' }, 'auto');
          }
        })
        .catch(err => {
          if (err.response && err.response.message) {
            this.$Message.error(err.response.message);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addUser(data) {
      this.loading = true;
      return R.Users.add(data)
        .then(resp => {
          if (resp.body) {
            this.$Message(resp.body.message);
          }
        })
        .catch(err => {
          if (err.response && err.response.message) {
            this.$Message.error(err.response.message);
          }
        })
        .finally(() => {
          return this.getUsers(this.username);
        });
    },
    updateUser(id, data) {
      this.loading = true;
      return R.Users.update(id, data)
        .then(resp => {
          if (resp.body) {
            this.$Message(resp.body.message);
          }
        })
        .catch(err => {
          if (err.response && err.response.message) {
            this.$Message.error(err.response.message);
          }
        })
        .finally(() => {
          return this.getUsers(this.username);
        });
    },
    deleteUser(id) {
      this.loading = true;
      return R.Users.delete(id)
        .then(resp => {
          if (resp.body) {
            this.$Message(resp.body.message);
          }
        })
        .catch(err => {
          if (err.response && err.response.message) {
            this.$Message.error(err.response.message);
          }
        })
        .finally(() => {
          return this.getUsers(this.username);
        });
    },
    openUserDetail(user) {
      let newUser = { email: null, name: null };
      this.$Modal({
        component: {
          vue: UserDetail,
          datas: { user: user || newUser }
        },
        events: {
          validated: this.userDetailValidated
        }
      });
    },
    userDetailValidated(modal, register, id, data) {
      if (register) {
        this.addUser(data);
      } else {
        this.updateUser(id, data);
      }
    }
  }
};
</script>
