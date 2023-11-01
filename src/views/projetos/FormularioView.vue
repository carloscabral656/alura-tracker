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
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { EDITA_PROJETO, ADICIONA_PROJETO } from '@/store/tipo-mutacoes'
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipo-acoes'
import { notificacaoMixin } from '@/mixins/notificar'
import useNotificador from'@/hooks/notificador'

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
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                }).then(() => {
                    this.lidarComSucesso()
                });
            }else{
                this
                .store
                .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
                .then(() => {
                    this.lidarComSucesso()
                });
            }
        },

        lidarComSucesso(){
            this.nomeDoProjeto = ''
            this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O projeto foi cadastrado com sucesso!')
            this.$router.push('/projetos')
        }
    },
    setup(){
        const store = useStore()
        const { notificar } = useNotificador() 
        return {
            store, 
            notificar
        }
    }
})
</script>