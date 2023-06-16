<script setup>
    definePageMeta({
        middleware: 'auth'
    })
    const supabase = useSupabaseAuthClient();
    const user = useSupabaseUser().value;


    async function SignOut(){
        const{error} = await supabase.auth.signOut();
        if(error){
            console.log(error);
        }
        else{
            navigateTo('/');
        }

    }
</script>

<template>
    <div id="p-card">
        <p><strong>LoggedIn as :</strong></p>
        <p>{{ user.email }}</p>
        <br/>
        <button @click="SignOut">Logout</button>
    </div>
</template>

<style scoped>
#p-card{
    padding: 0.4rem;
    background-color: rgb(32, 31, 31);
    color: white;
}
strong{
    color: yellow;
}
</style>