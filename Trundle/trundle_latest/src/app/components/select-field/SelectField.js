"use cleient";

import Select from "react-select";
import ErrorMessage from "../error-message/ErrorMessage";

const SelectField = ({
   label,
   name,
   options,
   value,
   onChange,
   onBlur,
   error,
   placeholder,
   isMulti,
   isSearchable,
   defaultValue,
   className,
   classNamePrefix,
   components,
   styles,
   borderNone,
   closeMenuOnSelect
}) => {

   return (
      <>
         {label && (
            <label htmlFor={name} className="form-label">
               {label}*
            </label>
         )}
         <Select
            hideSelectedOptions={false}
            closeMenuOnSelect={closeMenuOnSelect}
            className={`${className} ${borderNone && 'select-border-none'}`}
            classNamePrefix={`${classNamePrefix}`}
            isSearchable={isSearchable ? true : false}
            options={options}
            isMulti={isMulti ? true : false}
            placeholder={placeholder}
            onChange={(data) => {
               onChange(name, data);
            }}
            onBlur={onBlur}
            value={value}
            components={components}
            defaultValue={defaultValue}
            styles={styles}
         />
         <ErrorMessage type="select" error={error} />
      </>
   );
};

export default SelectField;
