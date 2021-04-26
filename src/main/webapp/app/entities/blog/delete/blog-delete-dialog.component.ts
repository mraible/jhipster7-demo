import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IBlog } from '../blog.model';
import { BlogService } from '../service/blog.service';

@Component({
  templateUrl: './blog-delete-dialog.component.html',
})
export class BlogDeleteDialogComponent {
  blog?: IBlog;

  constructor(protected blogService: BlogService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.blogService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
