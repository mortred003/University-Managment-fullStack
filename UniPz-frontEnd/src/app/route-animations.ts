import {
  trigger, transition, style, animate, query
} from '@angular/animations';


export const overlaySlide = trigger('routeAnimations', [

  transition('* => About', [   // any page → About   (pull-up)
    query(':enter', [
      style({ transform: 'translateY(100%)', opacity: 0, position: 'fixed', width: '100%' }),
      animate('450ms ease', style({ transform: 'translateY(0)', opacity: 1 }))
    ], { optional: true })
  ]),

  transition('About => *', [
    query(':leave', [
      style({ position: 'fixed', width: '100%' }),
      animate('450ms ease', style({ transform: 'translateY(100%)', opacity: 0 }))
    ], { optional: true })
  ])

]);
