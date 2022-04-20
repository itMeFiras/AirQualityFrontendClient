import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { UsersService } from './users.service';

@Directive({
  selector: '[uniqueName]',
  providers: [{ provide : NG_ASYNC_VALIDATORS, useExisting : UniqueNameDirective, multi : true}]
})
export class UniqueNameDirective implements AsyncValidator{

  constructor(private userService : UsersService) {}

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.getnameparams(c.value).pipe(
      map(users => {
        return users ? { 'uniqueName' : true} : null 
      })
    )
  }

}
