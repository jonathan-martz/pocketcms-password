<template>
    <header>
      <Header/>
    </header>
    <main class="mx-auto max-w-6xl min-h-screen px-3 2xl:px-0">
      <Messages/>
      <Breadcrumb/>
      <CookieBanner/>
      <BackToTop/>
      <BugReporting />
      <IssueReporting vendor="pocketcms-io" host="git.jmse.cloud" name="demo" />
      <slot/>
    </main>
    <footer>
      <Footer/>
    </footer>
</template>
<script setup lang="ts">
import "../main.css";
import config from "~/pocketstore.json";
import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";
import BugReporting from "~/components/BugReporting.vue";
import IssueReporting from "~/components/IssueReporting.vue";
import BackToTop from "~/components/BackToTop.vue";
</script>

<style scoped>
.page {
  background-color: #e66464;
  background-image: linear-gradient(to right, transparent 50%, rgba(255, 255, 255, 0.5) 50%),
  linear-gradient(to bottom, transparent 50%, rgba(255, 255, 255, 0.5) 50%);
  background-size: 20px 20px;
}
</style>

