<script setup>
    definePageMeta({
        middleware: 'auth'
    })
    const supabase = useSupabaseAuthClient();
    const user = useSupabaseUser().value;

    const { data, error } = await supabase
    .from('Interests')
    .select()
    .eq('User', user.id)

    if(error){
        console.log(error)
    }

    async function DeleteIntrest(id){
        const { error } = await supabase
        .from('Interests')
        .delete()
        .eq('id', id)
        if(error){
            console.log(error);
        }
    }
</script>

<template>
    <div v-for="i in data" class="items" :key="i.id">
        <div class="card">
            <NuxtLink class="a" :to="`/bikes/${i.BikeDetails[0]}`">{{ i.BikeDetails[1] }}</NuxtLink><br/>
            <p>Given Phone : {{ i.Phone }}</p>
            <p>Description : {{ i.Description }}</p>
            <a class="del" @click="DeleteIntrest(i.id)">DELETE</a><br/>
        </div>
    </div>
    
</template>

<style scoped>
.items{
    padding: 0.4rem;
    background-color: rgb(52, 51, 51);
}
.card{
    padding: 0.4rem;
    color: white;
    background-color: black;
    margin:0.2rem;
}
.a:link, .a:visited {
  background-color: #f44336;
  color: white;
  padding: 14px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

.a:hover, .a:active {
  background-color: red;
}

.del{
    float: right;
    color:lightcoral
}
</style>