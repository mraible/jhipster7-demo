import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { BlogComponent } from './list/blog.component';
import { BlogDetailComponent } from './detail/blog-detail.component';
import { BlogUpdateComponent } from './update/blog-update.component';
import { BlogDeleteDialogComponent } from './delete/blog-delete-dialog.component';
import { BlogRoutingModule } from './route/blog-routing.module';

@NgModule({
  imports: [SharedModule, BlogRoutingModule],
  declarations: [BlogComponent, BlogDetailComponent, BlogUpdateComponent, BlogDeleteDialogComponent],
  entryComponents: [BlogDeleteDialogComponent],
})
export class BlogModule {}
