import { Activity } from '../app/models/activity';
import { Item } from '../app/models/item';
import { Improvement } from '../app/models/improvement';
import { Level } from '../app/models/level';

export class Globals {
  public static version = '0.0.2';
  public static superSecretKey = 'wobert';
  public static winAmt = 20000;
  public static itemIds = {
    mcp: 900,
    human: 901,
    money: 902,
    demigod: 903,
    autoActivitySwitcher: 904,
    allowRefining: 905,
    exchangeUnlocked: 906,
    rebirthUnlocked: 907,
    carnivalUnlocked: 908
  };
  public static visibleAmounts = {
    raw: 0,
    limit: 0,
    speed: 250,
    shop: 300,
    exchange: 12000,
    production: 12000,
    money: 12000,
    refine: 30000,
    rebirth: 46368,
    powers: 2584,
  };
  public static blankItem: Item = {
    id: 0,
    pulseId: '',
    amount: 0,
    color: '',
    icon: '',
    limit: 0,
    name: '',
    value: 0,
    visible: false
  };
  public static blankLevel: Level = {
    id: 0,
    pulseId: '',
    name: '',
    itemsCost: [{
      itemId: 0,
      pulseId: '',
      itemAmount: 0
    }],
    improvements: [0],
    levelSummary: [''],
    current: false,
  };
  public static activitySets: number[][] = [
    [1, 7, 3, 2, 8],
    [4, 9, 6, 5, 10]
  ];
  public static blankActivity: Activity = {
    id: 0,
    pulseId: '',
    type: '',
    name: '',
    active: false,
    color: '',
    produces: '',
    produceAmount: 0,
    producesId: 0,
    actionTime: 0,
    mcpTriggerAmount: 0,
    triggered: false,
    mcpDiscoverAmount: 0,
    discovered: false,
    decrementId: 0,
    decrementAmount: 0,
    mcProficiency: 0,
    trigger: 0,
    visible: false
  };
  public static blankImprovement: Improvement = {
    id: 0,
    pulseId: '',
    costMultiplyer: 0,
    improvee: '',
    improveeId: 0,
    improves: '',
    improvesByMultiplyer: 0,
    itemsCost: [{
      itemId: 0,
      pulseId: '',
      itemAmount: 0
    }],
    level: 0,
    name: '',
    type: ''
  };
}
