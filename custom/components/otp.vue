<template>
  <section class="bg-gray-300 w-full">
    <div class="flex items-center space-x-4 justify-center mb-2">
      <input
          v-for="(box, index) in token"
          :key="index"
          v-model="token[index]"
          type="text"
          maxlength="1"
          class="w-6 h-6 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          @input="focusNext(index)"
      />
    </div>
    <section class="actions w-full">
      <section class="grid grid-cols-2 gap-3">
        <div class="col-span-2 md:col-span-1">
          <button class="btn btn-secondary btn-sm btn-block mt-2">
            {{timer}} sekunden
          </button>
        </div>
        <div class="col-span-2 md:col-span-1">
          <button
              @click="copyToken(token)"
              class="px-3 py-2 mt-2 text-white btn btn-primary btn-sm btn-block"
          >
            Kopieren
          </button>
        </div>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import {generate} from "otplib";
import { getRemainingTime } from "@otplib/totp";

const props = defineProps({
  secret: {type: String, required: true}
});

const secret = ref<string | null>(null);
const token = ref<string | null>(null);
const isValid = ref<boolean | null>(null);
const uri = ref<string | null>(null);
const timer = ref<number>(30);

function focusNext(index) {
  if (this.otp[index].length === 1 && index < this.otp.length - 1) {
    this.$refs[`otpInput${index + 1}`][0].focus();
  }
}

const copyToken = (token: string) => {
  navigator.clipboard.writeText(token.join(''));
}

function toBase32(input) {
  const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  let base32String = "";

  // Convert input string into a binary representation
  for (const char of input) {
    bits += char.charCodeAt(0).toString(2).padStart(8, '0');
  }

  // Group binary data into 5-bit chunks and map to Base32 characters
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.slice(i, i + 5);
    const index = parseInt(chunk.padEnd(5, '0'), 2); // Pad to 5 bits
    base32String += base32Chars[index];
  }

  // Add padding characters ("=") as needed
  while (base32String.length % 8 !== 0) {
    base32String += "=";
  }

  return base32String;
}

const generateToken = async () => {
  token.value = (await generate({secret: secret.value})).split("");
  calculateTime()
}

const calculateTime = () => {
  timer.value =  getRemainingTime(
      Math.floor(Date.now() / 1000), // time
      30, // period
      0, // t0
  );
}

onMounted(async () => {
  secret.value = toBase32(props.secret);
  generateToken()

  setInterval(()=>{
    if(timer.value > 0){
      timer.value = timer.value - 1;
    }
    else {
      calculateTime()
      generateToken()
    }
  }, 1000)
});
</script>