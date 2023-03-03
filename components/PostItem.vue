<template>
    <div class="post-container py-8">
        <NuxtLink :to="`/posts/${props.post.id}`" class="text-3xl font-bold">{{ props.post.title }}</NuxtLink>
        <div class="post-meta text-gray-700 flex items-center space-x-2">
            <p>{{ format(new Date(props.post.created_at), 'MMMM dd, yyyy') }}</p>
            <span>&middot;</span>
            <p>{{ props.post.user.name }}</p>
        </div>
        <div class="post-preview leading-relaxed mt-4 line-clamp-3">
            {{ props.post.body }}
        </div>
        <div class="mt-4">
            <NuxtLink class="bg-blue-600 hover:bg-blue-800 text-white rounded inline-block px-4 py-2" :to="`/posts/${props.post.id}`">Read More</NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { format } from 'date-fns'

const props = defineProps(['post'])


</script>