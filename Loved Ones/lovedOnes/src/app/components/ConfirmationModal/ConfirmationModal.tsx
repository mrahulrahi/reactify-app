import './ConfirmationModal.css'

type ConfirmationModalProps = {
    modalId: string;
    title?: string;
    message?: string;
    cancelText: string;
    buttonText: string;
    setButtonAction?: () => void;
}

const ConfirmationModal = ({ modalId, title, message, cancelText, buttonText, setButtonAction }: ConfirmationModalProps) => {
    return (
        <div className="modal fade confirmation-modal" id={modalId} tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h3>{title}</h3>
                        <p>{message}</p>
                    </div>

                    <div className="modal-actions d-flex">
                        <button type="button" className="btn btn-blue-light" data-bs-dismiss="modal">{cancelText}</button>
                        <button type="button" className="btn btn-blue" data-bs-dismiss="modal" onClick={setButtonAction}>{buttonText}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal