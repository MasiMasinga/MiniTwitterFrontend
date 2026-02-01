import api from "../api";
import { handleError } from "../utils";

const isBrowser = typeof window !== `undefined`;

export const MakePayment = async (data: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`payment/make/`, data)
        .then(function (response) {
            if (response.status === 201) {
                return {
                    status: true,
                    data: response.data,
                };
            }
        })
        .catch(function (error) {
            return handleError(error);
        });
};

export const VerifyPayment = async (data: any) => {
    if (!isBrowser) return false;

    return await api
        .post(`payment/verify/`, data)
        .then(function (response) {
            if (response.status === 200) {
                return {
                    status: true,
                    data: response.data,
                };
            }
        })
        .catch(function (error) {
            return handleError(error);
        });
};

const PaymentService = {
    MakePayment,
    VerifyPayment,
};

export default PaymentService;