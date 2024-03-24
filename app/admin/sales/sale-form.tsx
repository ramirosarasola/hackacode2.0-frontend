import AuthFormTitle from "@/app/ui/auth-form-title";
import { AuthInput } from "@/app/ui/auth-input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ConfigProvider } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const [formData, setFormData] = useState({});
  const [servicesAmount, setServicesAmount] = useState([1]);
  const [serviceValues, setServiceValues] = useState([]);

  const handleServiceChange = (e: any, index: number) => {
    const newServiceValues = [...serviceValues];
    newServiceValues[index] = e.target.value; // Actualizar el valor del servicio en el índice correspondiente
    setServiceValues(newServiceValues);
  };

  const handleAddService = (e: any) => {
    e.preventDefault();
    console.log("Add service");

    setServicesAmount([...servicesAmount, 1]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const services = serviceValues.map((value) => ({ id: value }));

    // Construir el objeto formData
    const formData = {
      customer_id: "1",
      employee_id: "1",
      payment_method: "credit",
      services: services,
    };

    console.log(formData);

    // Enviar el formulario
    dispatch(createEntity(formData));
  };

  const handleDeleteServiceSelect = (e: any, indexToRemove: number) => {
    e.preventDefault();
    console.log("Delete service");
    // Filtrar el array para excluir el elemento con el índice especificado
    const newServicesAmount = servicesAmount.filter(
      (_, index) => index !== indexToRemove
    );
    const newServiceValues = serviceValues.filter(
      (_, index) => index !== indexToRemove
    );
    setServicesAmount(newServicesAmount);
    setServiceValues(newServiceValues);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);

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
        <input
          onChange={(e) => handleChange(e)}
          className="auth-input"
          type="text"
          name="customer_id"
          placeholder="Customer"
        />

        <input
          onChange={(e) => handleChange(e)}
          className="auth-input"
          type="text"
          name="employee_id"
          placeholder="Employee"
        />
        <input
          onChange={(e) => handleChange(e)}
          className="auth-input"
          type="text"
          name="payment_method"
          placeholder="Payment Method"
        />
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
            <button onClick={(e) => handleDeleteServiceSelect(e, index)}>
              ❌
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
