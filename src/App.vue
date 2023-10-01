<template>
  <main 
    class="columns is-gapless is-multiline" 
    :class="{'modo-escuro' : modoEscuroAtivo}">
    <div class="column is-one-quarter">
      <BarraLateral @alterarTema="alterarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioComponent @aoSalvarTarefa="salvarTarefa"/>
      <!-- Lista de Tarefas -->
      <div class="lista">
        <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <BoxComponent v-if="listaEstaVazia">
          Você não está muito produtivo hj :(
        </BoxComponent>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioComponent from './components/FormularioComponent.vue'
import TarefaComponent from './components/TarefaComponent.vue';
import ITarefa from './interfaces/ITarefa'
import BoxComponent from './components/BoxComponent.vue';

export default defineComponent({
  name: 'App',
  data(){
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false
    }
  },
  components: {
    BarraLateral,
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
    },
    alterarTema(modoEscuroAtivo: boolean){
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  }
});
</script>

<style>
.lista{
  padding: 1.25rem;
}

main{
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro{
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo{
  background-color: var(--bg-primario);
}
</style>
