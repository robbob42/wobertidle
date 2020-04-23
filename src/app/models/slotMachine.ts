import { Slot } from './slot';
import { ImprovementService } from '../services/improvement.service';

export class SlotMachine {
  private slots: Array<Slot>[];
  private needsReset = false;
  private winningMatches: string[];
  private winningMapping: number[] = [];

  constructor(
    private improvementService: ImprovementService
  ) {
    this.initialize();

    this.winningMapping[0] = 36;
    this.winningMapping[1] = 37;
    this.winningMapping[2] = 38;
    this.winningMapping[3] = 39;
    this.winningMapping[4] = 40;
  }

  initialize() {
    this.slots = [
      [new Slot(0, 0), new Slot(0, 1), new Slot(0, 2)],
      [new Slot(1, 0), new Slot(1, 1), new Slot(1, 2)],
      [new Slot(2, 0), new Slot(2, 1), new Slot(2, 2)]
    ];

    this.winningMatches = [];
  }

  activateRow(rowNum: number) {
    const BreakException = {};
    try {
      this.slots[rowNum].forEach(slot => {
        if (!slot.getActive()) {
          slot.readyToGo();
          throw BreakException;
        }
      });
    } catch (e) {
      if (e !== BreakException) {
        throw e;
      }
    }
  }

  getSlots() {
    return this.slots;
  }

  getNeedsReset() {
    return this.needsReset;
  }

  getWinningMatches() {
    return this.winningMatches;
  }

  getWinningMapping() {
    return this.winningMapping;
  }

  getRowActives(row: number) {
    return this.slots[row];
  }

  pullHandle() {
    const promises: Promise<any>[] = [];
    this.slots.forEach(slotRow => {
      slotRow.forEach(slot => {
        if (slot.getActive()) {
          promises.push(slot.roll());
        }
      });
    });

    Promise.all(promises)
    .then((values) => {
      const winnings = this.checkResults([
        [
          new Slot(0, 0, values.find((value) => value.row === 0 && value.col === 0)?.value),
          new Slot(0, 1, values.find((value) => value.row === 0 && value.col === 1)?.value),
          new Slot(0, 2, values.find((value) => value.row === 0 && value.col === 2)?.value),
        ],
        [
          new Slot(1, 0, values.find((value) => value.row === 1 && value.col === 0)?.value),
          new Slot(1, 1, values.find((value) => value.row === 1 && value.col === 1)?.value),
          new Slot(1, 2, values.find((value) => value.row === 1 && value.col === 2)?.value),
        ],
        [
          new Slot(2, 0, values.find((value) => value.row === 2 && value.col === 0)?.value),
          new Slot(2, 1, values.find((value) => value.row === 2 && value.col === 1)?.value),
          new Slot(2, 2, values.find((value) => value.row === 2 && value.col === 2)?.value),
        ]
      ]);

      if (winnings) {
        winnings.forEach(winningId => {
          this.improvementService.buyImprovement(this.winningMapping[winningId], true);
        });
      }
      this.needsReset = true;
    });
  }

  checkResults(checkSlots: Array<Slot>[]) {
    // Check horizontals
    [0, 1, 2].forEach(slotRow => {
      if (this.allEqual([
        checkSlots[slotRow][0].getCurValue(),
        checkSlots[slotRow][1].getCurValue(),
        checkSlots[slotRow][2].getCurValue()
      ])) {
        this.winningMatches.push(checkSlots[slotRow][0].getCurValue());
      }
    });
    // Check verticals
    [0, 1, 2].forEach(slotCol => {
      if (this.allEqual([
        checkSlots[0][slotCol].getCurValue(),
        checkSlots[1][slotCol].getCurValue(),
        checkSlots[2][slotCol].getCurValue()
      ])) {
        this.winningMatches.push(checkSlots[0][slotCol].getCurValue());
      }
    });
    // Check diagonals
    if (this.allEqual([
      checkSlots[0][0].getCurValue(),
      checkSlots[1][1].getCurValue(),
      checkSlots[2][2].getCurValue()
    ])) {
      this.winningMatches.push(checkSlots[0][0].getCurValue());
    }
    if (this.allEqual([
      checkSlots[0][2].getCurValue(),
      checkSlots[1][1].getCurValue(),
      checkSlots[2][0].getCurValue()
    ])) {
      this.winningMatches.push(checkSlots[0][2].getCurValue());
    }

    return this.winningMatches;
  }

  allEqual(arr: any[]) {
    if (arr[0] !== ' ') {
      return arr.every(v => v === arr[0]);
    }
    return false;
  }

  reset() {
    this.initialize();
    this.needsReset = false;
  }
}
