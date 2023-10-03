<template>
    <FormularioComponent @aoSalvarTarefa="salvarTarefa"/>
    <!-- Lista de Tarefas -->
    <div class="lista">
        <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <BoxComponent v-if="listaEstaVazia">
            Você não está muito produtivo hj :(
        </BoxComponent>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import FormularioComponent from '../components/FormularioComponent.vue'
import TarefaComponent from '../components/TarefaComponent.vue';
import ITarefa from '../interfaces/ITarefa'
import BoxComponent from '../components/BoxComponent.vue';

export default defineComponent({
    name: 'TarefasView',
    data(){
        return {
            tarefas: [] as ITarefa[]
        }
    },
    components: {
        FormularioComponent,
        TarefaComponent,
        BoxComponent
    },
    computed: {
        listaEstaVazia() : boolean{
            return this.tarefas.length === 0
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa){
            this.tarefas.push(tarefa)
        }
    }
    });
</script>

<style>

</style>
  