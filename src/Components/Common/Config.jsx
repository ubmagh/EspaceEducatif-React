
let env_api_host = process.env.API_HOST ? process.env.API_HOST :"http://localhost:8000";

export const ApiHost=env_api_host;
/*
export const ApiHost = "http://192.168.43.250:8000";

php artisan serve --host=192.168.43.250 --port=8000
*/
export default ApiHost;
