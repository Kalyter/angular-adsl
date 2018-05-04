import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbyunder',
  pure: false
})
export class FilterItemPipe implements PipeTransform {

  transform(items: any[], field : string, value: any, operator: string): any[] {

    if (!items) return [];
    if (!field) return items;
    if (!value) return items;
    if(value === "undefined") value = null;

      function filtrerParField(obj) {
        switch (operator) {
          case "<":
            return obj[field]<value;
          case "<=":
            return obj[field]<=value;
          case ">":
            return obj[field]>value;
          case ">=":
            return obj[field]>=value;
          case "==":
            return obj[field]===value;
          case "!=":
            return obj[field]!=value;
          default:
            return obj[field]==value;
        }

      }

      return items.filter(filtrerParField);

  }

}
