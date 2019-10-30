import {trigger, transition, state, animate, animation, style, keyframes, useAnimation, query, stagger} from '@angular/animations';

export let slideProducts = trigger('slideProducts', [
  transition('* => *', [
    query('.ft-recipe', style({transform: 'translateY(400px)', opacity: '0'})),
    query('.ft-recipe',
      stagger('200ms', [
        animate('500ms', style({transform: 'translateY(0)', opacity: '1'}))
      ]))
  ]),
]);

export let slideFilter = trigger('slideFilter', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate(800)
  ])
]);

export let singleSidebar = trigger('singleSidebar', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate(500)
  ])
]);

export let fadeInAnimation = animation([
  style({ opacity: 0 }),
  animate('{{ duration }} {{ easing }}')
], {
  params: {
    duration: '500ms',
    easing: 'ease-out'
  }
});

export let fade = trigger('fade', [

  transition(':enter',
    useAnimation(fadeInAnimation)
  ),

  transition(':leave', [
    animate(500, style({ opacity: 0 }))
  ])
]);
