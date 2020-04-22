import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
  state
} from '@angular/animations';

export let pulse = trigger('pulse', [
  state(
    'void',
    style({ transform: 'scale(1) rotate(90deg)', left: '0' })
  ),
  state(
    'bounced',
    style({ transform: 'scale(1) rotate(90deg)', left: '{{left}}' }),
    { params: {left: '0em'}}
  ),
  transition(
    ':enter',
    animate(
      '{{ timings }}',
      keyframes([
        style({ transform: 'scale(1) rotate(90deg)', offset: 0, left: '{{left}}' }),
        style({ transform: 'scale({{ scale }}) rotate(90deg)', offset: 0.5, left: '{{bounceLeft}}' }),
        style({ transform: 'scale(1) rotate(90deg)', offset: 1, left: '{{left}}' })
      ])
    ),
    {
      params: {
        timings: '600ms cubic-bezier(.11,.44,.44,.43)',
        scale: 1.3,
        top: 0,
        left: '0em',
        bounceLeft: '20'
      }
    }
  )
]);
