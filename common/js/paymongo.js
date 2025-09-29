// PayMongo integration module for APTI Property Management

const PayMongo = (function() {
    const API_BASE = 'https://api.paymongo.com/v1';
    // TODO: Replace with your actual PayMongo public and secret keys
    // Get these from https://dashboard.paymongo.com/developers/api-keys
    const PUBLIC_KEY = 'pk_test_CGzPmDHi3VGPcRzxZpTnVyvY';
    const secretKey = process.env.STRIPE_SECRET_KEY; // use env variable instead


    // Helper function to make API calls to PayMongo
    async function apiRequest(endpoint, method = 'GET', body = null) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(SECRET_KEY + ':')
        };

        const options = {
            method,
            headers
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(API_BASE + endpoint, options);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'PayMongo API error');
        }
        return response.json();
    }

    // Create a payment intent
    async function createPaymentIntent(amount, currency = 'PHP', description = '') {
        const body = {
            data: {
                attributes: {
                    amount: amount * 100, // amount in centavos
                    currency,
                    description
                }
            }
        };
        return apiRequest('/payment_intents', 'POST', body);
    }

    // Attach a payment method to a payment intent
    async function attachPaymentMethod(paymentIntentId, paymentMethodId) {
        const body = {
            data: {
                attributes: {
                    payment_method: paymentMethodId,
                    payment_method_options: {
                        card: {
                            request_three_d_secure: 'any'
                        }
                    },
                    return_url: window.location.href
                }
            }
        };
        return apiRequest(`/payment_intents/${paymentIntentId}/attach`, 'POST', body);
    }

    // Create a payment method (card)
    async function createPaymentMethod(cardDetails) {
        const body = {
            data: {
                attributes: {
                    type: 'card',
                    details: cardDetails
                }
            }
        };
        return apiRequest('/payment_methods', 'POST', body);
    }

    return {
        createPaymentIntent,
        createPaymentMethod,
        attachPaymentMethod
    };
})();

window.APTI_PayMongo = PayMongo;
export default PayMongo;
