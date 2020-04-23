export class Slot {
  private curValue: string;
  private active = false;
  public myRow: number;
  public myCol: number;

  constructor(row: number, col: number, val: string | null = null) {
    this.curValue = ' ';
    this.myRow = row;
    this.myCol = col;
    if (val) {
      this.curValue = val;
    }
  }

  readyToGo() {
    this.curValue = '*';
    this.active = true;
  }

  roll() {
    return new Promise((resolve) => {
      this.curValue = Math.round(Math.random() * 4).toString(16);
      this.active = false;
      resolve({
        row: this.myRow,
        col: this.myCol,
        value: this.curValue
      });
    });
  }

  getCurValue() {
    return this.curValue;
  }
  getActive() {
    return this.active;
  }
  setActive(active: boolean) {
    this.active = active;
  }
}
