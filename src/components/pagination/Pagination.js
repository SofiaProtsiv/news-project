import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import * as newsAPI from '../../redux/newsSlice';
import './pagination.scss'

export default function Pagination() {

    // const dispatch = useDispatch();

    // const { articles, totalPages } = useSelector((state) => state.news);
    // const filters = useSelector((state) => state.news.filters);
    // useEffect(() => {
    //     dispatch(newsAPI.fetchNews(filters));

    // }, [dispatch, filters, filters.page, filters.query])
    // const handlePageClick = ({ selected }) => {
    //     dispatch(newsAPI.setPage(selected + 1));
    //     dispatch(newsAPI.setArticlesGroup(articles));

    //     window.scrollTo(0, 0);
    // };

    return (
        <section className='pagination'>
            {/* <ReactPaginate
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={totalPages}
                previousLabel="< Prev"
                marginPagesDisplayed={1}
                renderOnZeroPageCount={null}
                breakLabel="..."
                breakClassName="break-page-item"
                breakLinkClassName="break-page-link"
                containerClassName="pagination__container"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="previous-page-item"
                previousLinkClassName="previous-page-link"
                nextClassName="next-page-item"
                nextLinkClassName="next-page-link"
                activeClassName="active"
            /> */}
        </section>
    )
}