<template>
  <section class="bg-white px-3 py-3 max-w-6xl">
    <button @click="open=true" class="btn btn-block">
      Login
    </button>
    <input type="checkbox" v-model="open" class="modal-toggle"/>
    <div class="modal" role="dialog">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Login!</h3>
        <section class="body space-y-6 mt-3">
          <label class="floating-label">
            <span>Your Email</span>
            <input type="email" v-model="form.email"  class="input validator w-full" />
          </label>
          <label class="floating-label">
            <span>Your Password</span>
            <input type="password" v-model="form.password"  class="input validator w-full" />
          </label>
          <button @click="login()" class="btn btn-primary btn-sm">
            login
          </button>
        </section>
        <div class="modal-action">
          <label @click="open=false" class="btn">Close!</label>
        </div>
      </div>
      <label @click="open=false" class="modal-backdrop">Close</label>
    </div>
  </section>
</template>
<script setup lang="ts">
import {useLocalStorage} from "@vueuse/core";
import {usePocketBase} from "@/utils/pocketbase";

const form = ref({
  password: '',
  email: ''
});
const open = useLocalStorage('modal-login', true);
const pb = usePocketBase()
const router = useRouter()

const login = async () => {
  await pb.collection('users').authWithPassword(form.value.email, form.value.password)
  if(pb.authStore.isValid){
    await router.push('/dashboard')
  }
}

onMounted(async()=>{
  if(pb.authStore.isValid){
    await router.push('/dashboard')
  }
})
</script>