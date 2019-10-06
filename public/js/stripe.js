import Axios from "axios";
import {
  showAlert
} from './alerts';

/* eslint-disable */
const stripe = Stripe('pk_test_KxVJfyTeTKR36Ah9t9Vgql4e00PQLfQfpQ');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await Axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    // console.log(err);
    showAlert('error', err)
  }

}
