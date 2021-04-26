import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBlog, Blog } from '../blog.model';

import { BlogService } from './blog.service';

describe('Service Tests', () => {
  describe('Blog Service', () => {
    let service: BlogService;
    let httpMock: HttpTestingController;
    let elemDefault: IBlog;
    let expectedResult: IBlog | IBlog[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(BlogService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        name: 'AAAAAAA',
        handle: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Blog', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Blog()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Blog', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            handle: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Blog', () => {
        const patchObject = Object.assign(
          {
            handle: 'BBBBBB',
          },
          new Blog()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Blog', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            handle: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Blog', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addBlogToCollectionIfMissing', () => {
        it('should add a Blog to an empty array', () => {
          const blog: IBlog = { id: 123 };
          expectedResult = service.addBlogToCollectionIfMissing([], blog);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(blog);
        });

        it('should not add a Blog to an array that contains it', () => {
          const blog: IBlog = { id: 123 };
          const blogCollection: IBlog[] = [
            {
              ...blog,
            },
            { id: 456 },
          ];
          expectedResult = service.addBlogToCollectionIfMissing(blogCollection, blog);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Blog to an array that doesn't contain it", () => {
          const blog: IBlog = { id: 123 };
          const blogCollection: IBlog[] = [{ id: 456 }];
          expectedResult = service.addBlogToCollectionIfMissing(blogCollection, blog);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(blog);
        });

        it('should add only unique Blog to an array', () => {
          const blogArray: IBlog[] = [{ id: 123 }, { id: 456 }, { id: 24053 }];
          const blogCollection: IBlog[] = [{ id: 123 }];
          expectedResult = service.addBlogToCollectionIfMissing(blogCollection, ...blogArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const blog: IBlog = { id: 123 };
          const blog2: IBlog = { id: 456 };
          expectedResult = service.addBlogToCollectionIfMissing([], blog, blog2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(blog);
          expect(expectedResult).toContain(blog2);
        });

        it('should accept null and undefined values', () => {
          const blog: IBlog = { id: 123 };
          expectedResult = service.addBlogToCollectionIfMissing([], null, blog, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(blog);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
