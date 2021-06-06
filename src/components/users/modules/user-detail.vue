<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header">{{ register ? '添加' : '编辑' }}用户</header>
    <div style="padding:15px">
      <Form ref="form" :model="data" :rules="rules">
        <FormItem label="用户名" prop="username">
          <input type="text" v-model="data.username" />
        </FormItem>
        <FormItem label="密码" prop="password">
          <input type="password" v-model="data.password" />
        </FormItem>
        <FormItem label="活动" prop="is_active">
          <H-switch v-model="data.is_active"></H-switch>
        </FormItem>
      </Form>
    </div>
    <!-- h-modal-footer 将自带modal底部样式 -->
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="validate">确定</button>
      <button class="h-btn" @click="close">取消</button>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    roles: Array
  },
  data() {
    return {
      id: this.user.id,
      data: {
        username: this.user.username,
        password: null,
        is_active: this.user.is_active
      }
    };
  },
  methods: {
    validate() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('validated', this.register, this.id, this.data);
        this.$emit('close');
      }
    },
    close() {
      this.$emit('close');
    }
  },
  computed: {
    register: function() {
      return !this.id;
    },
    rules: function() {
      return {
        required: this.register ? ['username', 'password'] : ['username']
      };
    }
  }
};
</script>
