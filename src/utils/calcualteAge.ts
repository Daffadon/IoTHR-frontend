export const calculateAge = (birthdateString: string) => {
  const [month, day, year] = birthdateString.split('/').map(Number);
  const birthdate = new Date(year, month - 1, day);

  const today = new Date();

  let age = today.getFullYear() - birthdate.getFullYear();

  const monthDifference = today.getMonth() - birthdate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }

  return age;
};
