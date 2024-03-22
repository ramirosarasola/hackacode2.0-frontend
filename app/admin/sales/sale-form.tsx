import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useAppSelector } from '@/lib/hooks';
import { Service } from '@/interface/types';

interface SaleFormProps {
  register: UseFormRegister<ICreateSale>;
}

export interface ICreateSale {
  employee_id: number;
  customer_id: string;
  payment_method: string;
  services: { id: string }[]; // Cambia el tipo de array
}

interface ServiceOption {
  label: string;
  value: string;
}

const PAYMENT_METHODS = [
  { method: 'Credit Card', value: 'credit' },
  { method: 'Debit Card', value: 'debit' },
  { method: 'E Wallet', value: 'ewallet' },
  { method: 'Bank Transfer', value: 'transfer' },
];

const SaleForm: React.FC<SaleFormProps> = ({ register }) => {
  const { employees } = useAppSelector((state) => state.employee);
  const { customers } = useAppSelector((state) => state.customer);

  const user = useAppSelector((state) => state.auth.user);
  const employee = employees.find((employee) => employee.user_id === user.id);
  const employee_id = employee ? parseInt(employee.id, 10) : 0;
  const { services } = useAppSelector((state) => state.service);

  const optionServices = services?.map((service) => ({
    label: service.name,
    value: service.id,
  }));

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedServices = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
  
    console.log(selectedServices);
    const formattedServices:any = [];
    selectedServices.forEach((serviceId) => {
      formattedServices.push({ id: serviceId });
    });

    console.log({formattedServices});
    
  
    register('services', {
      value: [...formattedServices],
      required: true,
    });
  };
  
  

  return (
    <form action="" className="flex flex-col gap-4 mt-8">
      <input type="hidden" {...register('employee_id', { value: employee_id })} />
      <select {...register('customer_id', { required: true })} className="sale-select">
        <option value="">Select a Customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
      <select {...register('payment_method', { required: true })} className="sale-select">
        <option value="">Payment Method</option>
        {PAYMENT_METHODS.map((method) => (
          <option key={method.value} value={method.value}>
            {method.method}
          </option>
        ))}
      </select>
      <select
        onChange={handleServiceChange} // Maneja el cambio de selección
        multiple
        className="sale-multiselect"
      >
        <option value="">Select a Service</option>
        {optionServices.map((service) => (
          <option key={service.label} value={service.value}>
            {service.label}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SaleForm;
