import AuthFormTitle from "@/app/ui/auth-form-title";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { ConfigProvider, Input, message } from "antd";
import { useState } from "react";

const SaleForm = ({
  createEntity,
  setShowModal,
}: {
  createEntity: any;
  setShowModal: any;
}) => {
  const dispatch = useAppDispatch();
  const { services } = useAppSelector((state) => state.service);
  const { customers } = useAppSelector((state) => state.customer);
  const { userEmployee }: any = useAppSelector((state) => state.employee);
  const employeeId = userEmployee?.id;
  const employeeName = `${userEmployee?.name} ${userEmployee?.lastname}`;
  const [servicesAmount, setServicesAmount] = useState([1]);
  const [serviceValues, setServiceValues] = useState([]);

  const initialState = {
    customer_id: "",
    employee_id: employeeId,
    payment_method: "",
    services: [],
  };

  const [formData, setFormData] = useState(initialState);
  const paymentMethods = [
    {
      value: "ewallet",
      label: "eWallet",
    },
    {
      value: "cash",
      label: "Cash",
    },
    {
      value: "debit",
      label: "Debit",
    },
    {
      value: "credit",
      label: "Credit",
    },
    {
      value: "transfer",
      label: "Transfer",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceChange = (e: any, index: number) => {
    const newServiceValues: any = [...serviceValues];
    newServiceValues[index] = e.target.value;
    setServiceValues(newServiceValues);
  };

  const handleAddService = (e: any) => {
    e.preventDefault();
    console.log("Add service");

    setServicesAmount([...servicesAmount, 1]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const selectedServices = serviceValues.map((value) => ({ id: value }));

    console.log(formData);
    const processedData = {
      ...formData,
      services: selectedServices,
    };

    dispatch(createEntity(processedData)).then((result: any) => {
      if (result.payload) {
        setShowModal(false);
        setFormData(initialState);
        setServiceValues([]);
        message.success("Sale created successfully");
      }
    })
  };

  const handleDeleteServiceselect = (e: any, indexToRemove: number) => {
    e.preventDefault();
    console.log("Delete service");
    const newServicesAmount = servicesAmount.filter(
      (_, index) => index !== indexToRemove
    );
    const newServiceValues = serviceValues.filter(
      (_, index) => index !== indexToRemove
    );
    setServicesAmount(newServicesAmount);
    setServiceValues(newServiceValues);
  };

  return (
    <section className="register gap-8 flex flex-col items-center justify-between w-full md:w-3/4 mx-auto">
      <AuthFormTitle size="lg" />

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "5A81FA",
          },
        }}
      ></ConfigProvider>

      <form className="flex flex-col items-center justify-center gap-8 w-full">
        <Input
          id="auth-gray"
          className="auth-input text-gray-400"
          type="text"
          name="employee_id"
          placeholder={employeeName}
          value={employeeName}
          disabled={true}
          onChange={handleChange}
        />
        <select
          className="auth-input"
          name="customer_id"
          onChange={handleChange}
          value={formData.customer_id as any}
        >
          <option value="defult" className="text-gray-400" id="auth-gray">
            select a customer
          </option>
          {customers.map((customer: any) => (
            <option key={customer.id} value={customer.id}>
              {customer.name} {customer.lastname}
            </option>
          ))}
        </select>
        <select
          className="auth-input"
          name="payment_method"
          onChange={handleChange}
          value={formData.payment_method as any}
        >
          <option value="defult" className="text-gray-400" id="auth-gray" hidden>
            select a payment method
          </option>
          {paymentMethods.map((paymentMethod: any, index) => (
            <option key={index} value={paymentMethod.value}>
              {paymentMethod.label}
            </option>
          ))}
        </select>
        {servicesAmount.map((_, index) => (
          <div className="w-full flex gap-2" key={index}>
            <select
              value={serviceValues[index] || ""}
              onChange={(e) => handleServiceChange(e, index)}
              className="auth-input"
              name="services"
            >
              {services.map((service: any) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
            <button onClick={(e) => handleDeleteServiceselect(e, index)}>
              <RemoveCircleOutlineIcon className="text-red-500" />
            </button>
          </div>
        ))}

        <button onClick={(e) => handleAddService(e)}>
          <AddCircleOutlineIcon style={{ color: "#5A81FA" }} />
        </button>
        <button
          onClick={(e) => handleSubmit(e)}
          className=" text-[14px] text-white py-2 px-4 rounded-full w-9/12  h-[51px] bg-[#5A81FA]"
        >
          Create Sale
        </button>
      </form>
    </section>
  );
};
export default SaleForm;
