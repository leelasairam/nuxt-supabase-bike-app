const date = new Date();
 
export default defineNuxtPlugin((NuxtApp) => {
    NuxtApp.current_date = date.toString().slice(0,15);
    //using composable function in plugin
    NuxtApp.user_info = useGetuser().SendUserInfo();
    //reference in layouts>default.vue
})
