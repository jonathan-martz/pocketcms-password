<template>
  <section class="page">
    <div class="mx-auto max-w-6xl grid grid-cols-6 gap-3">
      <div class="col-span-6">
        <div
            style="background-size: cover;background-image: url('/jonny-caspari-eyzZehCG-n4-unsplash.jpg')"
            class="h-96 bg-cover w-full bg-center"></div>
      </div>
    </div>
    <div class="mx-auto max-w-6xl grid grid-cols-6 gap-3 mt-3">
      <div class="col-span-6 md:col-span-2">
        <section class="card bg-white">
          <figure>
            <img src="https://placeholdit.com/600x400/dddddd/999999" class="w-full" alt="">
          </figure>
          <div class="card-body">
            <b class="text-lg">PocketPass.io</b>
            <p class="text-sm text-gray-400">
              PocketPass ist ein Passwort Manager mit OpenPgp.js unterstützung zur sicheren Passwort speicherung.
            </p>
            <section class="badges space-x-3">
              <div class="badge badge-sm badge-secondary">Password</div>
              <div class="badge badge-sm badge-secondary">OpenPGP.js</div>
              <div class="badge badge-sm badge-secondary">Totp.js</div>
            </section>
          </div>
          <section class="card-actions flex justify-end px-3 py-3">
            <a href="/" class="btn btn-sm btn-primary">
              <FontAwesomeIcon :icon="['fas','link']" class="float-right text-white"/>
              <span>PocketPass.io</span>
            </a>
          </section>
        </section>
      </div>
      <div class="col-span-6 md:col-span-2">
        <section class="card bg-white">
          <figure>
            <img src="https://placeholdit.com/600x400/dddddd/999999" class="w-full" alt="">
          </figure>
          <div class="card-body">
            <b class="text-lg">Bowler.pro - Bowling Tool</b>
            <p class="text-sm text-gray-400">
              Bowler.pro ist ein Bowling Ergebnis Managment Tool für Pro Bowler oder Freizeitkegler.
              Speichert Ergebnisse für dein Liga Team oder auch Trainingsspiele.
            </p>
            <section class="badges space-x-3">
              <div class="badge badge-sm badge-secondary">Bowling</div>
              <div class="badge badge-sm badge-secondary">Ergebnis</div>
              <div class="badge badge-sm badge-secondary">Tool</div>
            </section>
          </div>
          <section class="card-actions flex justify-end px-3 py-3">
            <a href="/" class="btn btn-sm btn-primary">
              <FontAwesomeIcon :icon="['fas','link']" class="float-right text-white"/>
              <span>Bowler.pro</span>
            </a>
          </section>
        </section>
      </div>
      <div class="col-span-6 md:col-span-2">
        <section class="card bg-white">
          <figure>
            <img src="https://placeholdit.com/600x400/dddddd/999999" class="w-full" alt="">
          </figure>
          <div class="card-body">
            <b class="text-lg">Coming Soon</b>
            <p class="text-sm text-gray-400">
              Hallo Welt
            </p>
            <section class="badges space-x-3">
              <div class="badge badge-sm badge-secondary">Coming</div>
              <div class="badge badge-sm badge-secondary">Soon</div>
            </section>
          </div>
          <section class="card-actions flex justify-end px-3 py-3">
            <a href="/" class="btn btn-sm btn-primary">
              <FontAwesomeIcon :icon="['fas','link']" class="float-right text-white"/>
              <span>Coming-Soon.pro</span>
            </a>
          </section>
        </section>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>