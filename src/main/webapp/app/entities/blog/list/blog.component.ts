import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBlog } from '../blog.model';
import { BlogService } from '../service/blog.service';
import { BlogDeleteDialogComponent } from '../delete/blog-delete-dialog.component';

@Component({
  selector: 'jhi-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  blogs?: IBlog[];
  isLoading = false;

  constructor(protected blogService: BlogService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.blogService.query().subscribe(
      (res: HttpResponse<IBlog[]>) => {
        this.isLoading = false;
        this.blogs = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IBlog): number {
    return item.id!;
  }

  delete(blog: IBlog): void {
    const modalRef = this.modalService.open(BlogDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.blog = blog;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
