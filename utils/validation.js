export const validateField = (field, value, form) => {
  let error = '';

 if (field === 'name') {
  if (!value) {
    error = 'Name is required';
  } else if (!/^[A-Za-z]+( [A-Za-z]+)*$/.test(value)) {
    error = 'Invalid Name';
  }
}

 if (field === 'lastname') {
  if (!value) {
    error = 'Last Name is required';
  } else if (!/^[A-Za-z]+( [A-Za-z]+)*$/.test(value)) {
    error = 'Invalid Last Name';
  }
}

  if (field === 'email') {
    if (!value) error = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email';
  }

  if (field === 'password') {
    if (!value) {
      error = 'Password is required';
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value)
    ) {
      error =
        'Min 8 chars, 1 uppercase, 1 number & 1 special char required';
    }
  }

  if (field === 'confirmPassword') {
    if (!value) {
      error = 'Confirm password is required';
    } else if (value !== form.password) {
      error = 'Passwords do not match';
    }
  }

 if (field === 'phone') {
    if (!value) {
      error = 'Phone number is required';
    } else if (!/^\d{10}$/.test(value)) {
      error = 'Invalid Phone Number (10 digits required)';
    }
  }

  if(field === 'gender'){
    if(!value){
      error = 'Gender is requird';
    }
  }

  if(field === 'message'){
    if(!value){
      error = 'Message is requird';
    }
  }

  return error;   
};