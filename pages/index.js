import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { useObserver } from "../hooks/useObserver";
import useLocalStorage from "use-local-storage";

import PoketmonCard from "../components/PoketmonCard";

import style from "../styles/Home.module.css";

const PAGE_OFFSET = 30;

// Fetch PoketmonList
const getPoketmonList = ({ pageParam = PAGE_OFFSET }) =>
  axios
    .get("https://pokeapi.co/api/v2/pokemon", {
      params: { limit: PAGE_OFFSET, offset: pageParam },
    })
    .then((res) => res?.data);

export default function Home() {
  const bottom = useRef(null);
  const [scrollY] = useLocalStorage("scrollY", 0);

  // useInfiniteQuery
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("poketmonList", getPoketmonList, {
    getNextPageParam: (lastPage) => {
      const { next } = lastPage;
      // PokeAPI에서는 next가 null이면 데이터가 없다는 뜻이므로
      // next가 없다면 false를 리턴하도록 하고
      if (!next) return false;

      // URL에서 필요한 값인 offset만 빼와서 pageParam으로 넘겨줄거임
      return Number(new URL(next).searchParams.get("offset"));
    },
  });

  // useObserver로 넘겨줄 callback, entry로 넘어오는 HTMLElement가
  // isIntersecting이라면 무한 스크롤을 위한 fetchNextPage가 실행될 것이다.
  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  // useObserver로 bottom ref와 onIntersect 넘기기
  // 이거 아래에 닿았을 때로 하지말고 20개 로딩되면 또 로딩되는 식으로 하면 어떨까?
  // 너무 큰 모니터에서는 애가 바닥에 안닿으니까 무한스크롤이 안됨
  useObserver({
    ref: true,
    target: bottom,
    onIntersect,
  });

  useEffect(() => {
    console.log(scrollY)
    // 기본값이 "0"이기 때문에 스크롤 값이 저장됐을 때에만 window를 스크롤시킨다.
    if (scrollY) {
      window.scrollTo(0, Number(scrollY));
    }
  }, []);

  return (
    <div className={style.poketmonContainer}>
      {status === "loading" && <p>불러오는 중</p>}
      {status === "error" && <p>{error.message}</p>}
      {status === "success" &&
        data.pages.map((group, id) => (
          <div className={style.poketmonList} key={id}>
            {group.results.map((poketmon) => (
              <PoketmonCard
                key={poketmon.name}
                id={poketmon.url.split("/")[6]}
                name={poketmon.name}
              />
            ))}
          </div>
        ))}
      <div ref={bottom} />
      {isFetchingNextPage && <p>계속 불러오는 중</p>}
    </div>
  );
}
