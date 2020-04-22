export class Level {
  id: number;
  name: string;
  itemsCost?: {
    itemId: number,
    itemAmount: number,
  }[];
  improvements: number[];
  levelSummary: string[];
  current: boolean;

  constructor(options: {
    id: number,
    name: string,
    itemsCost?: {
      itemId: number,
      itemAmount: number,
    }[],
    improvements: number[],
    levelSummary: string[],
    current: boolean,
    }) {
    this.id = options.id;
    this.name = options.name;
    this.itemsCost = options.itemsCost;
    this.improvements = options.improvements;
    this.levelSummary = options.levelSummary;
    this.current = options.current;
  }
}
