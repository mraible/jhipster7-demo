import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBlog, Blog } from '../blog.model';
import { BlogService } from '../service/blog.service';

@Injectable({ providedIn: 'root' })
export class BlogRoutingResolveService implements Resolve<IBlog> {
  constructor(protected service: BlogService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBlog> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((blog: HttpResponse<Blog>) => {
          if (blog.body) {
            return of(blog.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Blog());
  }
}
