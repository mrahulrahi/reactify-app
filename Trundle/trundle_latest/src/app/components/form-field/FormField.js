import React from "react";

const FormField = ({
   label,
   type,
   id,
   name,
   placeholder,
   onChange,
   onBlur,
   value,
   touched,
   error,
   disabled,
}) => (
   <div className="row">
      <div className="col-lg-12">
         <div className="form-group mb-4">
            <label className="form-label">{label}*</label>
            <input
               disabled={disabled}
               type={type}
               id={id}
               name={name}
               onChange={onChange}
               onBlur={onBlur}
               value={value}
               placeholder={placeholder}
               className={`form-control`}
            />
            {touched && error && <p className="text-danger mt-2">{error}</p>}
         </div>
      </div>
   </div>
);

export default FormField;
