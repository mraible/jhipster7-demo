jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IBlog, Blog } from '../blog.model';
import { BlogService } from '../service/blog.service';

import { BlogRoutingResolveService } from './blog-routing-resolve.service';

describe('Service Tests', () => {
  describe('Blog routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: BlogRoutingResolveService;
    let service: BlogService;
    let resultBlog: IBlog | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(BlogRoutingResolveService);
      service = TestBed.inject(BlogService);
      resultBlog = undefined;
    });

    describe('resolve', () => {
      it('should return IBlog returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBlog = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultBlog).toEqual({ id: 123 });
      });

      it('should return new IBlog if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBlog = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultBlog).toEqual(new Blog());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBlog = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultBlog).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
