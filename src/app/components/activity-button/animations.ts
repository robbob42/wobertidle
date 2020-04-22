import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export let slide = trigger('slide', [
  state('left', style({
    transform: 'translateX(0)',
    marginBottom: '8px'
  })),
  state('right', style({
    color: 'white',
    transform: 'translateX(20px)',
    marginBottom: '8px',
    backgroundColor: '{{activityColor}}'
  }),  {params: {activityColor: 'white'}}),
  transition('left <=> right', [
    animate(70)
  ])
]);
