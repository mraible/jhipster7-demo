jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITag, Tag } from '../tag.model';
import { TagService } from '../service/tag.service';

import { TagRoutingResolveService } from './tag-routing-resolve.service';

describe('Service Tests', () => {
  describe('Tag routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TagRoutingResolveService;
    let service: TagService;
    let resultTag: ITag | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TagRoutingResolveService);
      service = TestBed.inject(TagService);
      resultTag = undefined;
    });

    describe('resolve', () => {
      it('should return ITag returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTag = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTag).toEqual({ id: 123 });
      });

      it('should return new ITag if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTag = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTag).toEqual(new Tag());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTag = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTag).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
