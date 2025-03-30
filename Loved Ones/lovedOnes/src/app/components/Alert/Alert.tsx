import './Alert.css'
import Image from 'next/image'

interface AlertProps {
  type: 'success' | 'danger' | 'warning' | 'info';
  message: string;
}

const Alert = ({ type, message }: AlertProps) => {
  return (
    <div className={`alert alert-${type} alert-dismissible fade show d-flex justify-content-between align-items-center`} role="alert">
      <div className="alert-content d-flex align-items-center gap-2">
        <div className="alert-icon has-img-contain">
          <Image src={`/images/alert-${type}.svg`} alt={type} width={24} height={24} quality={100} />
        </div>
        <strong>{message}</strong>
      </div>

      <button type="button" className="alert-close d-flex align-items-center justify-content-center" data-bs-dismiss="alert" aria-label="Close"> <Image src="/images/close-icon.svg" alt="close" width={14} height={14} quality={100} /></button>
    </div>
  )
}

export default Alert