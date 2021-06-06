<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header">修改密码</header>
    <div style="padding:15px">
      <Form ref="form" :label-width="100" :rules="rules" :model="data">
        <FormItem label="旧密码" prop="oldPassword">
          <input type="text" v-model="data.oldPassword" />
        </FormItem>
        <FormItem label="新密码" prop="newPassword1">
          <input type="password" v-model="data.newPassword1" />
        </FormItem>
        <FormItem label="确认新密码" prop="newPassword2">
          <input type="password" v-model="data.newPassword2" />
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
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      data: {
        oldPassword: null,
        newPassword1: null,
        newPassword2: null
      },
      rules: {
        required: ['oldPassword', 'newPassword1', 'newPassword2'],
        combineRules: [
          {
            refs: ['newPassword1', 'newPassword2'],
            valid: {
              valid: 'equal',
              message: '两次输入的密码不一致'
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    validate() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('validated', this.data);
      } else {
        this.$Message.error(`还有${validResult.messages.length}个错误未通过验证。`);
      }
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
