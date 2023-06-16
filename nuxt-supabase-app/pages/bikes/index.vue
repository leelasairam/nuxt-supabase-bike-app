<script setup>
    definePageMeta({
        middleware: 'auth'
    })
    const supabase = useSupabaseAuthClient();
    const Location = ref(null);
    const Brand = ref(null);
    const data = ref([]);
    
    async function GetBikes(){
        let query = supabase.from('Bikes').select()
        if(Location.value){
            query = query.ilike('Place', `%${Location.value}%`)
        }
        if(Brand.value){
            query = query.ilike('BikeName', `%${Brand.value}%`)
        }

        const { data : bikes, error } = await query
        data.value = bikes;

        if(error){
            console.log(error);
        }
    }
    GetBikes();
</script>

<template>
    <input v-model="Location" placeholder="City/Town" type="text" />
    <input v-model="Brand" placeholder="Bike" type="text" />
    <button @click="GetBikes">Search</button><br/><br/>
    <div class="items">
        <div v-for="i in data" :key="i.id">
            <div class="card">
                <img class="image" :src="i.ImageUrl" /><br/>
                <NuxtLink class="bike" :to="`/bikes/${i.id}`"><strong>{{ i.BikeName }}</strong></NuxtLink>
                <p>{{ i.Price }} /-</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    input{
        margin-right: 0.3rem;
    }
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
</style>