<template>
  <section class="bg-white px-3 py-3">
    <h2 class="font-bold text-xl mb-3">
      Download your RSA Key
    </h2>
    <zipDownload/>
  </section>
  <section class="bg-white px-3 py-3 mt-3">
    <h2 class="font-bold text-xl mb-3">
      Upload your RSA Key
    </h2>
    <rsa-key-import/>
  </section>
</template>
<script setup lang="ts">
import zipDownload from '@/components/zipDownload.vue'
import RsaKeyImport from "@/components/import.vue";

onMounted(()=>{
  addBreadcrumb({ link: 'dashboard', code: 'dashboard'});
})
</script>