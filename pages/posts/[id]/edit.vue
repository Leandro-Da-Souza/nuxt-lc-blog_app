<template>
    <div class="container mx-auto w-1/2 py-8">
      <ul
        v-if="errors.length > 0"
        className="mb-4 list-disc list-inside text-sm text-red-600"
      >
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
      <h2 class="text-2xl mb-3">Edit Post</h2>
      <form action="#" class="space-y-6" @submit.prevent="updatePost">
        <div>
          <label for="title" class="block font-semibold">Title</label>
          <input
            type="text"
            v-model="title"
            id="title"
            class="px-2 py-2 w-full shadow rounded mt-2"
          />
        </div>
        <div>
          <label for="body" class="block font-semibold"></label>
          <textarea
            v-model="body"
            name="body"
            id="body"
            cols="30"
            rows="10"
            class="px-2 py-2 w-full shadow rounded mt-2"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
          >
            Update Post
          </button>
          <span v-show="isLoading">Loading...</span>
        </div>
      </form>
      <div class="mt-4 bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 inline-block">
        <button @click="deletePost">Delete Post</button>
      </div>
    </div>
  </template>

<script setup>
    definePageMeta({
      middleware: ['auth']
    })
    const { $apiFetch } = useNuxtApp()
    const router = useRouter()
    const route = useRoute()

    const title = ref()
    const body = ref()
    const isLoading = ref(false)
    const errors = ref([])
    const post = ref(null)


    onMounted(async () => {
        post.value = await $apiFetch(`/api/posts/${route.params.id}`);
        title.value = post.value.title
        body.value = post.value.body
    })

    const updatePost = async () => {
        isLoading.value = true

        try {
            const post = await $apiFetch(`api/post/${route.params.id}`, {
                method: 'PATCH',
                body: {
                    title: title.value,
                    body: body.value
                }
            })

            title.value = ''
            body.value = ''

            isLoading.value = false

            router.push('/my-info')
        } catch (error) {
            if(error.response.status === 403) {
                alert(error.message.data)
            }
            console.log(error)
            errors.value = Object.values(error.data.errors).flat()
            isLoading.value = false
        }

    }

    const deletePost = async () => {
        isLoading.value = true

        try {
            const post = await $apiFetch(`api/post/${route.params.id}`, {
                method: 'DELETE',

            })

            isLoading.value = false

            router.push('/my-info')
        } catch (error) {
            console.log(error)
            errors.value = Object.values(error.data.errors).flat()
            isLoading.value = false
        }

    }

</script>
  