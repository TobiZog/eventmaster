import { fetchFileNames, fetchFolderNames, postFile } from "@/data/api/files.api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilesStore = defineStore('filesStore', {
  state: () => ({
    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false),

    staticFolders: ref<Array<{name: string, nrOfItems: number}>>([]),

    selectedFolder: ref<{name: string, nrOfItems: number}>(),

    /** List of files on the server */
    staticFiles: ref<Array<{name: string, size: number, content: string, url: string}>>([]),

    selectedFile: ref<{name: string, size: number, content: string, url: string}>(),

    showFileUploadDialog: ref(false),

    fileUpload: ref(),

    fileUploadDir: ref(""),
  }),

  actions: {
    async getStaticFolders() {
      this.fetchInProgress = true

      fetchFolderNames()
        .then(res => {
          this.staticFolders = res.data
          this.fetchInProgress = false
        })
    },

    /**
     * Request static files on server by selected folder
     */
    async getStaticFiles() {
      this.fetchInProgress = true

      fetchFileNames(this.selectedFolder.name)
        .then(res => {
          this.staticFiles = res.data
          this.fetchInProgress = false
        })
    },

    async uploadFile() {
      this.fetchInProgress = true

      postFile(this.uploadFile, this.fileUploadDir)
        .then(response => {
          console.log(response)
          this.showFileUploadDialog = false
          this.fetchInProgress = false
        })
    },
  }
})