export class Activity {
  id: number;
  pulseId: string;
  name: string;
  type: string;
  active: boolean;
  color: string;
  produces: string;
  produceAmount: number;
  decrementId: number;
  decrementAmount: number;
  producesId: number;
  actionTime: number;
  mcProficiency: number;
  mcpTriggerAmount: number;
  trigger: number;
  triggered: boolean;
  mcpDiscoverAmount: number;
  discovered: boolean;
  visible: boolean;

  constructor(options: {
    id: number,
    pulseId: string,
    name: string,
    type?: string,
    active?: boolean,
    color: string,
    produces: string,
    produceAmount: number,
    decrementId?: number,
    decrementAmount?: number,
    producesId: number,
    actionTime: number,
    mcProficiency?: number,
    mcpTriggerAmount: number,
    trigger?: number,
    triggered: boolean,
    mcpDiscoverAmount: number,
    discovered: boolean,
    visible?: boolean
  }) {
    this.id = options.id;
    this.pulseId = options.pulseId;
    this.name = options.name;
    this.type = options.type || '';
    this.active = options.active || false;
    this.color = options.color;
    this.produces = options.produces;
    this.produceAmount = options.produceAmount;
    this.decrementId = options.decrementId || 0
    ;
    this.decrementAmount = options.decrementAmount || 0;
    this.producesId = options.producesId;
    this.actionTime = options.actionTime;
    this.mcProficiency = options.mcProficiency || 1;
    this.mcpTriggerAmount = options.mcpTriggerAmount;
    this.trigger = options.trigger || 0;
    this.triggered = options.triggered;
    this.mcpDiscoverAmount = options.mcpDiscoverAmount;
    this.discovered = options.discovered;
    this.visible = options.visible || false;
  }
}
