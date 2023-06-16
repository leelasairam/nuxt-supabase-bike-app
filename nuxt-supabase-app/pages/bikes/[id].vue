<script setup>
    definePageMeta({
        middleware: 'auth'
    })
    const {id} = useRoute().params;
    const supabase = useSupabaseAuthClient();
    const NewIntrest = ref({});

    const { data, error } = await supabase
    .from('Bikes')
    .select()
    .eq('id', id);
    const bike = ref({});
    bike.value = data[0];
    if(error){
        console.log(error);
    }

    //Intest

    async function CreateIntrest(){
        const user = useSupabaseUser().value;
        const { error } = await supabase
        .from('Interests')
        .insert({...NewIntrest.value,Bike:bike.value.id,User:user.id,BikeDetails:[bike.value.id,bike.value.BikeName]})

        if(error){
            console.log(error);
        }
        else{
            NewIntrest.value = {}
        }
    }


</script>

<template>
    <div class="items">
        <div>
            <img :src="bike.ImageUrl" />
        </div>
        <div class="card">
            <p><strong>{{ bike.BikeName }}</strong></p>
            <p>{{ bike.Price }} /-</p>
            <ul>
                <li>Location : {{ bike.Place }}</li>
                <li>Kilometers : {{ bike.Kilometers }}</li>
                <li>Purchased on : {{ bike.Year }}</li>
                <li>Description : {{ bike.Description }}</li>
            </ul>
        </div>
    </div>
    <br/>

    <div id="action">
        <p><strong>Liked it? Send your intrest to owner.</strong></p>
        <input v-model="NewIntrest.Name" type="text" placeholder="Name" /><br/>
        <input v-model="NewIntrest.Phone" type="phone" placeholder="Phone" /><br/>
        <textarea v-model="NewIntrest.Description" placeholder="Description"></textarea><br/><br/>
        <button @click="CreateIntrest">Send Your Intrest</button>
    </div>


</template>

<style scoped>
    .items{
        padding:1rem;
        background-color: rgb(69, 69, 69);
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

    img{
        width: 200px;
        height: 200px;
    }

    #action{
        padding: 0.4rem;
        background-color:rgb(180, 177, 177);
        border-radius: 8px;       
        border-style: ridge;
    }
</style>