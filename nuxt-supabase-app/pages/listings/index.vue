<script setup>
    definePageMeta({
        middleware: 'auth'
    })
    const supabase = useSupabaseAuthClient();
    const user = useSupabaseUser().value;

    const { data, error } = await supabase
    .from('Bikes')
    .select()
    .eq('User', user.id)

    if(error){
        console.log(error);
    }

    async function DeleteBike(id){
        const { error } = await supabase
        .from('Bikes')
        .delete()
        .eq('id', id)
        if(error){
            console.log(error);
        }
    }
</script>

<template>
    <div class="items">
        <div v-for="i in data" :key="i.id">
            <div class="card">
                <img class="image" :src="i.ImageUrl" /><br/>
                <NuxtLink class="bike" :to="`/listings/${i.id}`"><strong>{{ i.BikeName }}</strong></NuxtLink>
                <br/><br/>
                <a @click="DeleteBike(i.id)" class="del">DELETE</a>
                <br/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .items{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-gap: 20px; 
    }
    .card{
        padding: 0.4rem;
        color: white;
        background-color:black;
        border-radius: 8px;
        border-style: ridge;
    }

    .image{
        width: 120px;
        height: 120px;
        margin-bottom: 0.5rem;
    }

    .bike{
        color: white;
        font-weight: 600;
    }

    .del{
        float: right;
        color:lightcoral
    }
</style>