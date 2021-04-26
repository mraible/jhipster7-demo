import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITag, Tag } from '../tag.model';

import { TagService } from './tag.service';

describe('Service Tests', () => {
  describe('Tag Service', () => {
    let service: TagService;
    let httpMock: HttpTestingController;
    let elemDefault: ITag;
    let expectedResult: ITag | ITag[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TagService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        name: 'AAAAAAA',
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

      it('should create a Tag', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Tag()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Tag', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Tag', () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
          },
          new Tag()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Tag', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
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

      it('should delete a Tag', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTagToCollectionIfMissing', () => {
        it('should add a Tag to an empty array', () => {
          const tag: ITag = { id: 123 };
          expectedResult = service.addTagToCollectionIfMissing([], tag);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tag);
        });

        it('should not add a Tag to an array that contains it', () => {
          const tag: ITag = { id: 123 };
          const tagCollection: ITag[] = [
            {
              ...tag,
            },
            { id: 456 },
          ];
          expectedResult = service.addTagToCollectionIfMissing(tagCollection, tag);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Tag to an array that doesn't contain it", () => {
          const tag: ITag = { id: 123 };
          const tagCollection: ITag[] = [{ id: 456 }];
          expectedResult = service.addTagToCollectionIfMissing(tagCollection, tag);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tag);
        });

        it('should add only unique Tag to an array', () => {
          const tagArray: ITag[] = [{ id: 123 }, { id: 456 }, { id: 94533 }];
          const tagCollection: ITag[] = [{ id: 123 }];
          expectedResult = service.addTagToCollectionIfMissing(tagCollection, ...tagArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const tag: ITag = { id: 123 };
          const tag2: ITag = { id: 456 };
          expectedResult = service.addTagToCollectionIfMissing([], tag, tag2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tag);
          expect(expectedResult).toContain(tag2);
        });

        it('should accept null and undefined values', () => {
          const tag: ITag = { id: 123 };
          expectedResult = service.addTagToCollectionIfMissing([], null, tag, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tag);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
