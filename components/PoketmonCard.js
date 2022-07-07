import React, { useState, useRef } from "react";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useObserver } from "../hooks/useObserver";
import useLocalStorage from "use-local-storage";

import style from "./PoketmonCard.module.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

function PoketmonCard({ id, name }) {
  const target = useRef(null);
  const [visible, setVisible] = useState(false);
  const [scrollY, setScrollY] = useLocalStorage("scrollY", 0);

  // isIntersecting의 경우에 DOM을 마운트 한다.
  const onIntersect = ([entry]) =>
    entry.isIntersecting ? setVisible(true) : setVisible(false);

  useObserver({
    target,
    onIntersect,
    threshold: 0.1, // 화면 양끝에서 10% 보여지면 onIntersect 실행
  });

  return (
    <Link href={`/poketmon/${id}`} key={id}>
      {/* observe 대상인 target ref, Link는 Next.js의 가상 요소로 실체가 없기 때문에 a태그에 ref를 줌*/}
      <a
        className={style.poketmonCard}
        ref={target}
        onClick={() => setScrollY(window.scrollY)}
      >
        {visible && (
          <>
            <LazyLoadImage
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              effect="opacity"
              alt={name}
            />
            <div>
              <div className={style.idBox}>
                <div className={style.textBox}>ID:</div>
                <div className={style.textBox}>{id}</div>
              </div>
              <div className={style.nameBox}>
                <div className={style.textBox}>name:</div>
                <div className={style.textBox}>{name}</div>
              </div>
            </div>
          </>
        )}
      </a>
    </Link>
  );
}

export default PoketmonCard;
