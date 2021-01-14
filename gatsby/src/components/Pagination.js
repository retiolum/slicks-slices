import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  text-align: center;
  & > * {
    flex: 1;
    text-decoration: none;

    &[aria-current],
    &.current {
      color: var(--red);
    }

    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
  @media (max-width: 800px) {
    .word {
      display: none;
    }
  }
`;

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const prevPage = currentPage - 1 === 1 ? '' : currentPage - 1;
  const hasPrevPage = currentPage - 1 >= 1;
  return (
    <PaginationStyles>
      <Link
        to={`/${base}/${prevPage}`}
        disabled={!hasPrevPage}
        title="Prev page"
      >
        &larr; <span className="word">Prev</span>
      </Link>

      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          key={i}
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          to={`/${base}/${i + 1 === 1 ? '' : i + 1}`}
        >
          {i + 1}
        </Link>
      ))}

      <Link
        to={`/${base}/${nextPage}`}
        disabled={!hasNextPage}
        title="Next page"
      >
        <span className="word">Next</span> &rarr;
      </Link>
    </PaginationStyles>
  );
}
