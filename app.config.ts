export default defineAppConfig({
  ui: {
    primary: "blue",
    Ubadge: {
      base: 'inline-flex items-center',
      rounded: 'rounded-md',
      font: 'font-medium',
      size: {
        xs: 'text-xs px-1.5 py-0.5',
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-2 py-1',
        lg: 'text-sm px-2.5 py-1.5'
      },
      gap: {
        xs: 'gap-0.5',
        sm: 'gap-1',
        md: 'gap-1',
        lg: 'gap-1.5'
      },
      color: {
        white: {
          solid: 'ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white dark:bg-gray-900'
        },
        gray: {
          solid: 'ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800'
        },
        black: {
          solid: 'text-white dark:text-gray-900 bg-gray-900 dark:bg-white'
        },
        green: {
          solid: 'bg-green-500 dark:bg-green-400 text-white dark:text-gray-900', 
        },
        red: {
          solid: 'bg-red-500 dark:bg-red-400 text-white dark:text-gray-900',
        },
      },
      variant: {
        solid: 'bg-{color}-500 dark:bg-{color}-400 text-white dark:text-gray-900',
        outline: 'text-{color}-500 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400',
        soft: 'bg-{color}-50 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400',
        subtle: 'bg-{color}-50 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 ring-opacity-25 dark:ring-opacity-25'
      },
      icon: {
        base: 'flex-shrink-0',
        size: {
          xs: 'h-4 w-4',
          sm: 'h-4 w-4',
          md: 'h-5 w-5',
          lg: 'h-5 w-5'
        }
      },
      default: {
        size: 'sm',
        variant: 'solid',
        color: 'primary'
      }
    },
    input: {
      wrapper: 'relative',
      base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
      form: 'form-input',
      rounded: 'rounded-md',
      placeholder: 'placeholder-gray-400 dark:placeholder-gray-500',
      color: {
        white: {
          outline: 'shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-1 focus:ring-[#138B96] dark:focus:ring-[#138B96]'
        },
        gray: {
          outline: 'shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-[#138B96] dark:focus:ring-[#138B96]'
        }
      },
      variant: {
        outline: 'shadow-sm bg-[#fff] text-gray-900 dark:text-dark ring-1 ring-inset ring-[#138B96] dark:ring-[#138B96] focus:ring-2 focus:ring-[#138B96] dark:focus:ring-[#138B96] bg-[#A6AFC366]',
        none: 'bg-transparent focus:ring-0 focus:shadow-none'
      },
      default: {
        size: 'sm',
        color: 'primary',
        variant: 'outline'
      }
    },
    button: {
      base: 'focus:outline-none flex-shrink-0 font-medium rounded-md text-center',
      block: 'w-full flex justify-center items-center',
      padding: {
        sm: 'px-4 py-2',
        md: 'px-5 py-2.5',
        lg: 'px-6 py-3'
      },
      color: {
        primary: {
          solid: 'bg-[#138B96] text-white hover:bg-[#107b86] focus-visible:ring-2 focus-visible:ring-[#107b86]'
        },
        icon: {
          solid: 'bg-transparent text-[#111928] hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-400'
        }
      },
      variant: {
        solid: 'shadow-sm bg-gray-400 text-[#111928] hover:bg-gray-600 focus-visible:ring-2 focus-visible:ring-{color}-500',
        outline: 'ring-1 ring-inset ring-gray-300 text-dark hover:bg-{color}-50 focus-visible:ring-2 focus-visible:ring-{color}-500',
      },
      default: {
        size: 'sm',
        variant: 'outline',
        color: 'primary'
      }
    }
  }
});