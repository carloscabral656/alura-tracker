<template>
    <BoxComponent> 
        <div class="columns">
            <div class="column is-4">
                {{tarefa.descricao || 'Tarefa sem descrição'}}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>
            <div class="column">
                <CronometroComponent :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </BoxComponent> 
</template>


<style scoped>
</style>


<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CronometroComponent from './CronometroComponent.vue';
import ITarefa from '@/interfaces/ITarefa';
import BoxComponent from './BoxComponent.vue';

export default defineComponent({
    name: "TarefaComponent",
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    components: {
        CronometroComponent,
        BoxComponent
    }
})
</script>