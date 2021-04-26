import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TagComponent } from '../list/tag.component';
import { TagDetailComponent } from '../detail/tag-detail.component';
import { TagUpdateComponent } from '../update/tag-update.component';
import { TagRoutingResolveService } from './tag-routing-resolve.service';

const tagRoute: Routes = [
  {
    path: '',
    component: TagComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TagDetailComponent,
    resolve: {
      tag: TagRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TagUpdateComponent,
    resolve: {
      tag: TagRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TagUpdateComponent,
    resolve: {
      tag: TagRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tagRoute)],
  exports: [RouterModule],
})
export class TagRoutingModule {}
