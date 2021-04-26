import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { BlogComponent } from '../list/blog.component';
import { BlogDetailComponent } from '../detail/blog-detail.component';
import { BlogUpdateComponent } from '../update/blog-update.component';
import { BlogRoutingResolveService } from './blog-routing-resolve.service';

const blogRoute: Routes = [
  {
    path: '',
    component: BlogComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BlogDetailComponent,
    resolve: {
      blog: BlogRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BlogUpdateComponent,
    resolve: {
      blog: BlogRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BlogUpdateComponent,
    resolve: {
      blog: BlogRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(blogRoute)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
