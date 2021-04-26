import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { BlogService } from '../service/blog.service';

import { BlogComponent } from './blog.component';

describe('Component Tests', () => {
  describe('Blog Management Component', () => {
    let comp: BlogComponent;
    let fixture: ComponentFixture<BlogComponent>;
    let service: BlogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [BlogComponent],
      })
        .overrideTemplate(BlogComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BlogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(BlogService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.blogs?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
