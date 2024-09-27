import { Component, computed, effect, input, InputSignal, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../../core/directives/click-outside.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ClickOutsideDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  // optional input
  public firstName = input<string>();
  // required input
  public lastName = input.required<string>();
  // transform input
  public disabled = input(false, {
    transform: (v: boolean | string) => typeof v === 'string' ? v === '' : v,
  });



  // definition of a signal
  public counter: WritableSignal<number> = signal(0);

  // 1. set -> rewrite the value of the signal
  public increment() {
    this.counter.set(1);
  }
  // 2. update
  public incrementUpdate() {
    this.counter.update(value => value + 1);
  }


  public count: WritableSignal<number> = signal(0);

  public incrementCount() {
    this.count.update(value => value + 1);
  }

  public doubleCount: Signal<number>
    = computed(() => this.count() * 2);
  // Output: 0 -> 2 -> etc.


  public countEffect = signal(0);

  constructor() {
    effect(() => {
      console.log(this.countEffect());
    });
  }

  public counterEffect = effect(() => {
    const count = this.countEffect();
    console.log(count);
  });

  clickOutside($event: Event) {
    console.log('clickOutside', $event);
  }
}


