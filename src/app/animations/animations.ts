import {trigger, transition, state, animate, animation, style, keyframes, useAnimation, query, stagger} from '@angular/animations';


/**
 * slideFilter - animation, used for animate the sidebar of filters
 */
export let slideFilter = trigger('slideFilter', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate(800)
  ])
]);

/** This animation is a part of the fade animation */
export let fadeInAnimation = animation([
  style({ opacity: 0 }),
  animate('{{ duration }} {{ easing }}')
], {
  params: {
    duration: '500ms',
    easing: 'ease-out'
  }
});

/** fade - animation, used to animate the variations and the single variation content  */
export let fade = trigger('fade', [

  transition(':enter',
    useAnimation(fadeInAnimation)
  ),

  transition(':leave', [
    animate(500, style({ opacity: 0 }))
  ])
]);
