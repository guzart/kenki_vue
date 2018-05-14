<template>
  <div id="app">
    <AppPuzzle v-if="size > 0" :size="size" :cages="cages" :solution="solution" />
    <div v-else id="file-drop"></div>
  </div>
</template>

<script lang="ts">
import * as UppyCore from 'uppy/lib/core';
import * as UppyDragDrop from 'uppy/lib/plugins/DragDrop';
import { Component, Vue } from 'vue-property-decorator';
import AppPuzzle from './components/AppPuzzle.vue';

@Component({
  components: {
    AppPuzzle,
  },
})
export default class App extends Vue {
  private uppyInstance: any;

  private size: number = 0;

  private cages: PuzzleCage[] = [];

  private solution: number[][] = [];

  private mounted() {
    this.uppyInstance = UppyCore();
    this.uppyInstance
      .use(UppyDragDrop, { target: '#file-drop', allowMultipleFiles: false })
      .run()
      .on('complete', (result: any) => {
        if (result.successful && result.successful.length > 0) {
          const file = result.successful[0].data;
          const reader = new FileReader();
          reader.onload = event => {
            const target = event.target as any;
            const puzzle = JSON.parse(target.result) as PuzzleModel;
            this.size = puzzle.size;
            this.cages = puzzle.cages;
            this.solution = puzzle.solution;
          };
          reader.readAsText(file);
        }
      });
  }

  private beforeDestroy() {
    if (this.uppyInstance) {
      this.uppyInstance.close();
    }
  }
}
</script>

<style lang="scss">
@import '~uppy/src/scss/uppy';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
