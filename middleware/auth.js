const { isLoggedIn } = useAuth()

export default defineNuxtRouteMiddleware((to, from) => {
    if(!isLoggedIn.value) {
        return navigateTo('/login')
    }
  })