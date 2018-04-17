import {
  Component, OnInit, HostListener, ElementRef, ChangeDetectorRef,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { HoverContainerAnimations } from './hover.animation';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hover-container',
  template: `
    <ng-content></ng-content>
    <div class="overlay" 
        *ngIf="state" 
        [@hover]="state" 
        (@hover.done)="onDone($event)">
      <ng-content select="[overlay]"></ng-content>
    </div>`,
  styleUrls: ['./hover-container.component.css'],
  animations: HoverContainerAnimations,
})
export class HoverContainerComponent {
  state;
  constructor(private cdr:ChangeDetectorRef) {}

  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onHover(event: MouseEvent) {
    const direction = event.type === 'mouseenter' ? 'in' : 'out';
    const host = event.target as HTMLElement;
    const host2 = host.lastElementChild as HTMLElement;
    const w = host2.offsetWidth;
    const h = host2.offsetHeight;
    const x = (event.offsetX - host2.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
    const y = (event.offsetY - host2.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);


    const states = ['top', 'right', 'bottom', 'left'];
    const side = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    this.state = `${direction}-${states[side]}`;
    this.cdr.detectChanges();
  }

  onDone(event: AnimationEvent) {
    this.state = event.toState.startsWith('out-') ? null : this.state;
    this.cdr.detectChanges();
  }


}
