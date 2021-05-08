import { environment } from '../../../environments/environment';

let url = environment.baseUrl + '/api/';

export const LOGIN = {
    TOKEN: url + 'Token/login',
    RefreshToken: url + 'Token/refreshToken',
    logout: url + 'Token/Logout'
}
export const USER = {
    USER_DETAILS: url + 'Account/users/me',
    changePassword: url + 'Account/public/changepassword',
    resetPassword: url + 'account/public/resetpassword',
    recoverPassword: url + 'Account/public/recoverpassword'
}
// export const URLS = {
// }

export const CASE = {
    CaseUrl: 'https://api.covid19india.org/v3/data.json',
}
export const HOSPITAL = {
    StateUrl: 'https://cdn-api.co-vin.in/api/v2/admin/location/states',
    DistrictUrl: ' https://cdn-api.co-vin.in/api/v2/admin/location/districts',
    HospitalByPinCodeUrl: 'http://normalindiaservice-env.eba-sxmcmnni.us-east-2.elasticbeanstalk.com/gethospitaldatabypin'
    // '../../../assets/Data/ts.json'
}

