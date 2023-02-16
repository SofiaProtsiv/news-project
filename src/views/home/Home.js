import { useDispatch, useSelector } from "react-redux";

import ArticlesList from "../../components/articlesList";
import Filter from "../../components/filter/Filter";
import Pagination from "../../components/pagination";

import * as newsAPI from "../../redux/newsSlice";

import { useEffect } from 'react';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(newsAPI.fetchPopularNews());
  }, [dispatch]);

  return (
    <>
      <Filter />
      <ArticlesList />
      <Pagination />
    </>
  );
}
