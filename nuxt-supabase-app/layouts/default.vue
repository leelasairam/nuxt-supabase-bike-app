<script setup>
    //const {current_date} = useNuxtApp();
    //const {user_info} = useNuxtApp();
</script>

<template>
    <!--Nav-->
    <div>
        <nav>
            <header class="grid">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/bikes">Bikes</NuxtLink></li>
                    <li><NuxtLink to="/bikes/newbike">Sell</NuxtLink></li>
                    <li><NuxtLink to="/intrests">My Intrests</NuxtLink></li>
                    <li><NuxtLink to="/listings">My Listings</NuxtLink></li>
                    <li><NuxtLink to="/profile">Profile</NuxtLink></li>
                </ul><br/>
            </header>
        </nav> 
    </div>
    <!--Output-->

    <div>
        <slot />
    </div>

    
</template>

<style scoped>
    ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    }

    li {
    float: left;
    }

    li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    }

    li a:hover:not(.active) {
    background-color: #1e4524;
    }

    li a:active {
    background-color: #1a0842;
    }

    .text{
        color: rgb(183, 242, 177);
    }
</style>