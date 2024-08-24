
export const api = {
  BASE_URL: "https://dea8-2405-201-201f-9802-6937-abfd-4556-c92e.ngrok-free.app/api/",

  // Auth
  login: 'login',
  register: 'register',
  forgotEmail:'forgot-password/send-otp',
  sendEmailOtp:'forgot-password/login-with-otp',
  updatePasswords:'forgot-password/update-password',
  googleEmail:'login/google',
  updateProfile:'update-profile',

  get_cities:"get-cities",
  getCountry:"get-selected-country",
  getState:"get-selected-state",
  getCuisines:"cuisines",
  getChefs:"chefs",
  getMenu:"menu",
  chefsRegister:"chefs",
  search_cities:'cities/search',
  getCuisinesMenuList:'cuisine-menu',

  //student
  studentRegister:"student-register",
  canteenRegister:"canteen-register",
  universities:"universities",
  university:"university",
  cuisineMenu:"canteen-menu",
  canteenCuisine:'canteen-cuisine',
  getStudentMenu:"cuisine-menu",
};

export const POST = "POST";
export const GET = "GET";
export const PUT = "PUT";
export const DELETE = "DELETE";
export const PATCH = "PATCH";

export const GOOGLE_API_KEY = "AIzaSyDEjeEjROHSLP3YfRln7Sk1GxUQSTGOGCI";

export const GOOGLE_WEB_CLINET_ID =
  "664452756526-me5g021moorbt53hghlcvlekjv5btuno.apps.googleusercontent.com";
