<template>
    <div class="single-post-page">
        <section class="post">
            <h1 class="post-title">{{loadedPosts.title}}</h1>
            <div class="post-details">
                <div class="post-detail">Last updated on {{loadedPosts.updateDate}}</div>
                <div class="post-detail">Written by {{loadedPosts.author}}</div>
            </div>
            <p>{{loadedPosts.content}}</p>
        </section>
        <section class="post-feedback">
            <p>This is my first Nuxt.js application give me your idea on this app is it good or bad or need improvement. <a href="allnob64@gmail.com">allnob64@gmail.com</a></p>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  asyncData(context){
    return axios.get(process.env.baseUrl + '/posts/' + context.params.id + '.json').then( res => {
      return {
        loadedPosts: res.data
      }
    }).catch(e => context.error(e))
  }
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>