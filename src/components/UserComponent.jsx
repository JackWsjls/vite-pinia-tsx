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