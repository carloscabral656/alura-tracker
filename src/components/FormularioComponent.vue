<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulario para a criação de uma nova tarefa">
                <input 
                type="text" 
                class="input" 
                placeholder="Qual a tarefa você deseja iniciar?"
                v-model="descricaoTarefa">
            </div>

            <div class="column">
                <TemporizadorComponent @aoTemporizadorFinalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>


<style>
.formulario{
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>


<script lang="ts">
import { defineComponent } from 'vue';
import TemporizadorComponent from '@/components/TemporizadorComponent.vue'

export default defineComponent({
    name: "FormularioComponent",
    emits: ['aoSalvarTarefa'],
    components: {
        TemporizadorComponent
    },
    data(){
        return {
            descricaoTarefa: ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number) : void{
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricaoTarefa
            })
            this.descricaoTarefa = ''
        }
    }
})
</script>