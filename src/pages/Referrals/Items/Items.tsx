import styles from './style.module.scss';

const data = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  image: '/pages/home/gift.png',
  name: 'Grankeyl',
  date: '20 hours ago',
}));

export const Items = () => {
  return (
    <div className={styles.items}>
      <div className={styles.head}>
        <h4>Referrals</h4>
        <p>140</p>
      </div>
      <div className={styles.list}>
          {data.map((x) => (
            <>
            <div className={styles.item} key={x.id}>
              <div className={styles.image}>
                <img src={x.image} alt="" />
              </div>
              <div className={styles.text}>
                <h4>{x.name}</h4>
                <div className={styles.descr}>
                  <p>{x.date}</p>
                </div>
              </div>
              <div className={styles.info}>
                <p>+40р</p>
              </div>
            </div>
            {x.id !== data.length - 1 && <div className={styles.border}></div>}
            </>
          ))}
      </div>
    </div>
  );
};