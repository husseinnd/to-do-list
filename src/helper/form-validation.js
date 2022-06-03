export default function validation(email, password) {
  let formIsValid = true;
  const errors = {};
  if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    formIsValid = false;
    errors.email = "Email Not Valid";
  }

  if (!password.match(/^[a-zA-Z]{8,22}$/)) {
    formIsValid = false;
    errors.password =
      "Only Letters and length must best min 8 Chracters and Max 22 Chracters";
  }
  return {
    valid: formIsValid,
    errors,
  };
}
