export function useAuth() {
    function setUser(name) {
        if (process.client) {
            localStorage.setItem('user', JSON.stringify({name}))
        }

    }

    function getUser() {
        if (process.client) {
            return JSON.parse(localStorage.getItem('user'))
        }

    }

    function deleteUser() {
        if (process.client) {
            localStorage.removeItem('user')
        }
    }

    const isLoggedIn = computed(() => {
        if(process.client) {
            return !! localStorage.getItem('user')
        }
    })

    return { setUser, getUser, deleteUser, isLoggedIn }
}