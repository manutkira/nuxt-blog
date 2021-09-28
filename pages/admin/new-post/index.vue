<template>
    <div class="admin-new-post-page">
        <section class="new-post-form">
            <admin-post-form @submit="onSubmitted"/>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '@/components/admin/AdminPostform.vue'
export default {
    layout: 'admin',
    components: {
        AdminPostForm
    },
    methods: {
      onSubmitted(postData){
        axios.post('https://nuxt-blog-1eeb7-default-rtdb.firebaseio.com/posts.json', postData).then(result => {
          console.log(result);
        }).catch(err => {
          console.log(err);
        })
      }
    }
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>