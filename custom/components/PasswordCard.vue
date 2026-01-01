<template>
  <div class="card bg-gray-400 shadow-sm">
    <div class="card-body">
      <h2 class="card-title">{{ props.data.name }}</h2>
      <p v-if="props.data.notes" class="break-all">{{props.data.notes}}</p>
      <p v-if="props.data.username">{{props.data.username}}</p>
      <div class="card-actions justify-end">
        <button @click="remove(props.data.id)" class="btn btn-error btn-sm">
          <font-awesome-icon :icon="['fas','trash']"></font-awesome-icon>
        </button>
        <button @click="copyText(props.data.username)" v-if="isHttps" class="btn btn-primary btn-sm">
          <font-awesome-icon :icon="['fas','copy']"></font-awesome-icon>
          <span>Username</span>
        </button>
        <button @click="copyPassword()" v-if="isHttps" class="btn btn-primary btn-sm">
          <font-awesome-icon :icon="['fas','copy']"></font-awesome-icon>
          <span>Password</span>
        </button>
        <p v-if="!isHttps" class="alert alert-error">Verbindung ist nicht sicher</p>
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

const isHttps = location.protocol === 'https:'

const remove = async (id) => {
  if (confirm('Willst du es wirklich löschen ?')) {
    await pb.collection('passwords').delete(id)
  }
}

function copyText(text) {
  navigator.clipboard.writeText(text);
}
</script>