import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPost, Post } from '../post.model';

import { PostService } from './post.service';

describe('Service Tests', () => {
  describe('Post Service', () => {
    let service: PostService;
    let httpMock: HttpTestingController;
    let elemDefault: IPost;
    let expectedResult: IPost | IPost[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PostService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        title: 'AAAAAAA',
        content: 'AAAAAAA',
        date: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Post', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.create(new Post()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Post', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            title: 'BBBBBB',
            content: 'BBBBBB',
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Post', () => {
        const patchObject = Object.assign(
          {
            content: 'BBBBBB',
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          new Post()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Post', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            title: 'BBBBBB',
            content: 'BBBBBB',
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Post', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPostToCollectionIfMissing', () => {
        it('should add a Post to an empty array', () => {
          const post: IPost = { id: 123 };
          expectedResult = service.addPostToCollectionIfMissing([], post);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(post);
        });

        it('should not add a Post to an array that contains it', () => {
          const post: IPost = { id: 123 };
          const postCollection: IPost[] = [
            {
              ...post,
            },
            { id: 456 },
          ];
          expectedResult = service.addPostToCollectionIfMissing(postCollection, post);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Post to an array that doesn't contain it", () => {
          const post: IPost = { id: 123 };
          const postCollection: IPost[] = [{ id: 456 }];
          expectedResult = service.addPostToCollectionIfMissing(postCollection, post);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(post);
        });

        it('should add only unique Post to an array', () => {
          const postArray: IPost[] = [{ id: 123 }, { id: 456 }, { id: 39036 }];
          const postCollection: IPost[] = [{ id: 123 }];
          expectedResult = service.addPostToCollectionIfMissing(postCollection, ...postArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const post: IPost = { id: 123 };
          const post2: IPost = { id: 456 };
          expectedResult = service.addPostToCollectionIfMissing([], post, post2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(post);
          expect(expectedResult).toContain(post2);
        });

        it('should accept null and undefined values', () => {
          const post: IPost = { id: 123 };
          expectedResult = service.addPostToCollectionIfMissing([], null, post, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(post);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
