import React from 'react';
import { AddressElement } from '@stripe/react-stripe-js';

const AddressForm = () => {
  return (
    <form className='container'>
      <AddressElement options={{ mode: 'shipping' }} />
    </form>
  );
};

export default AddressForm;