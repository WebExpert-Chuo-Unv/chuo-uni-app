<template>
  <div>
    <div class="date">
      
    </div>
    <div class="category">

      <div class="breakfirst">
        <h3>朝食</h3>
        <div class="cooking">
          料理名
          画像
          コメント
        </div>
      </div>

      <div class="lunch">
        <h3>昼食</h3>
        <div class="cooking">
          料理名
          画像
          コメント
        </div>
      </div>

      <div class="dinner">
        <h3>夕食</h3>
        <div class="cooking">
          料理名
          画像
          コメント
        </div>
      </div>

    </div>
  </div>
</template>

<script>


</script>
<style>
body {
  background-image: url("~@/assets/PostForm2.jpg");
  background-size: 100%;
  backdrop-filter: blur(5px);
}
.app{
  font-weight: bold;
  margin: 10% auto;
  text-align: center;
  width: 70%;
  height: 80vh;
}
.comment{
  height: 20vh;
}
.comment-field{
  width: 50%;
  height: 65%;
}
.submit{
  text-align: right;
  margin-right: 10%;
}
.preview-item-file{
    width: 30%;
    image-rendering: auto;
    border-radius: 10px;
  }
</style>