import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITag, Tag } from '../tag.model';
import { TagService } from '../service/tag.service';

@Injectable({ providedIn: 'root' })
export class TagRoutingResolveService implements Resolve<ITag> {
  constructor(protected service: TagService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITag> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tag: HttpResponse<Tag>) => {
          if (tag.body) {
            return of(tag.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tag());
  }
}
