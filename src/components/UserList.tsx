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