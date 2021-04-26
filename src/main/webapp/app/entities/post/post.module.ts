import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { PostComponent } from './list/post.component';
import { PostDetailComponent } from './detail/post-detail.component';
import { PostUpdateComponent } from './update/post-update.component';
import { PostDeleteDialogComponent } from './delete/post-delete-dialog.component';
import { PostRoutingModule } from './route/post-routing.module';

@NgModule({
  imports: [SharedModule, PostRoutingModule],
  declarations: [PostComponent, PostDetailComponent, PostUpdateComponent, PostDeleteDialogComponent],
  entryComponents: [PostDeleteDialogComponent],
})
export class PostModule {}
