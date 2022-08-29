<script setup lang="ts">
// 引入组件，并传参
import UserComponent from './components/UserComponent'
// 引入读取JSON数据文件
import user, { age } from './user.json'
// 适用pinia对数据进行状态管理
import { useUserStore } from './store'
import UserList from './components/UserList'
import { ref } from 'vue'
const userStore = useUserStore() // 这里不能解构赋值，会失去响应式
const newValue = ref('')
const addOne = () => {
  userStore.addUser({
    id: new Date().getMilliseconds(),
    name: newValue.value,
  })
  newValue.value = ''
}
</script>

<template>
  <!-- 引入组件，并传参 -->
  <UserComponent name="小华" />
  <!-- 引入读取JSON数据文件 -->
  <p>
    读取JSON的user数据是：ID：{{ user.id }}，姓名：{{ user.name }}，年龄：{{
      age
    }}
  </p>
  <!-- 适用pinia对数据进行状态管理 -->
  <input type="text" v-model="newValue" @keyup.enter="addOne" />
  <ul>
    <li v-for="user in userStore.userList" :key="user.id">
      <UserList :user="user" />
    </li>
  </ul>
</template>

<style scoped></style>