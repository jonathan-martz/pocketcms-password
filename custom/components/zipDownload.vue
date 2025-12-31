<template>
  <div>
    <button @click="generateAndDownloadZip" class="btn btn-primary btn-sm btn-block mb-3">Download ZIP</button>
    <p v-if="loading">Generating keys and preparing download...</p>
  </div>
</template>

<script>
import JSZip from 'jszip';
import {useLocalStorage} from "@vueuse/core";
import slugify from "slugify";

const pubKey = useLocalStorage('pubKey', '');
const privKey = useLocalStorage('privKey', '');
const pb = usePocketBase()

export default {
  name: "RsaKeyDownload",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async generateAndDownloadZip() {
      this.loading = true;
      try {
        // Create a new zip file
        const zip = new JSZip();

        // Add privateKey and publicKey to the zip
        zip.file("rsa_4096", privKey.value);
        zip.file("rsa_4096.pub", pubKey.value);

        // Generate the zip file and prompt download
        const zipContent = await zip.generateAsync({ type: "blob" });
        const zipURL = URL.createObjectURL(zipContent);

        // Create an anchor element and trigger download
        const a = document.createElement("a");
        a.href = zipURL;
        a.download = slugify(pb.authStore.record.name, {lower: true, replacement: '_'})
        a.click();

        // Revoke the object URL after the file is downloaded
        URL.revokeObjectURL(zipURL);
      } catch (error) {
        console.error("An error occurred while generating the keys or the ZIP file:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>