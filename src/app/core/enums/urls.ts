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

