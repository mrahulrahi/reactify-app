/* eslint-disable react/prop-types */

const Button = ({ title, style, size, hasIcon }) => {
  return (
    <div>
      <button type="button" className={`btn btn-${style} ${size ? `btn-${size}` : ''} ${hasIcon ? `has-icon` : ''}`}>
        {title}
        <div className="btn-icon">
          {hasIcon}
        </div>
      </button>
    </div>
  );
};

export default Button;
