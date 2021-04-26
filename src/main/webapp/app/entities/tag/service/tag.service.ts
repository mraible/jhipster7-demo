import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITag, getTagIdentifier } from '../tag.model';

export type EntityResponseType = HttpResponse<ITag>;
export type EntityArrayResponseType = HttpResponse<ITag[]>;

@Injectable({ providedIn: 'root' })
export class TagService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/tags');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(tag: ITag): Observable<EntityResponseType> {
    return this.http.post<ITag>(this.resourceUrl, tag, { observe: 'response' });
  }

  update(tag: ITag): Observable<EntityResponseType> {
    return this.http.put<ITag>(`${this.resourceUrl}/${getTagIdentifier(tag) as number}`, tag, { observe: 'response' });
  }

  partialUpdate(tag: ITag): Observable<EntityResponseType> {
    return this.http.patch<ITag>(`${this.resourceUrl}/${getTagIdentifier(tag) as number}`, tag, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITag>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTagToCollectionIfMissing(tagCollection: ITag[], ...tagsToCheck: (ITag | null | undefined)[]): ITag[] {
    const tags: ITag[] = tagsToCheck.filter(isPresent);
    if (tags.length > 0) {
      const tagCollectionIdentifiers = tagCollection.map(tagItem => getTagIdentifier(tagItem)!);
      const tagsToAdd = tags.filter(tagItem => {
        const tagIdentifier = getTagIdentifier(tagItem);
        if (tagIdentifier == null || tagCollectionIdentifiers.includes(tagIdentifier)) {
          return false;
        }
        tagCollectionIdentifiers.push(tagIdentifier);
        return true;
      });
      return [...tagsToAdd, ...tagCollection];
    }
    return tagCollection;
  }
}
