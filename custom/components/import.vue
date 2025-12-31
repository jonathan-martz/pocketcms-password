<template>
  <div class="btn btn-primary btn-block">
    <input type="file" @change="handleFileUpload" ref="fileInput" accept=".zip" />
    <p v-if="privKey">Private Key: <code>{{ privKey.substring(0, 100) }}...</code></p>
    <p v-if="pubKey">Public Key: <code>{{ pubKey.substring(0, 100) }}...</code></p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import JSZip from "jszip";

export default {
  name: "RsaKeyImport",
  data() {
    return {
      privKey: null, // Holds the extracted private key
      pubKey: null, // Holds the extracted public key
      errorMessage: null, // Holds error messages during processing
    };
  },
  methods: {
    /**
     * Handles the ZIP file upload and extracts the private and public keys.
     * @param {Event} event - The file input change event.
     */
    async handleFileUpload(event) {
      const file = event.target.files[0]; // Get the uploaded file
      if (!file) {
        this.errorMessage = "No file selected.";
        return;
      }

      this.errorMessage = null;

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
        this.privKey = await zipContent.file("rsa_4096").async("text");
        this.pubKey = await zipContent.file("rsa_4096.pub").async("text");

        console.log("Private Key:", this.privKey);
        console.log("Public Key:", this.pubKey);
      } catch (error) {
        console.error("An error occurred while processing the ZIP file:", error);
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  margin: 10px 0;
}

.error {
  color: red;
  font-weight: bold;
}
</style>