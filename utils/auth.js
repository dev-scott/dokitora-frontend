import axios from "axios";

const urlRegister = "http://192.168.1.102:1337/api/auth/local/register";
const urlLogin = " http://192.168.1.102:1337/api/auth/local";

const urlReset = "http://192.168.1.102:1337/api/auth/forgot-password";

const urlForgotPassword = "http://192.168.1.102:1337/api/auth/forgot-password";

const urlResetPassword = "http://192.168.1.102:1337/api/auth/reset-password";

const urlRegisterWithPhoneAndOTP ="http://192.168.1.102:1337/api/auth/registerUserWithOtp";

const urlVerifyAccount = "http://192.168.1.102:1337/api/auth/verifyAccount";

const urlUpdateAccount = "http://192.168.1.102:1337/api/auth/updateAccount";

const urlResentOtp = "http://192.168.1.102:1337/api/auth/updateUserOtp"



// const urlRegister = "http://192.168.202.18:1337/api/auth/local/register";
// const urlLogin = " http://192.168.202.18:1337/api/auth/local";

// const urlReset = "http://192.168.202.18:1337/api/auth/forgot-password";

// const urlForgotPassword = "http://192.168.202.18:1337/api/auth/forgot-password";

// const urlResetPassword = "http://192.168.202.18:1337/api/auth/reset-password";

// const urlRegisterWithPhoneAndOTP ="http://192.168.202.18:1337/api/auth/registerUserWithOtp";

// const urlVerifyAccount = "http://192.168.202.18:1337/api/auth/verifyAccount";

// const urlUpdateAccount = "http://192.168.202.18:1337/api/auth/updateAccount";

// const urlResentOtp = "http://192.168.202.18:1337/api/auth/updateUserOtp"

export async function createUser(username, email , date , password) {
  console.log(username, email, password);

  const response = await axios.post(urlRegister, {
    username: username,
    email: email,
    password: password,
    role: 4,
  });

  // const token = response.data.jwt

  // console.log(response)
  return response;
}

export async function login(email, password) {
  console.log(email, password);

  const response = await axios.post(urlLogin, {
    identifier: email,
    password: password,
  });

  // console.log(response.jwt)

  // console.log(response.data.user.id)
  // const token = response.data.jwt;

  // console.log(token);

  return response;
}

export async function forgotPassword(email) {
  console.log(email);

  const response = await axios.post(urlForgotPassword, {
    email: email,
  });
}

export async function resetPassword(
  enterPassword,
  enteredConfirmPassword,
  resetToken
) {
  const response = await axios.post(urlResetPassword, {
    password: enterPassword,
    confirmPassword: enteredConfirmPassword,
    token: resetToken,
  });
  console.log(response);
}

export async function registerWithPhoneAndOTP(username, phone) {
  console.log(username, phone);

  const response = await axios.post(urlRegisterWithPhoneAndOTP, {
    username: username,
    phone: phone,
    role: 4,
  });

  console.log(response);
  return response.jwt;
}

export async function verifyAccount(myOtp) {
  console.log(myOtp);

  const otpAsInt = parseInt(myOtp,10)

  const response = await axios.post(urlVerifyAccount, {
    otp: otpAsInt,
  });
}

export async function updateAccount(phone, password) {
  console.log(phone, password);

  const response = await axios.post(urlUpdateAccount, {
    phone: phone,
    password: password,
  });

  return response


}
export async function resentOtp(phone) {
  console.log(phone);

  const response = await axios.post(urlResentOtp, {
    phone: phone,
  });

  console.log(response);

  return response


}
