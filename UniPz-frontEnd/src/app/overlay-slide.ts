import { trigger, transition, style, animate, query } from '@angular/animations';


export const overlaySlide = trigger('routeAnimations', [


  transition('* => About', [
    query(':enter', [
      style({ position:'fixed', width:'100%', transform:'translateY(100%)', opacity:0 }),
      animate('450ms ease-out', style({ transform:'translateY(0)', opacity:1 }))
    ], { optional:true })
  ]),


  transition('About => *', [
    query(':leave', [
      style({ position:'fixed', width:'100%' }),
      animate('450ms ease-in', style({ transform:'translateY(100%)', opacity:0 }))
    ], { optional:true })
  ]),

  transition('* => Dept', [
    query(':enter', [
      style({ position:'fixed', width:'100%', transform:'translateY(100%)', opacity:0 }),
      animate('450ms ease-out', style({ transform:'translateY(0)', opacity:1 }))
    ], { optional:true })
  ]),
  transition('Dept => *', [
    query(':leave', [
      style({ position:'fixed', width:'100%' }),
      animate('450ms ease-in', style({ transform:'translateY(100%)', opacity:0 }))
    ], { optional:true })
  ]),

]);

