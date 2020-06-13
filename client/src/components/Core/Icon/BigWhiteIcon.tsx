export interface BigWhiteIconProps {
  link: string;
  iconName: string;
}

export const BigWhiteIcon = (props: BigWhiteIconProps) => {
  return (
    <a target='_blank' href={props.link} >
      <span className='icon is-large has-text-white'>
        <i className={'fab fa-2x ' + props.iconName}></i>
      </span>
    </a >
  );
}
