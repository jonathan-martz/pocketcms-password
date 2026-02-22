<template>
  <section class="alert alert-warning text-black text-center block font-bold">
    <FontAwesomeIcon :icon="['fas','circle-info']" class="float-left text-white"/>
    <span class="mx-3">
      This is
      <a class="text-primary" target="_blank" href="https://www.pocketcms.io">PocketCms.io</a>
      a Content Managment Template build by
      <a class="text-gray-500" target="_blank" href="https://www.jonathan-martz.de">JMSE</a>
      and independent of
      <a class="text-gray-500" target="_blank" href="https://www.pocketbase.io">PocketBase.io</a>
    </span>
    <FontAwesomeIcon :icon="['fas','circle-info']" class="float-right text-white"/>
  </section>
</template>

<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>