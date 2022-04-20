import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { UsersService } from './users.service';

@Directive({
  selector: '[uniqueEmail]',
  providers: [{ provide : NG_ASYNC_VALIDATORS, useExisting : ValidatorDirective, multi : true}]
})
export class ValidatorDirective implements AsyncValidator{

  constructor(private userService : UsersService) {}

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.getemailparams(c.value).pipe(
      map(users => {
        return users ? { 'uniqueEmail' : true} : null 
      })
    )
  }

}
