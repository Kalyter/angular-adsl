import {trigger, group, query, animate, transition, style, animateChild} from '@angular/animations';

export const fadeInAnimation =
  trigger('fadeInAnimation', [
    transition('* <=> *', [
      query(':enter, :leave', style({ position: 'absolute', opacity: 1, width: '95%' }),{ optional: true }),
      group([
        query(':enter', [
          style({ opacity:0 }),
          animate('1000ms ease-in-out', style({ opacity:1 }))
        ],{ optional: true }),
        query(':leave', [
          style({ opacity:1 }),
          animate('1000ms ease-in-out', style({ opacity:0 }))],{ optional: true }),
      ])
    ])
  ]);
