<template>
  <div class="card bg-gray-400 shadow-sm">
    <div class="card-body">
      <div class="flex justify-between">
        <h2 class="card-title">{{ props.data.name }}</h2>
        <section class="actions">
          <button @click="remove(props.data.id)" class="btn btn-error btn-sm">
            <font-awesome-icon :icon="['fas','trash']"></font-awesome-icon>
          </button>
        </section>
      </div>
      <div v-if="isHttps">
        <p v-if="props.data.notes" class="break-all">{{ props.data.notes }}</p>
        <p v-if="props.data.username">{{ props.data.username }}</p>
        <div class="card-actions justify-end mt-3">
          <button @click="showPassword()" class="show btn btn-primary btn-sm">
            <font-awesome-icon :icon="['fas','eye']"></font-awesome-icon>
            <span>{{show}}</span>
          </button>
          <button @click="copyText(props.data.username)" v-if="isHttps" class="btn btn-primary btn-sm">
            <font-awesome-icon :icon="['fas','copy']"></font-awesome-icon>
            <span>Username</span>
          </button>
          <button @click="copyPassword()" v-if="isHttps" class="btn btn-primary btn-sm">
            <font-awesome-icon :icon="['fas','copy']"></font-awesome-icon>
            <span>Password</span>
          </button>
        </div>
      </div>
      <div v-else>
        <section class="alert alert-error">
          unsecure Website
        </section>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useLocalStorage} from "@vueuse/core";
import {decryptMessage} from "@/utils/openpgp";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const privKey = useLocalStorage('privKey', '');
const pb = usePocketBase()
const show = ref('???');

const props = defineProps({
  data: {
    type: Object, required: true
  }
});

const copyPassword = async () => {
  copyText(
      await decryptMessage(props.data.encrypted, privKey.value, 'password')
  );
};

const isHttps = location.protocol === 'https:' || location?.hostname === 'localhost'

const remove = async (id) => {
  if (confirm('Willst du es wirklich löschen ?')) {
    await pb.collection('passwords').delete(id)
  }
}

const showPassword = async () => {
  console.log('encypretd', props.data.encrypted);
  console.log('privkey', privKey.value);
if(show.value === '???'){
  show.value = await decryptMessage(props.data.encrypted, privKey.value, 'password')
}
else{
  show.value = '???'
}

};

function copyText(text) {
  navigator.clipboard.writeText(text);
}
</script>