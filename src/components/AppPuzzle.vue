<template>
  <div class="AppPuzzle">
    <div v-for="row in size" :key="'r' + row" class="AppPuzzle-Row">
      <div v-for="col in size" :key="'r' + row + 'c' + col" 
        :class="[baseCellClass, cellClass(row, col)]"
      >
        <span class="AppPuzzle-Cell_Hint" v-if="cellHint(row, col) != null">
          {{cellHint(row, col)}}
        </span>
        <input 
          :ref="'cell' + indexOf(row, col)"
          v-on:keydown="onKeyDown(row, col, $event)"
          v-on:change="onChange(row, col, $event)"
          :value="cellValue(row, col)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface Cell {
  classNames: string;
  operator: string | null;
  result: number | null;
}

interface AppCage extends PuzzleCage {
  indexes: number[];
}

@Component({
  props: {
    cages: Array,
    size: Number,
    solution: Array,
  },
})
export default class Puzzle extends Vue {
  @Prop() private cages: PuzzleCage[];

  @Prop() private size: number;

  @Prop() private solution: number[][];

  private baseCellClass = 'AppPuzzle-Cell';

  private cellValues: { [key: number]: number | null } = {};

  private get appCages(): AppCage[] {
    const size = this.size;

    // Zero-based
    const calcIndex = (e: PuzzleElement) => size * e.row + e.col;
    return this.cages.map(cage =>
      Object.assign({}, cage, { indexes: cage.elements.map(calcIndex) }),
    );
  }

  private get cells() {
    const size = this.size;
    const cells: Cell[] = Array.from(Array(size * size).keys()).map(() => ({
      classNames: '',
      operator: null,
      result: null,
    }));

    // initialize cells class names from boundaries
    this.appCages.forEach(appCage => {
      const { indexes } = appCage;
      indexes.forEach((cellIndex, index) => {
        const cell = cells[cellIndex];
        if (index === 0) {
          cell.result = appCage.value;
          cell.operator = appCage.operator || '÷';
        }

        const prevCellIndex = indexes[index - 1];
        if (prevCellIndex != null) {
          cell.classNames += ` ${cellBoundaryClassName(
            size,
            cellIndex,
            prevCellIndex,
          )}`;
        }

        const nextCellIndex = indexes[index + 1];
        if (nextCellIndex != null) {
          cell.classNames += ` ${cellBoundaryClassName(
            size,
            cellIndex,
            nextCellIndex,
          )}`;
        }
      });
    });

    return cells;
  }

  private onKeyDown(row: number, col: number, event: KeyboardEvent) {
    const { key } = event;
    const size = this.size;
    let nextCellIndex: number | null = null;

    if (key === 'j') {
      let nextRow = row + 1;
      if (nextRow > size) {
        nextRow = 1;
      }
      nextCellIndex = this.indexOf(nextRow, col);
    } else if (key === 'k') {
      let nextRow = row - 1;
      if (nextRow < 1) {
        nextRow = size;
      }
      nextCellIndex = this.indexOf(nextRow, col);
    } else if (key === 'h') {
      let nextCol = col - 1;
      if (nextCol < 1) {
        nextCol = size;
      }
      nextCellIndex = this.indexOf(row, nextCol);
    } else if (key === 'l') {
      let nextCol = col + 1;
      if (nextCol > size) {
        nextCol = 1;
      }

      nextCellIndex = this.indexOf(row, nextCol);
    }
    // TODO: prevent non-number characters. careful not to prevent control keys (Tabs, shift tab, arrows)

    if (nextCellIndex != null) {
      event.preventDefault();
      const nextInputRefs = this.$refs['cell' + nextCellIndex] as HTMLElement[];
      if (nextInputRefs) {
        nextInputRefs[0].focus();
      }
    }
  }

  private onChange(row: number, col: number, event: Event) {
    const cellIndex = this.indexOf(row, col);
    if (event.target instanceof HTMLInputElement) {
      const value = parseInt(event.target.value, 10) || null;
      this.cellValues[cellIndex] = value;
    }
  }

  private cellValue(row: number, col: number) {
    return this.cellValues[this.indexOf(row, col)];
  }

  private fetchCell(row: number, col: number) {
    const cells = this.cells;
    if (cells == null) {
      return null;
    }

    const cellIndex = this.indexOf(row, col);
    const cell = cells[cellIndex];
    if (!cell) {
      return null;
    }

    return cell;
  }

  private cellHint(row: number, col: number) {
    const cellIndex = this.indexOf(row, col);
    const cage = this.findCage(row, col);
    if (cage == null || cage.indexes == null || cage.indexes[0] !== cellIndex) {
      return null;
    }

    const cell = this.cells[cellIndex];
    return `${cell.result}${cell.operator}`;
  }

  private findCage(row: number, col: number) {
    const cellIndex = this.indexOf(row, col);
    return this.appCages.find(
      ({ indexes }) => indexes != null && indexes.indexOf(cellIndex) !== -1,
    );
  }

  private cellClass(row: number, col: number) {
    const cell = this.fetchCell(row, col);
    if (!cell) {
      return '';
    }

    return cell.classNames;
  }

  private indexOf(row: number, col: number) {
    return this.size * (row - 1) + (col - 1);
  }
}

function cellBoundaryClassName(
  size: number,
  reference: number,
  target: number,
) {
  const prefix = 'AppPuzzle-Cell_';
  const difference = reference - target;
  if (Math.abs(difference) === 1) {
    return prefix + (difference > 0 ? 'West' : 'East');
  }

  if (Math.abs(difference) === size) {
    return prefix + (difference > 0 ? 'North' : 'South');
  }

  return '';
}
</script>

<style lang="scss">
$primary: #42b983;
$secondary: #2c3e50;
$border-width: 4px;

.AppPuzzle {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  &-Row {
    display: flex;
    border-left: solid $border-width $secondary;
    border-right: solid $border-width $secondary;

    &:first-child {
      border-top: solid $border-width $secondary;
    }

    &:last-child {
      border-bottom: solid $border-width $secondary;
    }
  }

  &-Cell {
    align-items: center;
    border: solid $border-width $secondary;
    box-sizing: border-box;
    display: flex;
    height: 6rem;
    justify-content: center;
    padding: $border-width;
    position: relative;
    width: 6rem;

    &_North {
      padding-top: $border-width + 1;
      border-top-width: 1px;
    }

    &_East {
      padding-right: $border-width + 1;
      border-right-width: 1px;
    }

    &_South {
      padding-bottom: $border-width + 1;
      border-bottom-width: 1px;
    }

    &_West {
      padding-left: $border-width + 1;
      border-left-width: 1px;
    }

    &_Hint {
      font-size: 0.6rem;
      position: absolute;
      top: 0.3rem;
      left: 0.3rem;
    }

    input {
      background-color: none;
      border: none;
      font-size: 2rem;
      height: 100%;
      text-align: center;
      width: 100%;
    }
  }
}
</style>
