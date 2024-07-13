import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Product[], filtertext: string): Product[] {
    filtertext = filtertext?filtertext.toLocaleLowerCase():""
    return filtertext?value.filter((p:Product)=>p.productName.toLocaleLowerCase().indexOf(filtertext)!==-1):value;
  }

}
