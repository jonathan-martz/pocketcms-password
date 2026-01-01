<template>
  <section class="bg-white px-3 py-3 flex justify-between items-center" :class="{
    'mb-3': !open
  }">
    <a href="/" class="text-primary">PocketPass.io</a>
    <nav>
      <section v-if="!open" class="bars">
        <button @click="open = !open">
          <font-awesome-icon :icon="['fas', 'bars']" size="2x"/>
        </button>
      </section>
      <section v-else class="times">
        <button @click="open = !open">
          <font-awesome-icon :icon="['fas', 'times']" size="2x"/>
        </button>
      </section>
    </nav>
  </section>
  <section v-if="open" class="bg-red-400 px-3 py-3 mb-3">
    <section class="grid grid-cols-6 gap-3">
      <div class="col-span-3">
        <a href="/" class="btn btn-primary btn-sm btn-block">Startseite</a>
      </div>
      <div class="col-span-3">
        <a href="/" class="btn btn-primary btn-sm btn-block">Startseite</a>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { useLocalStorage } from "@vueuse/core";

const open = useLocalStorage('open-navigation', false);

onMounted(()=>{
  open.value = false;
})
</script>