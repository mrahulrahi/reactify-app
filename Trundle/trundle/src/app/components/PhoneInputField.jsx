"use client";

import React from "react";
import PhoneInput from "react-phone-number-input";

const PhoneInputField = ({
  containerClassNames,
  label,
  placeholder,
  value,
  onChange,
  onCountryChange,
  error,
  touched,
  defaultCountry,
  classNames,
  labelClassNames
}) => {
  return (
    <div className={containerClassNames}>
      <label className={labelClassNames}>{label}*</label>
      <PhoneInput
        className={classNames}
        value={value}
        onChange={onChange}
        defaultCountry={defaultCountry}
        international
        placeholder={placeholder}
        onCountryChange={onCountryChange}
      />
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default PhoneInputField;
