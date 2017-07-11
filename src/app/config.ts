import {environment} from '../environments/environment'
export const CONFIG={
    // apiUrl:'/api'
    apiUrl:environment.production?'':'/api'
    // apiUrl:'http://118.89.186.130'
};
