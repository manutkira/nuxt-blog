<template>
    <div class="admin-post-page">
        <section class="update-form">
            <admin-post-form :post="loadedPost"/>
        </section>
    </div>
</template>

<script>
import AdminPostForm from '@/components/admin/AdminPostform.vue'
export default {
    layout: 'admin',
    components: {
        AdminPostForm
    },
    data(){
        return{
            loadedPost: {
                author: 'Manut',
                title: 'My fist post!',
                content: 'just testing the app!',
                thumbnailLink: 'https://lh3.googleusercontent.com/proxy/Zzs_g4c7cH_v8yTdOrgR0zSzaC2l5zxMhEcdTSFrYsMshY3F-9tDHBryC9wMxLn9fkYvS1WjaErafOumRzR7HmgNnMmvvz4gmxyOMfqEPnOvXICdPGqwJS9ZpIgcoug'
            }
        }
    }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>