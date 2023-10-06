<template>
  <main 
    class="columns is-gapless is-multiline" 
    :class="{'modo-escuro' : modoEscuroAtivo}">
    <div class="column is-one-quarter">
      <BarraLateral @alterarTema="alterarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <NotificacaoComponent />
      <!-- Aqui vai a view correspondente  -->
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import NotificacaoComponent from '@/components/NotificacaoComponent.vue'

export default defineComponent({
  name: 'App',
  data(){
    return {

    }
  },
  components: {
    BarraLateral,
    NotificacaoComponent
  },
  computed: {
    
  },
  methods: {
    
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
