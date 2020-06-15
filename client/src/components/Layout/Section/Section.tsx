import classNames from "classnames";
import styles from './Section.module.scss';

interface SectionProps {
  title: string;
  subtitle: string;
}

export const Section: React.FC<SectionProps> = props => {
  return (
    <div className='columns'>
      <div className={classNames('column is-4', styles.header)}>
        <div className={styles['is-centered-mobile']}>
          <h4 className="title is-4">{props.title}</h4>
          <h6 className={classNames('subtitle is-6', styles.subtitle)}>{props.subtitle}</h6>
        </div>
      </div>
      <div className='column is-8'>
        <div className={styles['is-centered-mobile']}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
