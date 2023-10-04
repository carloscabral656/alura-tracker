<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulario para a criação de uma nova tarefa">
                <input 
                type="text" 
                class="input" 
                placeholder="Qual a tarefa você deseja iniciar?"
                v-model="descricaoTarefa">
            </div>

            <div class="column is-3">
                <div class="select">
                <select v-model="idProjeto">
                    <option value="">Selecione o projeto</option>
                    <option
                    :value="projeto.id"
                    v-for="projeto in projetos"
                    :key="projeto.id"
                    >
                    {{ projeto.nome }}
                    </option>
                </select>
                </div>
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
import { useStore } from 'vuex';
import { key } from "@/store"
import IProjeto from '@/interfaces/IProjeto';

export default defineComponent({
    name: "FormularioComponent",
    emits: ['aoSalvarTarefa'],
    components: {
        TemporizadorComponent
    },
    setup(){
        const store = useStore(key)
        return {
            projetos: store.state.projetos
        }
    },
    data(){
        return {
            descricaoTarefa: '',
            idProjeto: ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number) : void{
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricaoTarefa,
                projeto: this.projetos.find( (proj: IProjeto) => proj.id === this.idProjeto)
            })
            this.descricaoTarefa = ''
        }
    }
})
</script>