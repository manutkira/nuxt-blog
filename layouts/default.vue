<template>
    <div>
        <the-header @sidenavToggle="displaySidenav = !displaySidenav"/>
        <the-sidenav :show="displaySidenav" @close="displaySidenav = false"/>
        <nuxt/>
    </div>
</template>

<script>
import TheHeader from '@/components/navigation/TheHeader.vue'
import TheSidenav from '@/components/navigation/TheSidenav.vue'
import TheSideNavToggle from '@/components/navigation/TheSidenavToggle.vue'
export default {
    components: {
        TheHeader,
        TheSidenav
    },
    data(){
        return {
            displaySidenav: false
        }
    }
}
</script>

<style >
html {
    font-family: 'Open Sans', sans-serif;
}
body{
    margin: 0;
}
</style>