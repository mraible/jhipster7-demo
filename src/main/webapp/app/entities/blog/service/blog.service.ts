import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBlog, getBlogIdentifier } from '../blog.model';

export type EntityResponseType = HttpResponse<IBlog>;
export type EntityArrayResponseType = HttpResponse<IBlog[]>;

@Injectable({ providedIn: 'root' })
export class BlogService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/blogs');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(blog: IBlog): Observable<EntityResponseType> {
    return this.http.post<IBlog>(this.resourceUrl, blog, { observe: 'response' });
  }

  update(blog: IBlog): Observable<EntityResponseType> {
    return this.http.put<IBlog>(`${this.resourceUrl}/${getBlogIdentifier(blog) as number}`, blog, { observe: 'response' });
  }

  partialUpdate(blog: IBlog): Observable<EntityResponseType> {
    return this.http.patch<IBlog>(`${this.resourceUrl}/${getBlogIdentifier(blog) as number}`, blog, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBlog>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBlog[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addBlogToCollectionIfMissing(blogCollection: IBlog[], ...blogsToCheck: (IBlog | null | undefined)[]): IBlog[] {
    const blogs: IBlog[] = blogsToCheck.filter(isPresent);
    if (blogs.length > 0) {
      const blogCollectionIdentifiers = blogCollection.map(blogItem => getBlogIdentifier(blogItem)!);
      const blogsToAdd = blogs.filter(blogItem => {
        const blogIdentifier = getBlogIdentifier(blogItem);
        if (blogIdentifier == null || blogCollectionIdentifiers.includes(blogIdentifier)) {
          return false;
        }
        blogCollectionIdentifiers.push(blogIdentifier);
        return true;
      });
      return [...blogsToAdd, ...blogCollection];
    }
    return blogCollection;
  }
}
