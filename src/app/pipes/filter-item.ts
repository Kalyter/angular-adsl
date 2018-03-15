import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbyunder',
  pure: false
})
export class FilterItemPipe implements PipeTransform {

  transform(items: any[], field : string, value : string): any[] {

    if (!items) return [];

    if (!value || value.length == 0) return items;
      console.log(items[3]);
    return items.filter(it =>
      it[field].indexOf(value) != -1);
  }

}
