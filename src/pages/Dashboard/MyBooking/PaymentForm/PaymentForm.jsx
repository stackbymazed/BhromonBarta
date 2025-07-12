import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../Contexts/AuthContext/AuthContext';

const PaymentForm = ({ closeModal, selectedBooking }) => {
    const axiosSecure = useAxiosSecure()
    const { user } = use(AuthContext)
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const amount = selectedBooking?.price;
    const packageID = selectedBooking?.packageId;
    const amountSent = amount * 100;

    const handlePay = () => {
        setLoading(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            setLoading(false)
            return
        } else {
            setError('');
            // console.log('[PaymentMethod]', paymentMethod);

            const res = await axiosSecure.post('/create-payment-intent', {
                amountSent,
                packageID
            })

            const clientSecret = res.data.clientSecret;

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.name,
                        email: user?.email,
                    },
                },
            });

            if (confirmError) {
                setError(confirmError.message);
                // setProcessing(false);
            } else {
                const paymentData = {
                    transactionId: paymentIntent?.payment_method,
                    amount: parseInt(selectedBooking?.price),
                    touristEmail: user?.email,
                    bookingId: selectedBooking?._id,
                    packageId: selectedBooking?.packageId,
                    packageName: selectedBooking?.packageName,
                    touristName: selectedBooking?.touristName,
                    touristImage: selectedBooking?.touristImage,
                    tourDate: selectedBooking?.tourDate,
                    guideId: selectedBooking?.guideId,
                    status: 'paid',
                    paidAt: new Date(),
                };
                try {
                    if (paymentIntent.status === 'succeeded') {
                        // 1. Store payment history
                        const amountSend = await axiosSecure.post('/Payments', paymentData);
                        // console.log(amountSend);

                        // 2. Update booking status to "paid"
                        await axiosSecure.patch(`/bookings/update-status/${selectedBooking?._id}`);

                        // 3. Show success message and close modal
                        Swal.fire('Payment Successful', 'Your booking is confirmed.', 'success');
                        setLoading(false);
                        closeModal();
                        
                    }

                }
                catch (error) {
                    console.log(error)
                }

                // setProcessing(false);
            }
        };
    }


    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto w-full px-4">
            {/* Card Element */}
            <div className="border border-gray-300 rounded-lg p-4 sm:p-5 bg-white shadow-sm transition focus-within:ring-2 focus-within:ring-blue-500">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                <button
                    type="button"
                    onClick={closeModal}
                    className="w-full sm:w-auto border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2 text-sm"
                >
                    Close
                </button>

                <button
                    onClick={handlePay}
                    type="submit"
                    disabled={!stripe && !!loading}
                    className={`w-full sm:w-auto bg-green-600 text-white font-medium rounded-md px-4 py-2 text-sm hover:bg-green-700 transition ${!stripe ? 'opacity-50 cursor-not-allowed' : ''
                        }`}

                >
                    {
                        loading ? <h1>Waiting for pay<span className="loading loading-spinner loading-xs"></span> </h1> : 'Proceed to Pay'
                    }
                </button>
            </div>
        </form>
    );
};

export default PaymentForm;
