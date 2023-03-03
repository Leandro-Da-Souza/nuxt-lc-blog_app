<template>
    <div class="container mx-auto w-1/2 py-8 divide-y space-y-8 divide-gray-300">
        <ClientOnly>
            <PostItem v-for="post in posts" :key="post.id" :post="post"/>
        </ClientOnly>
    </div>
</template>

<script setup>
    const { $apiFetch } = useNuxtApp()
    const posts = ref([]);

    try {
        posts.value = await $apiFetch('/api/posts');
    } catch(e){
        console.log(e)
    }
</script>