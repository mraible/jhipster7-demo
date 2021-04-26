jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PostService } from '../service/post.service';
import { IPost, Post } from '../post.model';
import { IBlog } from 'app/entities/blog/blog.model';
import { BlogService } from 'app/entities/blog/service/blog.service';
import { ITag } from 'app/entities/tag/tag.model';
import { TagService } from 'app/entities/tag/service/tag.service';

import { PostUpdateComponent } from './post-update.component';

describe('Component Tests', () => {
  describe('Post Management Update Component', () => {
    let comp: PostUpdateComponent;
    let fixture: ComponentFixture<PostUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let postService: PostService;
    let blogService: BlogService;
    let tagService: TagService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PostUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PostUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PostUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      postService = TestBed.inject(PostService);
      blogService = TestBed.inject(BlogService);
      tagService = TestBed.inject(TagService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Blog query and add missing value', () => {
        const post: IPost = { id: 456 };
        const blog: IBlog = { id: 17207 };
        post.blog = blog;

        const blogCollection: IBlog[] = [{ id: 33116 }];
        spyOn(blogService, 'query').and.returnValue(of(new HttpResponse({ body: blogCollection })));
        const additionalBlogs = [blog];
        const expectedCollection: IBlog[] = [...additionalBlogs, ...blogCollection];
        spyOn(blogService, 'addBlogToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ post });
        comp.ngOnInit();

        expect(blogService.query).toHaveBeenCalled();
        expect(blogService.addBlogToCollectionIfMissing).toHaveBeenCalledWith(blogCollection, ...additionalBlogs);
        expect(comp.blogsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Tag query and add missing value', () => {
        const post: IPost = { id: 456 };
        const tags: ITag[] = [{ id: 53942 }];
        post.tags = tags;

        const tagCollection: ITag[] = [{ id: 54270 }];
        spyOn(tagService, 'query').and.returnValue(of(new HttpResponse({ body: tagCollection })));
        const additionalTags = [...tags];
        const expectedCollection: ITag[] = [...additionalTags, ...tagCollection];
        spyOn(tagService, 'addTagToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ post });
        comp.ngOnInit();

        expect(tagService.query).toHaveBeenCalled();
        expect(tagService.addTagToCollectionIfMissing).toHaveBeenCalledWith(tagCollection, ...additionalTags);
        expect(comp.tagsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const post: IPost = { id: 456 };
        const blog: IBlog = { id: 65437 };
        post.blog = blog;
        const tags: ITag = { id: 45876 };
        post.tags = [tags];

        activatedRoute.data = of({ post });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(post));
        expect(comp.blogsSharedCollection).toContain(blog);
        expect(comp.tagsSharedCollection).toContain(tags);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const post = { id: 123 };
        spyOn(postService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ post });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: post }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(postService.update).toHaveBeenCalledWith(post);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const post = new Post();
        spyOn(postService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ post });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: post }));
        saveSubject.complete();

        // THEN
        expect(postService.create).toHaveBeenCalledWith(post);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const post = { id: 123 };
        spyOn(postService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ post });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(postService.update).toHaveBeenCalledWith(post);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackBlogById', () => {
        it('Should return tracked Blog primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackBlogById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackTagById', () => {
        it('Should return tracked Tag primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTagById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });

    describe('Getting selected relationships', () => {
      describe('getSelectedTag', () => {
        it('Should return option if no Tag is selected', () => {
          const option = { id: 123 };
          const result = comp.getSelectedTag(option);
          expect(result === option).toEqual(true);
        });

        it('Should return selected Tag for according option', () => {
          const option = { id: 123 };
          const selected = { id: 123 };
          const selected2 = { id: 456 };
          const result = comp.getSelectedTag(option, [selected2, selected]);
          expect(result === selected).toEqual(true);
          expect(result === selected2).toEqual(false);
          expect(result === option).toEqual(false);
        });

        it('Should return option if this Tag is not selected', () => {
          const option = { id: 123 };
          const selected = { id: 456 };
          const result = comp.getSelectedTag(option, [selected]);
          expect(result === option).toEqual(true);
          expect(result === selected).toEqual(false);
        });
      });
    });
  });
});
