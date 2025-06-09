import React, { useState } from 'react';
import * as Yup from 'yup';
import { ModalComponent } from '../../baseComponents/Modal/Modal';

export const AddVehicelPopup = ({ isOpen, setIsOpen }) => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const initialValues = {
    vehicle_no: '',
    vehicle_model: '',
    vehicle_owner: '',
    due_date: '',
    emi_amount: '',
    emi_duration: '',
    insurance_date: '',
    diesel_quantity: '',
    loan_provider: '',
    fc_date: '',
  };

  const validationSchema = Yup.object().shape({
    vehicle_no: Yup.string().required('Vehicle number is required'),
    vehicle_model: Yup.string().required('Vehicle model is required'),
    vehicle_owner: Yup.string().required('Vehicle owner is required'),
    due_date: Yup.date().required('Due date is required'),
    emi_amount: Yup.number().typeError('Must be a number').required('EMI amount is required'),
    emi_duration: Yup.string().required('EMI duration is required'),
    insurance_date: Yup.date().required('Insurance date is required'),
    diesel_quantity: Yup.number().typeError('Must be a number').required('Diesel quantity is required'),
    loan_provider: Yup.string().required('Loan provider is required'),
    fc_date: Yup.date().required('F/C date is required'),
  });

  if (!isOpen) {
    return null;
  }

  const sections = [
    {
      heading: 'Vehicle Information',
      className: 'grid grid-cols-2 gap-4',
      fields: [
        {
          name: 'vehicle_no',
          type: 'text',
          title: 'Vehicle No',
          placeholder: 'TN00AB1234',
          className: 'col-span-1',
        },
        {
          name: 'vehicle_model',
          type: 'text',
          title: 'Vehicle Model',
          placeholder: 'Model X',
          className: 'col-span-1',
        },
        {
          name: 'vehicle_owner',
          type: 'text',
          title: 'Vehicle Owner',
          placeholder: 'Owner Name',
          className: 'col-span-1',
        },
        {
          name: 'due_date',
          type: 'date',
          title: 'Due Date',
          className: 'col-span-1',
        },
        {
          name: 'emi_amount',
          type: 'text',
          title: 'EMI Amount',
          placeholder: '₹10000',
          className: 'col-span-1',
        },
        {
          name: 'emi_duration',
          type: 'text',
          title: 'EMI Duration',
          placeholder: '12 months',
          className: 'col-span-1',
        },
        {
          name: 'insurance_date',
          type: 'date',
          title: 'Insurance Date',
          className: 'col-span-1',
        },
        {
          name: 'diesel_quantity',
          type: 'text',
          title: 'Diesel Quantity',
          placeholder: 'e.g. 50 Liters',
          className: 'col-span-1',
        },
        {
          name: 'loan_provider',
          type: 'text',
          title: 'Loan Provider',
          placeholder: 'Bank Name',
          className: 'col-span-1',
        },
        {
          name: 'fc_date',
          type: 'date',
          title: 'F/C Date',
          className: 'col-span-1',
        },
      ],
    },
  ];

  const handleSubmit = (values) => {
    setSubmitLoading(true);
    
    const payload = {
      ...values,
    };

    console.log('Payload to submit:', payload);
    // Submit to API or dispatch action
  };

  return (
    <ModalComponent
      open={isOpen}
      centered={true}
      initialValues={initialValues}
      className="add-vehicle !w-[600px]"
      validationSchema={validationSchema}
      sections={sections}
      submitLoading={submitLoading}
      submitButtonText="Submit"
      cancelButtonText="Cancel"
      handleCancel={() => setIsOpen(false)}
      handleSubmit={handleSubmit}
    />
  );
};
