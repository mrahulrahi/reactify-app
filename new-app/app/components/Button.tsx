

interface Props {
  title: string;
  style: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'lg';
  hasIcon?: JSX.Element;
}

const Button = ({ title, style, size, hasIcon }: Props) => {


  return (
    <div>
      <button type="button" className={`btn btn-${style} ${size ? `btn-${size}` : ''} ${hasIcon ? `has-icon` : ''}`}>
        {title}
        <div className="btn-icon">
          {hasIcon}
        </div>
      </button>
    </div>
  )
}

export default Button