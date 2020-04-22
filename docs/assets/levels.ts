import { Globals } from './globals';

export default [
  {
    id: 0,
    name: 'Barely Demi',
    improvements: [],
    levelSummary: [''],
    current: true
  },
  {
    id: 1,
    name: 'Semi Demi',
    improvements: [
      17,
      18,
      19,
      20,
      21
    ],
    levelSummary: [
      'Obtaining Raw Materials will generate twice as much Mind Control Power!'
    ],
    current: false
  },
  {
    id: 2,
    name: 'Junior Demi',
    improvements: [
      23,
      24,
      25,
      26,
      27
    ],
    levelSummary: [
      'Obtaining Raw Materials will produce twice as much!'
    ],
    current: false
  },
  {
    id: 3,
    name: 'Assistant Demi',
    improvements: [
      17,
      18,
      19,
      20,
      21,
      22
    ],
    levelSummary: [
      'Humans will automatically move to another activity when current inventory is full!',
      'Double the Mind Control Power again.'
    ],
    current: false
  }
];

// improvements: [
//   1, // Raw Activities Speed * 0.9
//   12,
//   3,
//   2,
//   13,
//   7, // Raw Activities Limit * 2
//   10,
//   9,
//   8,
//   11,
//   16, // Human + 1
// ]
