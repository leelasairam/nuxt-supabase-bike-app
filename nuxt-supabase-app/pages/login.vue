<script setup>
    const supabase = useSupabaseAuthClient();
    const user_email = ref('');

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({provider: 'google'})
        if(error){
            console.log(error);
        }
    }


    async function signInWithEmail() {
        if(user_email.value && user_email.value.includes('@')){
            const { data, error } = await supabase.auth.signInWithOtp({
                email: user_email.value,
                options: {
                emailRedirectTo: 'http://localhost:3000/',
                },
            });
            if(error){
                console.log(error);
            }
            else{
                alert('Verfication email sent successfully.')
            }
        }
        else{
            alert('Please enter valid email')
        }
    }



</script>

<template>
    <div id="form">
        <p id="title">Login with magic link</p>

        <div class="field has-addons">
            <div class="control">
                <input class="input" v-model="user_email" type="email" placeholder="Enter Email Address">
            </div>
            <div class="control">
                <a class="button is-info"  @click="signInWithEmail">Login</a>
            </div>
        </div>

        <p id="or"><strong>OR</strong></p>
        <button @click="signInWithGoogle" class="button is-success">Continue with the Google</button>
    </div>
</template>

<style scoped>
    @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
    #form{
        padding: 0.4rem;
        background-color:aliceblue;
        border-style: ridge;
    }
    #title{
        font-weight: 600;
        margin-bottom: 0.4rem;
    }

    #or{
        margin-bottom: 0.4rem;
    }
</style>