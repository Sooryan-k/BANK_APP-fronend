import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allTransaction: any[], searchTerm: string,propertyName:string): any {
    const result:any=[]
    
    if (!allTransaction || searchTerm==''||propertyName=='') {
      return allTransaction;
    }
    allTransaction.forEach((item:any)=>{
      if(item[propertyName].trim().toLowerCase().startsWith(searchTerm.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result
  }

}
