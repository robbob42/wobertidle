import { Globals } from './globals';

export default [
  {
    id: 1,
    pulseId: 'improvement-1',
    name: 'Interval - 10%',
    type: 'speed',
    level: 1,
    levelMax: 10,
    itemsCost: [{
      itemId: 1,
      itemAmount: 2,
    }],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 1,
    improves: 'actionTime',
    improvesByMultiplyer: .9
  },
  {
    id: 12,
    pulseId: 'improvement-12',
    name: 'Interval - 10%',
    type: 'speed',
    level: 1,
    levelMax: 10,
    itemsCost: [
      {
        itemId: 1,
        pulseId: 'improvement-item-12-1',
        itemAmount: 3,
      },
      {
        itemId: 7,
        pulseId: 'improvement-item-12-7',
        itemAmount: 2,
      }
    ],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 7,
    improves: 'actionTime',
    improvesByMultiplyer: .9
  },
  {
    id: 3,
    pulseId: 'improvement-3',
    name: 'Interval - 10%',
    type: 'speed',
    level: 1,
    levelMax: 10,
    itemsCost: [
      {
        itemId: 1,
        pulseId: 'improvement-item-3-1',
        itemAmount: 4,
      },
      {
        itemId: 7,
        pulseId: 'improvement-item-3-7',
        itemAmount: 3,
      },
      {
        itemId: 3,
        pulseId: 'improvement-item-3-3',
        itemAmount: 2,
      }
    ],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 3,
    improves: 'actionTime',
    improvesByMultiplyer: .9
  },
  {
    id: 2,
    pulseId: 'improvement-2',
    name: 'Interval - 10%',
    type: 'speed',
    level: 1,
    levelMax: 10,
    itemsCost: [
      {
        itemId: 1,
        pulseId: 'improvement-item-2-1',
        itemAmount: 5,
      },
      {
        itemId: 7,
        pulseId: 'improvement-item-2-7',
        itemAmount: 4,
      },
      {
        itemId: 3,
        pulseId: 'improvement-item-2-3',
        itemAmount: 3,
      },
      {
        itemId: 2,
        pulseId: 'improvement-item-2-2',
        itemAmount: 2,
      }
    ],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 2,
    improves: 'actionTime',
    improvesByMultiplyer: .9
  },
  {
    id: 13,
    pulseId: 'improvement-13',
    name: 'Interval - 10%',
    type: 'speed',
    level: 1,
    levelMax: 10,
    itemsCost: [
      {
        itemId: 1,
        pulseId: 'improvement-item-13-1',
        itemAmount: 6,
      },
      {
        itemId: 7,
        pulseId: 'improvement-item-13-7',
        itemAmount: 5,
      },
      {
        itemId: 3,
        pulseId: 'improvement-item-13-3',
        itemAmount: 4,
      },
      {
        itemId: 2,
        pulseId: 'improvement-item-13-2',
        itemAmount: 3,
      },
      {
        itemId: 8,
        pulseId: 'improvement-item-13-8',
        itemAmount: 2,
      }
    ],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 8,
    improves: 'actionTime',
    improvesByMultiplyer: .9
  },
  {
    id: 4,
    pulseId: 'improvement-4',
    name: 'Mining x 2',
    type: 'production',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        pulseId: 'improvement-item-4-902',
        itemAmount: 5
      }
    ],
    costMultiplyer: 1.6,
    improvee: 'activity',
    improveeId: 1,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 14,
    pulseId: 'improvement-14',
    name: 'Collecting x 2',
    type: 'production',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        pulseId: 'improvement-item-14-902',
        itemAmount: 10
      }
    ],
    costMultiplyer: 1.7,
    improvee: 'activity',
    improveeId: 7,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 6,
    pulseId: 'improvement-6',
    name: 'Fishing x 2',
    type: 'production',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        pulseId: 'improvement-item-6-902',
        itemAmount: 15
      }
    ],
    costMultiplyer: 1.8,
    improvee: 'activity',
    improveeId: 3,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 5,
    pulseId: 'improvement-5',
    name: 'Chopping x 2',
    type: 'production',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        pulseId: 'improvement-item-5-902',
        itemAmount: 20
      }
    ],
    costMultiplyer: 1.9,
    improvee: 'activity',
    improveeId: 2,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 15,
    pulseId: 'improvement-15',
    name: 'Harvesting x 2',
    type: 'production',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        pulseId: 'improvement-item-15-902',
        itemAmount: 25
      }
    ],
    costMultiplyer: 2,
    improvee: 'activity',
    improveeId: 8,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 7,
    pulseId: 'improvement-7',
    name: 'Limit x 2',
    type: 'limit',
    level: 1,
    itemsCost: [
      {
        itemId: 1,
        pulseId: 'improvement-item-7-1',
        itemAmount: 20
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 1,
    improves: 'limit',
    improvesByMultiplyer: 2
  },
  {
    id: 10,
    pulseId: 'improvement-10',
    name: 'Limit x 2',
    type: 'limit',
    level: 1,
    itemsCost: [
      {
        itemId: 7,
        pulseId: 'improvement-item-10-7',
        itemAmount: 20
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 7,
    improves: 'limit',
    improvesByMultiplyer: 2
  },
  {
    id: 9,
    pulseId: 'improvement-9',
    name: 'Limit x 2',
    type: 'limit',
    level: 1,
    itemsCost: [
      {
        itemId: 3,
        pulseId: 'improvement-item-9-3',
        itemAmount: 20
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 3,
    improves: 'limit',
    improvesByMultiplyer: 2
  },
  {
    id: 8,
    pulseId: 'improvement-8',
    name: 'Limit x 2',
    type: 'limit',
    level: 1,
    itemsCost: [
      {
        itemId: 2,
        pulseId: 'improvement-item-8-2',
        itemAmount: 20
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 2,
    improves: 'limit',
    improvesByMultiplyer: 2
  },
  {
    id: 11,
    pulseId: 'improvement-11',
    name: 'Limit x 2',
    type: 'limit',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-11-8',
        itemAmount: 20
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 8,
    improves: 'limit',
    improvesByMultiplyer: 2
  },
  {
    id: 16,
    pulseId: 'improvement-16',
    name: 'Human + 1',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: Globals.itemIds.mcp,
        pulseId: 'improvement-item-16-' + Globals.itemIds.mcp,
        itemAmount: 20000
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: Globals.itemIds.human,
    improves: 'amount',
    improvesByMultiplyer: 0,
    improvesByAdder: 1
  },
  {
    id: 17,
    pulseId: 'improvement-17',
    name: 'Finding MCP X 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 1,
        pulseId: 'improvement-item-17-1',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'activity',
    improveeId: 1,
    improves: 'mcProficiency',
    improvesByMultiplyer: 2,
    improvesByAdder: 0
  },
  {
    id: 18,
    pulseId: 'improvement-18',
    name: 'Collecting MCP X 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 7,
        pulseId: 'improvement-item-18-7',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'activity',
    improveeId: 7,
    improves: 'mcProficiency',
    improvesByMultiplyer: 2,
    improvesByAdder: 0
  },
  {
    id: 19,
    pulseId: 'improvement-19',
    name: 'Fishing MCP X 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 3,
        pulseId: 'improvement-item-19-3',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'activity',
    improveeId: 3,
    improves: 'mcProficiency',
    improvesByMultiplyer: 2,
    improvesByAdder: 0
  },
  {
    id: 20,
    pulseId: 'improvement-20',
    name: 'Chopping MCP X 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 2,
        pulseId: 'improvement-item-20-2',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'activity',
    improveeId: 2,
    improves: 'mcProficiency',
    improvesByMultiplyer: 2,
    improvesByAdder: 0
  },
  {
    id: 21,
    pulseId: 'improvement-21',
    name: 'Harvesting MCP X 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-21-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'activity',
    improveeId: 8,
    improves: 'mcProficiency',
    improvesByMultiplyer: 2,
    improvesByAdder: 0
  },
  {
    id: 22,
    pulseId: 'improvement-22',
    name: 'Auto Activity Switcher',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-22-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 904,
    improves: 'amount',
    improvesByMultiplyer: 0,
    improvesByAdder: 1
  },
  {
    id: 23,
    pulseId: 'improvement-23',
    name: 'Mining x 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        pulseId: 'improvement-item-23-902',
        itemAmount: 5
      }
    ],
    costMultiplyer: 1.6,
    improvee: 'activity',
    improveeId: 1,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 24,
    pulseId: 'improvement-24',
    name: 'Collecting x 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        pulseId: 'improvement-item-24-902',
        itemAmount: 10
      }
    ],
    costMultiplyer: 1.7,
    improvee: 'activity',
    improveeId: 7,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 25,
    pulseId: 'improvement-25',
    name: 'Fishing x 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        pulseId: 'improvement-item-25-902',
        itemAmount: 15
      }
    ],
    costMultiplyer: 1.8,
    improvee: 'activity',
    improveeId: 3,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 26,
    pulseId: 'improvement-26',
    name: 'Chopping x 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        pulseId: 'improvement-item-26-902',
        itemAmount: 20
      }
    ],
    costMultiplyer: 1.9,
    improvee: 'activity',
    improveeId: 2,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 27,
    pulseId: 'improvement-27',
    name: 'Harvesting x 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        pulseId: 'improvement-item-27-902',
        itemAmount: 25
      }
    ],
    costMultiplyer: 2,
    improvee: 'activity',
    improveeId: 8,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 28,
    pulseId: 'improvement-28',
    name: 'Allow Refining',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-28-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 905,
    improves: 'amount',
    improvesByMultiplyer: 0,
    improvesByAdder: 1
  },
  {
    id: 29,
    pulseId: 'improvement-29',
    name: 'Exchange Unlocked',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-29-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 906,
    improves: 'amount',
    improvesByMultiplyer: 0,
    improvesByAdder: 1
  },
  {
    id: 30,
    pulseId: 'improvement-30',
    name: 'Rebirth Unlocked',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-30-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 907,
    improves: 'amount',
    improvesByMultiplyer: 0,
    improvesByAdder: 1
  },
  {
    id: 31,
    pulseId: 'improvement-31',
    name: 'Finding Max Speed Increase by 5',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-31-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'improvement',
    improveeId: 1,
    improves: 'levelMax',
    improvesByMultiplyer: 0,
    improvesByAdder: 5
  },
  {
    id: 32,
    pulseId: 'improvement-32',
    name: 'Collecting Max Speed Increase by 5',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-32-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'improvement',
    improveeId: 12,
    improves: 'levelMax',
    improvesByMultiplyer: 0,
    improvesByAdder: 5
  },
  {
    id: 33,
    pulseId: 'improvement-33',
    name: 'Fishing Max Speed Increase by 5',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-33-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'improvement',
    improveeId: 3,
    improves: 'levelMax',
    improvesByMultiplyer: 0,
    improvesByAdder: 5
  },
  {
    id: 34,
    pulseId: 'improvement-34',
    name: 'Chopping Max Speed Increase by 5',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-34-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'improvement',
    improveeId: 2,
    improves: 'levelMax',
    improvesByMultiplyer: 0,
    improvesByAdder: 5
  },
  {
    id: 35,
    pulseId: 'improvement-35',
    name: 'Harvesting Max Speed Increase by 5',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-35-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'improvement',
    improveeId: 13,
    improves: 'levelMax',
    improvesByMultiplyer: 0,
    improvesByAdder: 5
  },
  {
    id: 36,
    pulseId: 'improvement-36',
    name: 'Gem Limit x 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-36-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 4,
    improves: 'limit',
    improvesByMultiplyer: 2
  },
  {
    id: 37,
    pulseId: 'improvement-37',
    name: 'Brick Limit x 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-37-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 9,
    improves: 'limit',
    improvesByMultiplyer: 2
  },
  {
    id: 38,
    pulseId: 'improvement-38',
    name: 'Cooked Fish Limit x 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-38-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 6,
    improves: 'limit',
    improvesByMultiplyer: 2
  },
  {
    id: 39,
    pulseId: 'improvement-39',
    name: 'Board Limit x 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-39-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 5,
    improves: 'limit',
    improvesByMultiplyer: 2
  },
  {
    id: 40,
    pulseId: 'improvement-40',
    name: 'Bread Limit x 2',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-40-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 10,
    improves: 'limit',
    improvesByMultiplyer: 2
  },
  {
    id: 41,
    pulseId: 'improvement-41',
    name: 'Unlock the Demigod Carnival!',
    type: 'mcp',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        pulseId: 'improvement-item-41-8',
        itemAmount: 0
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 908,
    improves: 'amount',
    improvesByMultiplyer: 0,
    improvesByAdder: 1
  }
];
