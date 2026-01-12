import styles from './style.module.scss';

export const Sections = ({
  active,
  sections,
  setSection,
}: {
  active?: number;
  sections: any[];
  setSection: (id: number) => void;
}) => {
  return (
    <div className={styles.sections}>
      {sections.map((x) => (
        <div
          key={x.id}
          className={`${styles.item} ${x.id === active ? styles.active : ''} ${x.soon ? styles.soon : ''}`}
          onClick={() => setSection(x.id)}
        >
          <div className={styles.text}>
            <h4>{x.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};