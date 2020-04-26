export class Item {
  id: number;
  pulseId: string;
  name: string;
  icon: string;
  color: string;
  value: number;
  amount: number;
  limit: number;
  visible: boolean;

  constructor(options: {
    id: number,
    pulseId: string,
    name: string,
    icon: string,
    color: string,
    value?: number,
    amount?: number,
    limit: number,
    visible?: boolean,
    }) {
    this.id = options.id;
    this.pulseId = options.pulseId;
    this.name = options.name;
    this.icon = options.icon;
    this.color = options.color;
    this.value = options.value || 0;
    this.amount = options.amount || 0;
    this.limit = options.limit;
    this.visible = options.visible || false;
  }
}
