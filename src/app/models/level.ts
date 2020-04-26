export class Level {
  id: number;
  pulseId: string;
  name: string;
  itemsCost?: {
    itemId: number,
    pulseId: string,
    itemAmount: number,
  }[];
  improvements: number[];
  levelSummary: string[];
  current: boolean;

  constructor(options: {
    id: number,
    pulseId: string,
    name: string,
    itemsCost?: {
      itemId: number,
      pulseId: string,
      itemAmount: number,
    }[],
    improvements: number[],
    levelSummary: string[],
    current: boolean,
    }) {
    this.id = options.id;
    this.pulseId = options.pulseId;
    this.name = options.name;
    this.itemsCost = options.itemsCost;
    this.improvements = options.improvements;
    this.levelSummary = options.levelSummary;
    this.current = options.current;
  }
}
