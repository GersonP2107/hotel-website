import React, { useState, useEffect, useMemo, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Simula una función de backend para verificar disponibilidad
const checkAvailability = async (checkIn: Date, checkOut: Date, roomType: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return Math.random() < 0.8;
};

// Simula una función para iniciar el proceso de pago
const initiatePayment = async (bookingDetails: any): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  // En un escenario real, esto devolvería una URL proporcionada por la pasarela de pagos
  return `https://payment-gateway.example.com/pay?bookingId=${Date.now()}`;
};

const roomTypes = [
  { id: 'standard', name: 'Habitación Ejecutiva', price: 250.000 },
  { id: 'deluxe', name: 'Habitación Deluxe', price: 390.000 },
  { id: 'suite', name: 'Habitacion Familiar', price: 200.000 },
];

interface FormValues {
  guest: string;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  roomType: string;
}

const Checkout: React.FC = () => {
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validationSchema = Yup.object({
    guest: Yup.string().required('El nombre del huésped es obligatorio'),
    checkInDate: Yup.date().required('La fecha de check-in es obligatoria').min(new Date(), 'La fecha de check-in no puede ser anterior a hoy'),
    checkOutDate: Yup.date().required('La fecha de check-out es obligatoria').min(Yup.ref('checkInDate'), 'La fecha de check-out debe ser posterior a la de check-in'),
    roomType: Yup.string().required('Debe seleccionar un tipo de habitación'),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      guest: '',
      checkInDate: null,
      checkOutDate: null,
      roomType: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      try {
        const available = await checkAvailability(values.checkInDate!, values.checkOutDate!, values.roomType);
        setIsAvailable(available);
        if (available) {
          setShowSummary(true);
          setTotalPrice(calculateTotalPrice(values));
        } else {
          setError('Lo sentimos, no hay disponibilidad para las fechas seleccionadas.');
        }
      } catch (err) {
        setError('Ha ocurrido un error al verificar la disponibilidad. Por favor, inténtelo de nuevo.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    const savedForm = localStorage.getItem('bookingForm');
    if (savedForm) {
      const parsedForm = JSON.parse(savedForm);
      formik.setValues({
        ...parsedForm,
        checkInDate: parsedForm.checkInDate ? new Date(parsedForm.checkInDate) : null,
        checkOutDate: parsedForm.checkOutDate ? new Date(parsedForm.checkOutDate) : null,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookingForm', JSON.stringify(formik.values));
  }, [formik.values]);

  const calculateTotalPrice = useCallback((values: FormValues): number => {
    if (!values.checkInDate || !values.checkOutDate || !values.roomType) return 0;
    const days = Math.ceil((values.checkOutDate.getTime() - values.checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const roomPrice = roomTypes.find(room => room.id === values.roomType)?.price || 0;
    return days * roomPrice;
  }, []);

  useEffect(() => {
    if (formik.values.checkInDate && formik.values.checkOutDate && formik.values.roomType) {
      setTotalPrice(calculateTotalPrice(formik.values));
    }
  }, [formik.values.checkInDate, formik.values.checkOutDate, formik.values.roomType, calculateTotalPrice]);

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const bookingDetails = {
        ...formik.values,
        totalPrice,
      };
      const paymentUrl = await initiatePayment(bookingDetails);
      
      // Guarda los detalles de la reserva en el almacenamiento local antes de redirigir
      localStorage.setItem('pendingBooking', JSON.stringify(bookingDetails));
      
      // Redirige a la pasarela de pagos usando window.location.href
      window.location.href = paymentUrl;
    } catch (err) {
      setError('Ha ocurrido un error al iniciar el proceso de pago. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const roomOptions = useMemo(() => roomTypes.map(room => (
    <option key={room.id} value={room.id}>{room.name} - ${room.price}/noche</option>
  )), []);

  return (
    <section className="section__container booking__container">
      <form onSubmit={formik.handleSubmit} className="booking__form">
        <div className="input__group">
          <span><i className="ri-user-fill" aria-hidden="true" /></span>
          <div>
            <label htmlFor="guest">HUÉSPED</label>
            <input
              type="text"
              id="guest"
              name="guest"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.guest}
              placeholder="Nombre del huésped"
              aria-invalid={formik.touched.guest && formik.errors.guest ? "true" : "false"}
            />
            {formik.touched.guest && formik.errors.guest && (
              <div className="error" role="alert">{formik.errors.guest}</div>
            )}
          </div>
        </div>
        <div className="input__group">
          <span><i className="ri-calendar-2-fill" aria-hidden="true" /></span>
          <div>
            <label htmlFor="checkInDate">CHECK-IN</label>
            <DatePicker
              id="checkInDate"
              selected={formik.values.checkInDate}
              onChange={(date) => formik.setFieldValue('checkInDate', date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Fecha de entrada"
              className="date-input"
              aria-label="Fecha de check-in"
              aria-invalid={formik.touched.checkInDate && formik.errors.checkInDate ? "true" : "false"}
            />
            {formik.touched.checkInDate && formik.errors.checkInDate && (
              <div className="error" role="alert">{formik.errors.checkInDate}</div>
            )}
          </div>
        </div>
        <div className="input__group">
          <span><i className="ri-calendar-2-fill" aria-hidden="true" /></span>
          <div>
            <label htmlFor="checkOutDate">CHECK-OUT</label>
            <DatePicker
              id="checkOutDate"
              selected={formik.values.checkOutDate}
              onChange={(date) => formik.setFieldValue('checkOutDate', date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Fecha de salida"
              className="date-input"
              aria-label="Fecha de check-out"
              aria-invalid={formik.touched.checkOutDate && formik.errors.checkOutDate ? "true" : "false"}
            />
            {formik.touched.checkOutDate && formik.errors.checkOutDate && (
              <div className="error" role="alert">{formik.errors.checkOutDate}</div>
            )}
          </div>
        </div>
        <div className="input__group">
          <span><i className="ri-hotel-bed-fill" aria-hidden="true" /></span>
          <div>
            <label htmlFor="roomType">TIPO DE HABITACIÓN</label>
            <select
              id="roomType"
              name="roomType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.roomType}
              aria-invalid={formik.touched.roomType && formik.errors.roomType ? "true" : "false"}
            >
              <option value="">Seleccione una habitación</option>
              {roomOptions}
            </select>
            {formik.touched.roomType && formik.errors.roomType && (
              <div className="error" role="alert">{formik.errors.roomType}</div>
            )}
          </div>
        </div>
        {error && <div className="error" role="alert">{error}</div>}
        <div className="input__group input__btn">
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? 'Cargando...' : (showSummary ? 'ACTUALIZAR RESERVA' : 'VERIFICAR DISPONIBILIDAD')}
          </button>
        </div>
      </form>

      {showSummary && (
        <div className="booking__summary">
          <h2 className="text-blue">Resumen de la Reserva</h2>
          <p><strong>Huésped:</strong> {formik.values.guest}</p>
          <p><strong>Check-in:</strong> {formik.values.checkInDate?.toLocaleDateString()}</p>
          <p><strong>Check-out:</strong> {formik.values.checkOutDate?.toLocaleDateString()}</p>
          <p><strong>Tipo de Habitación:</strong> {roomTypes.find(room => room.id === formik.values.roomType)?.name}</p>
          <p><strong>Número de noches:</strong> {formik.values.checkInDate && formik.values.checkOutDate ? 
            Math.ceil((formik.values.checkOutDate.getTime() - formik.values.checkInDate.getTime()) / (1000 * 60 * 60 * 24)) : 0}</p>
          <p><strong>Precio por noche:</strong> ${roomTypes.find(room => room.id === formik.values.roomType)?.price}</p>
          <p><strong>Precio Total:</strong> ${totalPrice}</p>
          <button onClick={handleConfirmBooking} className="btn" disabled={isLoading}>
            {isLoading ? 'Confirmando...' : 'CONFIRMAR RESERVA'}
          </button>
        </div>
      )}
    </section>
  );
};

export default Checkout;