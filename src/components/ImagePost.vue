<template>
  <div>
    <label v-show="!uploadedImage" class="input-item__label"
      >画像を選択
      <input type="file" @change="onFileChange" />
    </label>
    <div class="preview-item">
      <img
        v-show="uploadedImage"
        class="preview-item-file"
        :src="uploadedImage"
        alt=""
      />
      <div v-show="uploadedImage" class="preview-item-btn" @click="remove">
        <p class="preview-item-name">{{ img_name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImagePost",
  data() {
      return {
          uploadedImage: '',
          img_name:'',
      };
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
      this.img_name = files[0].name;
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    remove() {
      this.uploadedImage = false;
    },
  },
  mounted: function(){
    console.log("image")
  }
};
</script>

<style>
  .preview-item-file{
    width: 30%;
    image-rendering: auto;
    display: flex;
    border-radius: 10em;
  }
</style>
