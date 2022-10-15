<template>
  <div class="box">
    <!-- 左侧图片 -->
    <img src="../../public/images/登录界面背景/登录界面背景.jpg">
    <!-- 右侧大盒子 -->
    <div class="login-register-box">
      <!-- 头部内容 -->
      <header>
        <router-link to="/"></router-link>
        <span>小米账号</span>
      </header>
      <!-- 主题区域 -->
      <div class="contaienr">
        <!-- 卡片部分 -->
        <div class="card">
          <!-- tab 切换栏 -->
          <el-tabs v-model="activeName" class="demo-tabs" @tab-change="tabChange">
            <!-- 登录页面 -->
            <el-tab-pane label="登录" name="login">
              <el-form ref="ruleFormRef1" :model="userInfo" status-icon :rules="rules1">
                <el-form-item prop="userName">
                  <el-input placeholder="用户名" v-model.trim="userInfo.userName"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input placeholder="密码" show-password v-model.trim="userInfo.password" type="password"></el-input>
                </el-form-item>
              </el-form>
              <div class='accept-terms'>
                <input type="checkbox" id="check-box" @click="isChecked = !isChecked" :checked="isChecked">
                <label for="check-box"> <span>已阅读并同意小米账号<a>用户协议</a>和<a>隐私政策</a></span></label>
              </div>
              <el-button :class="isChecked?'is-checked': 'un-checked'" @click="login(ruleFormRef1)">登录</el-button>
            </el-tab-pane>
            <!-- 注册页面 -->
            <el-tab-pane label="注册" name="register">
              <el-form ref="ruleFormRef2" :model="userInfo" status-icon :rules="rules2">
                <el-form-item prop="userName">
                  <el-input placeholder="用户名" v-model.trim="userInfo.userName"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input placeholder="密码" show-password v-model.trim="userInfo.password" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                  <el-input placeholder="确认密码" show-password v-model.trim="userInfo.rePassword" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-label style="display: flex;align-items: center;">
                    <el-input placeholder="验证码" v-model.trim="userInfo.code" type="text" style="width: 200px"></el-input>
                    <div style="width: 100px;height: 60px;">
                      <img :src="codeUrl" style="width: 100px; height:60px" @click="changeCode" >
                    </div>
                  </el-label>
                </el-form-item>
              </el-form>
              <div class='accept-terms'>
                <input type="checkbox" id="check-box" @click="isChecked = !isChecked" :checked="isChecked">
                <label for="check-box"> <span>已阅读并同意小米账号<a>用户协议</a>和<a>隐私政策</a></span></label>
              </div>
              <el-button :class="isChecked?'is-checked': 'un-checked'" @click="register(ruleFormRef2)">注册</el-button>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="footer">小米公司版权所有-京ICP备10046444-京公网安备11010802020134号-京ICP证110507号</div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import type { reqBackInfo } from '@/api/auth.type'
import type { FormInstance, FormRules } from 'element-plus'
import { reqValidateCode } from '@/api/utils'

// 获取 pinia 和 路由数据
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const ruleFormRef1 = ref<FormInstance>()
const ruleFormRef2 = ref<FormInstance>()

// 登录
const login = async (formEl: FormInstance) => {
  await formEl.validate(async (valid) => {
    if (valid) {
      if (isChecked.value === false) {
        // 没有勾选同意按钮
        ElMessage({
          type: "warning",
          message: '请您同意用户条约！'
        })
      } else {
        let result = await authStore.login({ username: userInfo.userName, password: userInfo.password }) as reqBackInfo
        if (result.statusCode == 200) {
          router.push(route.query.redirect as string || '/')
        }
      }
    }
  })

}

// 注册
const register = async (formEl: FormInstance) => {
  await formEl.validate(async (valid) => {
    if (valid) {
      if (isChecked.value === false) {
        // 没有勾选同意按钮
        ElMessage({
          type: "warning",
          message: '请您同意用户条约！'
        })
      } else {
        if (await validateCode(userInfo.code)) {
          let result = await authStore.register({ username: userInfo.userName, password: userInfo.password }) as reqBackInfo
          if (result.statusCode == 200) {
            router.push(route.query.redirect as string || '/')  
          }
        }
      }
    }
  })
}

