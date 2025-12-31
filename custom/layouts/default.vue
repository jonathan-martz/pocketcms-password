<template>
  <section class="page min-h-screen" data-theme="light">
    <header>
      <Header/>
    </header>
    <main class="mx-auto max-w-6xl min-h-screen px-3 2xl:px-0">
      <Breadcrumb/>
      <BackToTop/>
      <IssueReporting vendor="jonathan-martz" host="github.com" name="pocketcms-password" />
      <slot/>
    </main>
    <footer>
      <Footer/>
    </footer>
  </section>
</template>
<script setup lang="ts">
import "../main.css";
import config from "~/pocketstore.json";
import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";
import BugReporting from "~/components/BugReporting.vue";
import IssueReporting from "~/components/IssueReporting.vue";
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(45deg, #92c9b1, #92c9b1 20px, #b3e0d2 20px, #b3e0d2 40px);
}
</style>

