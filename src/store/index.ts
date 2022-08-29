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