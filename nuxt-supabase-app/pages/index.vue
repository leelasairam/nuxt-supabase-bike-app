<script setup>
    
    function IsUserAuthenticated(){
        const user_details = useSupabaseUser();
        console.log(user_details.value)
        if(user_details.value){
           return navigateTo('/bikes')
        }
        else{
           return navigateTo('/login')
        }
    }

</script>

<template>
    <br/>
    <h3>Place to Sell or Buy Used Bikes</h3><br/>
    <button @click="IsUserAuthenticated">Get Started</button>
    
</template>

<style scoped>
    button {
  font-size: 18px;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  padding: 0.7em 2em;
  border: 3px solid #FF0072;
  border-radius: 2px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
  color: #FF0072;
  text-decoration: none;
  transition: 0.3s ease all;
  z-index: 1;
}

button:before {
  transition: 0.5s all ease;
  position: absolute;
  top: 0;
  left: 50%;
  right: 50%;
  bottom: 0;
  opacity: 0;
  content: '';
  background-color: #FF0072;
  z-index: -1;
}

button:hover, button:focus {
  color: white;
}

button:hover:before, button:focus:before {
  transition: 0.5s all ease;
  left: 0;
  right: 0;
  opacity: 1;
}

button:active {
  transform: scale(0.9);
}
</style>