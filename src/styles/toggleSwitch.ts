import { CustomFlowbiteTheme } from 'flowbite-react';

export const toggleSwitchTheme: CustomFlowbiteTheme['toggleSwitch'] = {
  root: {
    base: 'group flex rounded-lg focus:outline-none',
    active: {
      on: 'cursor-pointer',
      off: 'cursor-not-allowed opacity-50'
    },
    label: 'ms-3 mt-0.5 text-start text-sm font-medium text-gray-900 dark:text-gray-300'
  },
  toggle: {
    base: 'relative rounded-full border after:absolute after:rounded-full after:bg-white after:transition-all',
    checked: {
      on: 'after:translate-x-full after:border-white rtl:after:-translate-x-full',
      off: 'border-gray-200 bg-gray-300'
    },
    sizes: {
      sm: 'h-5 w-9 min-w-9 after:left-px after:top-px after:h-4 after:w-4 rtl:after:right-px',
      md: 'h-6 w-11 min-w-11 after:left-px after:top-px after:h-5 after:w-5 rtl:after:right-px',
      lg: 'h-7 w-14 min-w-14 after:left-1 after:top-0.5 after:h-6 after:w-6 rtl:after:right-1'
    }
  }
};
