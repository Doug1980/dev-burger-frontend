import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    'pk_test_51ScmkFJSwdiYWBI0E389ynzGMngUnGskG1AoVmjOyfT2qV8kCPQnlS4tMxmVsPzF69QzVDi87dEOFzy59qIkGG2P00ZjT1R1K2'
);

export default stripePromise;