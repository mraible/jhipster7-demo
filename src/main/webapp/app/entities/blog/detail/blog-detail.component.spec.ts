import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogDetailComponent } from './blog-detail.component';

describe('Component Tests', () => {
  describe('Blog Management Detail Component', () => {
    let comp: BlogDetailComponent;
    let fixture: ComponentFixture<BlogDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [BlogDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ blog: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(BlogDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BlogDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load blog on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.blog).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
