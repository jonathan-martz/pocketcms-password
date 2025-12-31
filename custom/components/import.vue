<template>
  <div class="btn btn-primary btn-block">
    <input type="file" @change="handleFileUpload" ref="fileInput" accept=".zip" />
    <p v-if="privKey">Private Key: <code>{{ privKey.substring(0, 100) }}...</code></p>
    <p v-if="pubKey">Public Key: <code>{{ pubKey.substring(0, 100) }}...</code></p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import JSZip from "jszip";

// Persistent local storage values for the keys
const pubKey = useLocalStorage("pubKey", "");
const privKey = useLocalStorage("privKey", "");

// Reactive state for handling error messages
const errorMessage = ref(null);

/**
 * Handles the ZIP file upload and extracts the private and public keys.
 * @param {Event} event - The file input change event.
 */
const handleFileUpload = async (event) => {
  const file = event.target.files[0]; // Get the uploaded file
  if (!file) {
    errorMessage.value = "No file selected.";
    return;
  }

  errorMessage.value = null;

  try {
    // Read the file and parse it as a ZIP archive
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(file);

    // Ensure the required key files exist in the ZIP
    const expectedFiles = ["rsa_4096", "rsa_4096.pub"];
    for (const fileName of expectedFiles) {
      if (!zipContent.file(fileName)) {
        throw new Error(`Missing required file: ${fileName}`);
      }
    }

    // Extract the private and public key contents
    privKey.value = await zipContent.file("rsa_4096").async("text");
    pubKey.value = await zipContent.file("rsa_4096.pub").async("text");

    console.log("Private Key:", privKey.value);
    console.log("Public Key:", pubKey.value);
  } catch (error) {
    console.error("An error occurred while processing the ZIP file:", error);
    errorMessage.value = error.message;
  }
};
</script>