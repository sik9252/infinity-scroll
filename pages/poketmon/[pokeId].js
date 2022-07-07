import axios from "axios";

import style from "../../styles/poketmonDetails.module.css";

const Pokemon = ({ data }) => {
  const { name, id, order, types, abilities, stats } = data;
  console.log(data);
  return (
    <div className={style.poketmonDetailContainer}>
      <picture className={style.sprite}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
        />
        <div className={style.poketmonName}>{name}</div>
      </picture>
      <div className={style.infoWrapper}>
        <div className={style.infoBox}>
          <div className={style.infoTitle}>ID</div>
          <div className={style.infoText}>{id}</div>
        </div>
        <div className={style.infoBox}>
          <div className={style.infoTitle}>도감 순서</div>
          <div className={style.infoText}>No. {order}</div>
        </div>
        <div className={style.infoBox}>
          <div className={style.infoTitle}>타입</div>
          {types.map((elem, i) => (
            <span className={style.infoText} key={elem.slot}>
              {elem.type.name}
              {types.length === i + 1 ? "" : ", "}
            </span>
          ))}
        </div>
        <div className={style.infoBox}>
          <div className={style.infoTitle}>기술</div>
          {abilities.map((elem, i) => (
            <span className={style.infoText} key={elem.slot}>
              {elem.ability.name}
              {abilities.length === i + 1 ? "" : ", "}
            </span>
          ))}
        </div>
        <div className={style.infoBox}>
          <div className={style.infoTitle}>스탯</div>
          {stats.map((elem, i) => (
            <div className={style.infoText} key={elem.slot}>
              {elem.stat.name}: {elem.base_stat}
            </div>
          ))}
        </div>
        <div className={style.infoBox}></div>
      </div>
    </div>
  );
};

// SSR로 데이터를 처리
export const getServerSideProps = async ({ params }) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${params.pokeId}`
  );
  return { props: { data } };
};

export default Pokemon;
