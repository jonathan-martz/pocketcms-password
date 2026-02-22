<template>
  <section class="page">

    <div class="mx-auto max-w-6xl grid grid-cols-6 gap-3">
      <div class="col-span-6 text-center bg-white rounded-xl px-3 py-3">
        <h2 class="font-bold text-4xl py-9">Hello World of PocketBase fans 🚀</h2>
        <p class="text-lg pb-9">
          This is my Template with Nuxt, Vite, VueJs, Tailwind and Daisyui for fast Deployment.<br>
          Started as <a href="https://www.pocketstore.io" class="text-primary" target="_blank">PocketStore.io</a>
          it now support multiple extensions like Store, only CMS and so on.
        </p>
      </div>
      <div class="col-span-6">
        <div
            style="background-size: cover;background-image: url('/matthias-munning-qsPO7eQ66o0-unsplash.jpg')"
            class="h-96 bg-fit w-full bg-center"></div>
      </div>
    </div>
    <div class="mx-auto max-w-6xl grid grid-cols-6 gap-3 mt-3">
      <div class="col-span-6 md:col-span-2">
        <section class="card bg-white">
          <figure>
            <img src="https://placeholdit.com/600x400/dddddd/999999" class="w-full" alt="">
          </figure>
          <div class="card-body">
            Test 123
          </div>
        </section>
      </div>
      <div class="col-span-6 md:col-span-2">
        <section class="card bg-white">
          <figure>
            <img src="https://placeholdit.com/600x400/dddddd/999999" class="w-full" alt="">
          </figure>
          <div class="card-body">
            Test 123
          </div>
        </section>
      </div>
      <div class="col-span-6 md:col-span-2">
        <section class="card bg-white">
          <figure>
            <img src="https://placeholdit.com/600x400/dddddd/999999" class="w-full" alt="">
          </figure>
          <div class="card-body">
            Test 123
          </div>
        </section>
      </div>
      <div class="col-span-6 md:col-span-2">
        <section class="card bg-white">
          <figure>
            <img src="https://placeholdit.com/600x400/dddddd/999999" class="w-full" alt="">
          </figure>
          <div class="card-body">
            Test 123
          </div>
        </section>
      </div>
      <div class="col-span-6 md:col-span-2">
        <section class="card bg-white">
          <figure>
            <img src="https://placeholdit.com/600x400/dddddd/999999" class="w-full" alt="">
          </figure>
          <div class="card-body">
            Test 123
          </div>
        </section>
      </div>
      <div class="col-span-6 md:col-span-2">
        <section class="card bg-white">
          <figure>
            <img src="https://placeholdit.com/600x400/dddddd/999999" class="w-full" alt="">
          </figure>
          <div class="card-body">
            Test 123
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const {t} = useI18n();
useHead({
  title: t("general.title"),
  meta: [
    {
      name: "description",
      content:
          "PocketCms.io is a Open Source Shop Framework which is based on PocketBase and made with Nuxt/VueJs by Jonathan Martz.",
    },
  ],
});
</script>