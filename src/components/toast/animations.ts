import { cssTransition } from 'react-toastify';

export const bounce = cssTransition({
  enter: 'animate__animated animate__bounceIn',
  exit: 'animate__animated animate__bounceOut'
});
