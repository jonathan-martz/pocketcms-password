<template>
  <section class="bg-white max-w-6xl mx-auto px-3 py-3">
    <div class="grid grid-cols-6 gap-3">
      <div v-for="item in items" class="col-span-6 md:col-span-2">
        <div class="card bg-gray-300 shadow-sm">
          <div class="card-body">
            <h2 class="block text-center font-bold pb-0 mb-0">
              Name: {{item.name}}
            </h2>
            <otp :secret="item.secret" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {usePocketBase} from "@/utils/pocketbase";

const items = ref([]);

const pb = usePocketBase();

onMounted(async ()=>{
  items.value = await pb.collection('totps').getFullList(50);
})
</script>