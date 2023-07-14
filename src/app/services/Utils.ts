import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
  transform(productList: any[], params: string): any {
      // I am unsure what id is here. did you mean title?
      return productList.filter(product => product.tag == params);
  }
}
