<template>
  <section class="bg-white px-3 py-3 max-w-6xl">
    <section v-if="!pb.authStore.record?.public_key">
      <button @click="modalKeyGenerate=true" class="btn btn-sm btn-primary btn-block">
        Generate Key
      </button>
      <input type="checkbox" v-model="modalKeyGenerate" class="modal-toggle"/>
      <div class="modal" role="dialog">
        <div class="modal-box space-y-6 my-3">
          <h3 class="text-lg font-bold">Key anlegen</h3>
          <label class="floating-label">
            <span>Your Key</span>
            <textarea class="w-full h-32" v-model="pubKey"></textarea>
          </label>
          <button @click="generate()" class="btn btn-primary btn-sm btn-block">
            generate
          </button>
        </div>
        <label class="modal-backdrop" @click="modalKeyGenerate=false">Close</label>
      </div>
    </section>
    <section v-else>
      <section class="actions flex justify-end mb-3 space-x-3">
        <button class="btn btn-sm btn-primary">
          {{total}}
        </button>
        <a href="/de/key" class="btn btn-primary btn-sm">
          <font-awesome-icon :icon="['fas','key']"></font-awesome-icon>
        </a>
        <button @click="modalPassword= true" class="btn btn-sm btn-primary">
          <font-awesome-icon :icon="['fas','plus']"></font-awesome-icon>
        </button>
      </section>
      <section class="grid grid-cols-6 gap-3 mt-3">
        <div class="col-span-6 md:col-span-2">
          <label class="floating-label mb-3">
            <span>Wonach suchst du ?</span>
            <input type="search" v-model="query" class="input w-full mt-3"/>
          </label>
        </div>
        <div class="col-span-6 md:col-span-3"></div>
      </section>
      <input type="checkbox" v-model="modalPassword" class="modal-toggle"/>
      <div class="modal" role="dialog">
        <div class="modal-box space-y-6 my-3">
          <h3 class="text-lg font-bold">Password anlegen</h3>
          <label class="floating-label">
            <span>Your Name</span>
            <input type="text" v-model="form.name" class="input validator w-full"/>
          </label>
          <label class="floating-label">
            <span>Your Username</span>
            <input type="text" v-model="form.username" class="input validator w-full"/>
          </label>
          <label class="floating-label">
            <span>Your Password</span>
            <input type="password" v-model="form.password" class="input validator w-full"/>
          </label>
          <button @click="create()" class="btn btn-primary btn-sm">
            anlegen
          </button>
        </div>
        <label class="modal-backdrop" @click="modalPassword=false">Close</label>
      </div>
    </section>
    <section v-if="items.length" class="query-bar mt-3 space-y-3 grid grid-cols-6 gap-3">
      <div class="col-span-6 md:col-span-2" v-for="item in items">
        <PasswordCard :data="item"></PasswordCard>
      </div>
    </section>
    <section v-else class="alert alert-error text-white">
      <p>Es gibt nich keine Passwörter in deiner Liste.</p>
    </section>
  </section>
</template>
<script setup lang="ts">
import {usePocketBase} from "@/utils/pocketbase";
import {generatePGPKeyPair} from "@/utils/openpgp";
import {useLocalStorage} from "@vueuse/core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {encryptMessage} from "@/utils/openpgp";
import PasswordCard from "../components/PasswordCard.vue";

const pb = usePocketBase();
const query = ref('');
const total = ref(0);
const modalPassword = ref(false);
const modalKeyGenerate = ref(false);
const pubKey = useLocalStorage('pubKey', '');
const privKey = useLocalStorage('privKey', '');
const items = ref([]);
const form = ref({
  password: '',
  username: '',
  manager: '',
  name: '',
  encrypted: 'test123',
  public_key: pubKey.value
});

watch(query, async () => {
  await filter()
});

const filter = async () => {
  let data = (await pb.collection('passwords').getList(1, 3 * 10, {
    filter: 'name ~"' + query.value + '"',
    sort: 'created'
  }));
  items.value = data.items
  total.value = data.totalItems;
}

const create = async () => {
  form.value.manager = pb.authStore.record.id;
  form.value.public_key = pubKey.value;
  await pb.collection('passwords').create({
    name: form.value.name,
    manager: pb.authStore.record.id,
    username: form.value.username,
    public_key: form.value.public_key,
    encrypted: await encryptMessage(form.value.password, pubKey.value)
  })
  form.value.username = '';
  form.value.name = '';
  form.value.password = '';
  modalPassword.value = false;
  router.push('/dashboard');
}

const generate = async () => {
  const {
    privateKey,
    publicKey
  } = await generatePGPKeyPair();
  await pb.collection('users').update(pb.authStore.record.id, {
        public_key: publicKey
      }
  )
  privKey.value = privateKey;
  pubKey.value = publicKey;
}

onMounted(async () => {
  await filter();

  // Subscribe to changes in any passwords record
  await pb.collection('passwords').subscribe('*', function (e) {
    filter()
  }, { /* other options like: filter, expand, custom headers, etc. */});
});
</script>