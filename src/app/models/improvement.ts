export class Improvement {
  id: number;
  pulseId: string;
  name: string;
  type: string;
  level: number;
  levelMax?: number;
  improveeId: number;
  itemsCost: {
    itemId: number,
    pulseId: string,
    itemAmount: number,
  }[];
  autobuy: boolean;
  costMultiplyer: number;
  improvee: string;
  improves: string;
  improvesByMultiplyer: number;
  improvesByAdder?: number;

  constructor(options: {
    id: number,
    pulseId: string,
    name: string,
    type: string,
    level: number,
    levelMax?: number,
    improveeId: number,
    itemsCost: {
      itemId: number,
      pulseId: string,
      itemAmount: number,
    }[],
    autobuy: boolean,
    costMultiplyer: number,
    improvee: string,
    improves: string,
    improvesByMultiplyer: number,
    improvesByAdder?: number
  }) {
    this.id = options.id;
    this.pulseId = options.pulseId;
    this.name = options.name;
    this.type = options.type;
    this.level = options.level;
    this.levelMax = options.levelMax || 0;
    this.improveeId = options.improveeId;
    this.itemsCost = options.itemsCost;
    this.autobuy = options.autobuy;
    this.costMultiplyer = options.costMultiplyer;
    this.improvee = options.improvee;
    this.improves = options.improves;
    this.improvesByMultiplyer = options.improvesByMultiplyer;
    this.improvesByAdder = options.improvesByAdder || 0;
  }
}
