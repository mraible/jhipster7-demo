jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPost, Post } from '../post.model';
import { PostService } from '../service/post.service';

import { PostRoutingResolveService } from './post-routing-resolve.service';

describe('Service Tests', () => {
  describe('Post routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PostRoutingResolveService;
    let service: PostService;
    let resultPost: IPost | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(PostRoutingResolveService);
      service = TestBed.inject(PostService);
      resultPost = undefined;
    });

    describe('resolve', () => {
      it('should return IPost returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPost = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPost).toEqual({ id: 123 });
      });

      it('should return new IPost if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPost = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPost).toEqual(new Post());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPost = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPost).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
