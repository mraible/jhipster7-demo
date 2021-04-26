package org.jhipster.blog.repository;

import java.util.List;
import java.util.Optional;
import org.jhipster.blog.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Post entity.
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(
        value = "select distinct post from Post post left join fetch post.tags",
        countQuery = "select count(distinct post) from Post post"
    )
    Page<Post> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct post from Post post left join fetch post.tags")
    List<Post> findAllWithEagerRelationships();

    @Query("select post from Post post left join fetch post.tags where post.id =:id")
    Optional<Post> findOneWithEagerRelationships(@Param("id") Long id);

    Page<Post> findByBlogUserLoginOrderByDateDesc(String currentUserLogin, Pageable pageable);
}
