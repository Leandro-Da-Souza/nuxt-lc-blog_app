<template>
    <div class="container mx-auto w-1/2 py-8">
        <Title>{{ post.id }} | {{ post.title }}</Title>
            <NuxtLink :to="`/posts/${post.id}`" class="text-3xl font-bold">{{ post.title }}</NuxtLink>
        <div class="post-meta text-gray-700 flex items-center space-x-2">
            <p>{{ format(new Date(post.created_at), 'MMMM dd, yyyy') }}</p>
            <span>&middot;</span>
            <p>Leandro Da Souza</p>
        </div>
        <div class="post-content mt-4">
            <h1 class="font-bold">{{ post.id }}</h1>
            {{ post.body }}
        </div>
    </div>
</template>

<script setup>
    import { format } from 'date-fns'   
    const { $apiFetch } = useNuxtApp()
    const route = useRoute()
    const post = ref([]);

    try {
        post.value = await $apiFetch(`/api/posts/${route.params.id}`);
    } catch(e){
        console.log(e)
    }

</script>