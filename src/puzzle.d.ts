interface PuzzleElement {
  row: number;
  col: number;
}

interface NormalizedPuzzleCage {
  operator: '+' | '-' | '×' | null;
  elements: number[];
  value: number;
}

interface PuzzleCage {
  operator: '+' | '-' | '×' | null;
  elements: PuzzleElement[];
  value: number;
}

interface PuzzleModel {
  size: number;
  solution: number[][];
  cages: PuzzleCage[];
}
