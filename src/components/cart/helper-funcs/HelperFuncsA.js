import BmdAuth from "../../../bs-library/core/BmdAuth";

export const prepareCartBmdHttpRequestData = () => {
    let requestParams = { temporaryGuestUserId: BmdAuth.getTemporaryGuestUserId() };
    let requestMethod = 'get';

    if (BmdAuth.isLoggedIn()) {
        const bmdAuth = BmdAuth.getInstance();
        requestParams = {
            bmdToken: bmdAuth?.bmdToken,
            authProviderId: bmdAuth?.authProviderId
        };
        requestMethod = 'post';
    }

    const bmdHttpRequestData = { 
        method: requestMethod,
        params: requestParams
    };

    return bmdHttpRequestData;
};