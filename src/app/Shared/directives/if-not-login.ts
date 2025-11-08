import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIfNotLogin]'
})
export class IfNotLoginDirective {
  @Input() set appIfNotLogin(condition: boolean) {
    // لو المستخدم مش داخل، نعرض العنصر
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {}
}