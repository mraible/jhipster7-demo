import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PostComponent } from '../list/post.component';
import { PostDetailComponent } from '../detail/post-detail.component';
import { PostUpdateComponent } from '../update/post-update.component';
import { PostRoutingResolveService } from './post-routing-resolve.service';

const postRoute: Routes = [
  {
    path: '',
    component: PostComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PostDetailComponent,
    resolve: {
      post: PostRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PostUpdateComponent,
    resolve: {
      post: PostRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PostUpdateComponent,
    resolve: {
      post: PostRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(postRoute)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
