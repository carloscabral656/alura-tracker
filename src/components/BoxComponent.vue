<template>
    <div class="box has-text-weight-bold" :style="estilos">
        <slot></slot>
    </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "BoxComponent",
    data(){
        return {
            estilos: {
                backgroundColor: '#FAF0CA'
            }
        }
    }
})
</script>