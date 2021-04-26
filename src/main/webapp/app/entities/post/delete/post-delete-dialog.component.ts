import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPost } from '../post.model';
import { PostService } from '../service/post.service';

@Component({
  templateUrl: './post-delete-dialog.component.html',
})
export class PostDeleteDialogComponent {
  post?: IPost;

  constructor(protected postService: PostService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.postService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
