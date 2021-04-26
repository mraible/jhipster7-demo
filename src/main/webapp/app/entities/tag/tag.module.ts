import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TagComponent } from './list/tag.component';
import { TagDetailComponent } from './detail/tag-detail.component';
import { TagUpdateComponent } from './update/tag-update.component';
import { TagDeleteDialogComponent } from './delete/tag-delete-dialog.component';
import { TagRoutingModule } from './route/tag-routing.module';

@NgModule({
  imports: [SharedModule, TagRoutingModule],
  declarations: [TagComponent, TagDetailComponent, TagUpdateComponent, TagDeleteDialogComponent],
  entryComponents: [TagDeleteDialogComponent],
})
export class TagModule {}
