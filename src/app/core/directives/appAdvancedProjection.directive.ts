import { CommonModule } from '@angular/common';
import { Component, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAppAdvancedProjection]',
  standalone: true,
})
export class AppAdvancedProjectionDirective<T> {
  @Input() set appAdvancedProjection(context: T) {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef, context);
  }

  static ngTemplateContextGuard<T>(dir: AppAdvancedProjectionDirective<T>, ctx: any): ctx is T {
    return true;
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppAdvancedProjectionDirective,
    CommonModule,
  ],
  template: `
    <ng-template #content let-name let-age="age">
      <p>Name: {{ name }}</p>
      <p>Age: {{ age }}</p>
    </ng-template>

    <div *appAdvancedProjection="{ $implicit: 'John', age: 30 }" [ngTemplateOutlet]="content"></div>
  `,
})
export class AppComponent { }