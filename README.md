# 实践一个Vue 3 + TypeScript + Vite + Pinia项目

## 新建一个项目

```bash
# 执行新建命令，选择vue vue-ts
yarn create vite vite-pinia-tsx
# 添加 sass 支持
yarn add sass -D
# 支持jsx tsx
yarn add @vitejs/plugin-vue-jsx -D
```

### 支持jsx、tsx

新建一个 UserComponent.jsx 文件
UserComponent.jsx

```tsx UserComponent.jsx
import { defineComponent } from "vue"

export default defineComponent({
  // 接收属性
  props: {
    name: String
  },
  setup(prop) {
    const {name} = prop
    return () => <p>user：{name}</p>
  }
})
```

在 app.vue 引入user.tsx
app.vue

```Vue app.vue
<script setup lang="ts">
import UserComponent from './UserComponent'
</script>
<template>
    <!-- 添加模块 -->
    <UserComponent name="小华" />
</template>
```

### 直接引入 css scss

```Vue
import './assets/css/styleDefault.css'
import './assets/css/style.scss'
```

### 直接引入json

新建 user.json 文件，并添加数据
user.json

```json
{
  "id": 1,
  "name": "小洁", 
  "age": 18
}
```

在 app.vue 中引入文件并展示
app.vue

```Vue app.vue
<script setup lang="ts">
import user, { age } from './user.json'
</script>
<template>
    <p>
        读取JSON的user数据是：ID：{{ user.id }}，姓名：{{ user.name }}，年龄：{{
        age
        }}
    </p>
</template>
```

## 使用Pinia对数据进行状态管理

优势：dev-tools支持、热模块更换、支持typeScript、插件机制、支持服务端渲染等等

```bash
# 安装pinia
yarn add pinia
```

实现一个简单的增删功能
在 main.ts 引入pinia

```ts main.ts
// 引入pinia
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia"

const app = createApp(App)
app.use(createPinia()).mount('#app')
```

新建文件夹 store，打开新建 index.ts。创建 useUserStore
store/index.ts

```ts store/index.ts
import { defineStore } from "pinia";

interface State {
  userList: User[]
}
// 定义一个 useUserStore 的数据管理
export const useUserStore = defineStore('user', {
  state: () => ({
      userList: [
        {
          id: 1,
          name: '小明'
        },
        {
          id: 2,
          name: '小芳'
        },
      ]
    }),
    actions: {
      deleteOne(id: number) {
        this.userList = this.userList.filter(item => item.id != id);
      },
      addUser(item:User) {
        this.userList.push(item)
      }
    }
})
```

app.vue

```Vue app.vue
<script setup lang="ts">
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
  <!-- 适用pinia对数据进行状态管理 -->
  <input type="text" v-model="newValue" @keyup.enter="addOne" />
  <ul>
    <li v-for="user in userStore.userList" :key="user.id">
      <UserList :user="user" />
    </li>
  </ul>
</template>
```

components/UserList.tsx

```tsx components/UserList.tsx
import { defineComponent, PropType } from "vue"
import { useUserStore } from "../store";

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup(prop) {
    const { user } = prop
    const { deleteOne } = useUserStore()
    const deleteUser = () => deleteOne(user.id)
    return () => <p>{user.name}<button onClick={deleteUser}>删除</button></p>
  }
})
```
