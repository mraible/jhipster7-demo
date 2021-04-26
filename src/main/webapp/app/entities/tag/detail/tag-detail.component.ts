import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITag } from '../tag.model';

@Component({
  selector: 'jhi-tag-detail',
  templateUrl: './tag-detail.component.html',
})
export class TagDetailComponent implements OnInit {
  tag: ITag | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tag }) => {
      this.tag = tag;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
