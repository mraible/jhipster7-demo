import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITag } from '../tag.model';
import { TagService } from '../service/tag.service';

@Component({
  templateUrl: './tag-delete-dialog.component.html',
})
export class TagDeleteDialogComponent {
  tag?: ITag;

  constructor(protected tagService: TagService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tagService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
