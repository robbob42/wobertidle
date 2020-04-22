export class Message {
  text: string;
  triggerId: number;

  constructor(text: string, triggerId: number = 0) {
    this.text = text;
    this.triggerId = triggerId;
  }
}