// 给重复输入密码做验证
const validateRePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再一次输入密码'))
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error('密码长度6-16'))
  } else if (value !== userInfo.password) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}
// 完成前端登录注册数据的验证
// 登录验证
const rules1 = reactive<FormRules>({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 6, max: 16, message: '用户名长度6-16', trigger: 'change' },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change',
    },
    { min: 6, max: 16, message: '密码长度6-16', trigger: 'change' },
  ]
})
// 注册验证
const rules2 = reactive<FormRules>({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 6, max: 16, message: '用户名长度6-16', trigger: 'change' },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change',
    },
    { min: 6, max: 16, message: '密码长度6-16', trigger: 'change' },
  ],
  rePassword: [
    { validator: validateRePass, trigger: 'change' },
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur',
    },
  ]
})

// 获取验证码地址
let codeUrl = ref<string>('/api/getCode');

const changeCode = () => {
  codeUrl.value += `?${Math.random()}`
}

// 对验证码的验证
const validateCode = async (code: string) => {
  const result = await reqValidateCode(code) as unknown as reqBackInfo;
  console.log(result)
  if (result.statusCode !== 200) {
    changeCode()
    return false
  } else {
    return true
  }
}


// 当前选中的 tab 栏
const activeName = ref(route.query.mode || 'login')
type userInfo = {
  userName: string,
  password: string,
  rePassword: string,
  code: string
}
let userInfo = reactive<userInfo>({
  userName: '',
  password: '',
  rePassword: '',
  code: '',
})
// 判断协议是否被勾选
let isChecked = ref<boolean>(false)

// tab 栏切换
const tabChange = () => {
  for (const key in userInfo) {
    userInfo[key] = ''
  }
}



</script>
<style scoped lang='less'>
@color: #ff6700;

.box {
  height: 100%;
  min-width: 1200px;
  display: flex;
  background-color: #ffffff;

  img {
    max-width: 375px;
    height: 100%;
    flex-grow: 0;
  }

  .login-register-box {
    min-height: 800px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    header {
      height: 80px;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 20px;

      a {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url(https://s02.mifile.cn/assets/static/image/logo-mi2.png) no-repeat;
        background-size: cover;
      }

      span {
        user-select: none;
        margin-left: 10px;
        font-weight: 500;
        font-size: 26px;
      }
    }

    .contaienr {
      flex: 1;
      width: 100%;
      position: relative;
      display: flex;
      padding-top: 5%;
      // align-items: center;
      justify-content: center;

      .card {
        box-shadow: rgba(162, 162, 162, .1) 0 20px 50px 0;
        width: 360px;
        height: 448px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-tab-pane {
          display: flex;
          flex-direction: column;
          align-items: center;

          .el-input {
            margin: 20px auto;
            width: 300px;
            height: 60px;
            font-size: 20px;
          }

          .accept-terms {
            display: flex;
            align-items: center;
            margin: 20px 0;

            input[type='checkbox'] {
              width: 20px;
              height: 20px;
              cursor: pointer;
            }

            label span {
              margin-left: 5px;
              cursor: pointer;
              color: #ccc;
              font-size: 14px;

              a {
                margin: 0 5px;
                color: #000;
              }
            }
          }

          button {
            width: 320px;
            height: 60px;
            border-radius: 5px;
            border: none;
            transition: .3s;
            color: white;
            letter-spacing: 5px;
            font-size: 18px;
          }
        }

      }

      .footer {
        position: absolute;
        display: block;
        bottom: 0;
        margin: 0 auto;
        font-size: 13px;
        color: #ccc;
        margin-bottom: 10px;
      }
    }


  }
}

.un-checked {
  background-color: #ff7e29;

  &:hover {
    background-color: #ffbe99;
  }
}

.is-checked {
  background-color: @color;
  cursor: pointer;

  &:hover {
    background-color: #ff7e29;
  }
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

:deep(.el-tabs__item) {
  font-weight: 900;
  font-size: 22px;

  &:hover {
    color: #000;
  }
}

:deep(.el-tabs__active-bar) {
  background-color: @color;
  height: 4px;
}

:deep(.is-active) {
  color: #000;
}


:deep(.el-input .is-focus) {
  box-shadow: 0 0 0px 1px @color inset;
}
</style>