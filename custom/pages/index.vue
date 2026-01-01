<template>
  <section class="bg-white px-3 py-3 max-w-6xl">
    <div class="card bg-gray-400 shadow-sm">
      <figure>
        <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Card Title</h2>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        <div class="card-actions justify-end">
          <button @click="navigateTo('/login')" class="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import {usePocketBase} from "@/utils/pocketbase";

const pb = usePocketBase();
</script>