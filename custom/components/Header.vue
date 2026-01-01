<template>
  <section class="bg-white px-3 py-3 flex justify-between">
    <a href="/" class="text-primary">PocketPass.io</a>
    <nav>
      <section v-if="open" class="bars">
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
</template>

<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const open = useLocalStorage('open-navigation', false);
</script>