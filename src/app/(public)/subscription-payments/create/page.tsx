// 'use client';

// import { useCreateSubscriptionPayment } from '@/hooks';
// import { useCreateSubscription } from '@/hooks';

// const SubscriptionPayment = () => {
//     const {
//         mutateAsync: createSubscription,
//         isPending: isCreatingSubscription,
//     } = useCreateSubscription();

//     const { mutateAsync: createPayment, isPending: isCreatingPayment } =
//         useCreateSubscriptionPayment();

//     const isPending = isCreatingSubscription || isCreatingPayment;

//     const handlePayment = async () => {
//         try {
//             // 1. Create subscription
//             const subscriptionResponse = await createSubscription({
//                 planId: 'd4361aa1-31a8-4ccb-99ae-6ee9ed5cc252',
//             });

//             console.log('Subscription response:', subscriptionResponse);

//             // 2. Get subscription ID
//             const subscriptionId = subscriptionResponse.data.id;

//             // 3. Create bKash payment
//             const paymentResponse = await createPayment({
//                 subscriptionId,
//                 paymentGateway: 'BKASH',
//             });

//             console.log('Payment response:', paymentResponse);

//             // 4. Redirect to bKash
//             window.location.href = paymentResponse.data.bkashURL;
//         } catch (error) {
//             console.error('Subscription payment failed:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Subscription Payment</h1>

//             <button type="button" onClick={handlePayment} disabled={isPending}>
//                 {isPending ? 'Processing...' : 'Pay with bKash'}
//             </button>
//         </div>
//     );
// };

// export default SubscriptionPayment;
