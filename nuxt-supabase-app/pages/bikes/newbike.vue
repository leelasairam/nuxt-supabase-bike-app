<script setup>

    definePageMeta({
        middleware: 'auth'
    })
    const myForm = ref(null);
    const supabase = useSupabaseAuthClient();
    const NewBike = ref({});
    const file_details = ref({});

    async function CreateNewItem(){
        if(file_details.value.name){
            //uploading the file to the bucket.
            const { data : d, error : e } = await supabase.storage.from('Bikes')
            .upload(file_details.value.name, file_details.value.file, {
                cacheControl: '3600',
                upsert: false
            });
            if(e){
                console.log(e);
                return
            }
            
            //creating bike row with uploaded file.
            const user = useSupabaseUser().value;
            const { error } = await supabase
            .from('Bikes')
            .insert({ ...NewBike.value,User:user.id,ImageKey:d.path,ImageUrl:`https://ifozbvxmcgrtvudwcneq.supabase.co/storage/v1/object/public/Bikes/${d.path}` })
            if(!error){
                myForm.value.reset();
                NewBike.value = {};
            }
        }
        else{
            alert('Please attact the bike image');
        }
    }

    const HandleFileSelected = (event) => {
        //Getting file info and storing it.
        const user = useSupabaseUser().value;
        const bike = event.target.files[0];
        const img_name = `${new Date().getTime()}_${user.id}_${bike.name}`;
        file_details.value =  {file:bike,name:img_name};
    };
</script>

<template>
    <br/>
    <div>
        <form ref="myForm" class="form1" @submit.prevent="CreateNewItem">
            <label class="label1">Bike Photo</label>
            <input required="true" class="input1" type="file" @input="HandleFileSelected" />
            <label class="label1">Bike Model</label>
            <input required="true" class="input1" placeholder="Honda Activa" v-model="NewBike.BikeName" />
            <label class="label1">Description</label>
            <input required class="input1"  v-model="NewBike.Description" />
            <label class="label1">Expected Price</label>
            <input required class="input1" type="number" v-model="NewBike.Price" />
            <label class="label1">Year Purchased</label>
            <input required class="input1" type="number" v-model="NewBike.Year" />
            <label class="label1">City/Town</label>
            <input required class="input1" v-model="NewBike.Place" />
            <label class="label1">Kilometers drove</label>
            <input required class="input1" type="number" v-model="NewBike.Kilometers" />
            <button class="btn" type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>
.form1 {
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  padding: 20px 40px;
  background-color: rgb(41, 40, 40);
  color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.192);
}

.form1 button {
  align-self: flex-end;
}



.label1 {
  font-size: 14px;
  margin-bottom: -10.6px;
}

.input1 {
  height: 25px;
  width: 100%;
  border: 0.5px solid white;
  background-color: transparent;
  color: white;
  padding: 5px;
  border-radius: 5px;
  transition: .2s linear;
  position: relative;
}

.input1:focus {
  outline: none;
  background-color: rgba(173, 173, 173, 0.233);
  box-shadow: 1px 1px 10px rgba(255, 255, 255, 0.137);
}

.btn {
  border: none;
  padding: 4px 10px;
  border-radius: 5px;
  transition: .2s linear;
}

.btn:hover {
  background-color: lightgreen;
  box-shadow: 2px 2px 10px rgba(124, 124, 124, 0.192);
}

</style>