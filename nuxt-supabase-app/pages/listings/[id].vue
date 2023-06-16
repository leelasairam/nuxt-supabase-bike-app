<script setup>
    definePageMeta({
        middleware: 'auth'
    })
    const {id} = useRoute().params;
    const supabase = useSupabaseAuthClient();
    const user = useSupabaseUser().value;
    const NoData = ref(false);
    
    const { data, error } = await supabase
    .from('Interests')
    .select()
    .eq('Bike', id)

    if(data.length===0){
        NoData.value = true;
    }

    if(error){
        console.log(error);
    }
</script>

<template>
    <p id="count"> Found <strong>{{ data.length }}</strong> Intrests.</p>
    <div v-for="i in data" :key="id" class="items">
        <div class="card">
            <p><strong>{{ i.Name }}</strong></p>
            <p>Phone : {{ i.Phone }}</p>
            <p>Message : {{ i.Description }}</p>
        </div>
    </div>

    <div v-if="NoData" class="items">
        <div class="card">
            <p><strong>No Intrests Yet</strong></p>
        </div>
    </div>
</template>

<style scoped>
    #count{
        color: brown;
    }
    .items{
        padding: 0.4rem;
        background-color: rgb(54, 54, 54);
    }

    .card{
        margin: 0.2;
        padding: 0.4rem;
        color: white;
        background-color: black;
    }
</style>