<template>
    <section>
        <h1 class="title">Projetos</h1>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>
    </section>
</template>

<style scoped>
.projetos{
    padding: 1.25rem;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { store, useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { EDITA_PROJETO, ADICIONA_PROJETO, NOTIFICAR } from '@/store/tipo-mutacoes'

export default defineComponent({
    name: "FormularioView",
    props: {
        id: {
            type: String
        }
    },
    mounted(){
        if(this.id){
            const projeto = this.store.state.projetos.find(proj => proj.id === this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data(){
        return {
            nomeDoProjeto: ""
        };
    },
    methods: {
        salvar(){
            if(this.id){
                // Edit
                this.store.commit(EDITA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            }else{
                // Add
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
            }
            this.nomeDoProjeto = ''
            this.store.commit(NOTIFICAR, {
                titulo: 'Novo projeto salvo',
                texto: 'Novo ',
                tipo: TipoNotificacao.SUCESSO
            })
            this.$router.push('/projetos')
        }
    },
    setup(){
        const store = useStore()
        return {
            store
        }
    }
})
</script>