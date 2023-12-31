import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, DEFINIR_PROJETOS, EDITA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { OBTER_OBJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO } from "./tipo-acoes";
import http from "@/http";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },

        [EDITA_PROJETO](state, projeto: IProjeto){
            const index = state.projetos.findIndex( proj => proj.id === projeto.id )
            state.projetos[index] = projeto
        },

        [DEFINIR_PROJETOS](state, projetos: IProjeto[]){
            state.projetos = projetos
        },

        [EXCLUIR_PROJETO](state, id: string){
            state.projetos = state.projetos.filter( proj => proj.id != id )
        },

        [NOTIFICAR](state, novaNotificacao: INotificacao){
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id !== novaNotificacao.id)
            }, 3000)
        }
    },
    actions: {
        [OBTER_OBJETOS] ({commit}){
            http
            .get('projetos')
            .then((resp) => {
                commit(DEFINIR_PROJETOS, resp.data)
            });
        },

        [CADASTRAR_PROJETO] (contexto, nomeDoProjeto: string){
            return http.post('/projetos', {
                nome: nomeDoProjeto
            });
        },

        [ALTERAR_PROJETO] (contexto, projeto: IProjeto){
            return http.put(`/projetos/${projeto.id}`, projeto);
        },

        [REMOVER_PROJETO] ({commit}, id: string){
            return http
            .delete(`/projetos/${id}`)
            .then(() => {
                commit(EXCLUIR_PROJETO, id)
            });
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}