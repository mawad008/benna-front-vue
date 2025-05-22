export default defineAppConfig({
  ui: {
    primary: "blue",
    gray: "stone",
    avatar:{
      slots: {
        root: 'inline-flex items-center justify-center shrink-0 select-none rounded-full align-middle bg-elevated',
        image: 'h-full w-full rounded-[inherit] object-cover',
        fallback: 'font-medium leading-none',
        icon: 'text-muted shrink-0'
      },
    },
    Ubadge: {
      base: "inline-flex items-center",
      rounded: "rounded-md",
      font: "font-medium",
      size: {
        xs: "text-xs px-1.5 py-0.5",
        sm: "text-xs px-2 py-1",
        md: "text-sm px-2 py-1",
        lg: "text-sm px-2.5 py-1.5",
      },
      gap: {
        xs: "gap-0.5",
        sm: "gap-1",
        md: "gap-1",
        lg: "gap-1.5",
      },
      color: {
        white: {
          solid:
            "ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white dark:bg-gray-900",
        },
        gray: {
          solid:
            "ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800",
        },
        black: {
          solid: "text-white dark:text-gray-900 bg-gray-900 dark:bg-white ",
        },
        green: {
          solid:
            "bg-green-500 dark:bg-green-400 text-white dark:text-gray-900 ring-1 ring-inset ring-green-500 dark:ring-green-400",
        },
        red: {
          solid:
            "bg-red-500 dark:bg-red-400 text-white dark:text-gray-900 ring-1 ring-inset ring-red-500 dark:ring-red-400",
        },
        yellow: {
          solid:
            "bg-yellow-500 dark:bg-yellow-400 text-white dark:text-gray-900 ring-1 ring-inset ring-yellow-500 dark:ring-yellow-400",
        },
        blue: {
          solid:
            "bg-blue-500 dark:bg-blue-400 text-white dark:text-gray-900 ring-1 ring-inset ring-blue-500 dark:ring-blue-400",
        },
      },
      variant: {
        solid:
          "bg-{color}-500 dark:bg-{color}-400 text-white dark:text-gray-900",

        outline:
          "text-{color}-500 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400",

        soft: "bg-{color}-50 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400",

        subtle:
          "bg-{color}-50 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 ring-opacity-25 dark:ring-opacity-25",
      },
      icon: {
        base: "flex-shrink-0",
        size: {
          xs: "h-4 w-4",
          sm: "h-4 w-4",
          md: "h-5 w-5",
          lg: "h-5 w-5",
        },
      },
      default: {
        size: "sm",
        variant: "solid",
        color: "primary",
      },
    },
    input: {
      wrapper: "relative",
      base: "relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 border-[#d1d5db] dark:border-[#d1d5db] ",
      form: "form-input",
      rounded: "rounded-sm",
      placeholder: "placeholder-gray-400 dark:placeholder-gray-500",
      color: {
        white: {
          outline:
            "shadow-sm bg-transparent dark:bg-white text-dark dark:text-gray-900 ring-1 ring-inset ring-[#d1d5db] dark:ring-[#d1d5db] focus:ring-1 focus:ring-[#d1d5db] dark:focus:ring-[#d1d5db]",
        },
        gray: {
          outline:
            "shadow-sm bg-transparent dark:bg-white text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-[#138B96] dark:focus:ring-[#138B96]",
        },
      },
      variant: {
        outline:
          "shadow-sm bg-transparent text-gray-900 dark:text-dark ring-1 ring-inset ring-[#d1d5db] dark:ring-[#d1d5db] focus:ring-2 focus:ring-[#d1d5db] dark:focus:ring-[#d1d5db] bg-[#A6AFC366]",
        none: "bg-transparent focus:ring-0 focus:shadow-none",
      },
      default: {
        size: "md",
        color: "primary",
        variant: "outline",
      },
    },
    textarea: {
      wrapper: "relative",
      base: "relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 border-[#d1d5db] dark:border-[#d1d5db] ",
      form: "form-textarea",
      rounded: "rounded-md",
      placeholder: "placeholder-gray-400 dark:placeholder-gray-500",
      color: {
        white: {
          outline:
            "shadow-sm bg-transparent dark:bg-white text-dark dark:text-gray-900 ring-1 ring-inset ring-[#d1d5db] dark:ring-[#d1d5db] focus:ring-1 focus:ring-[#d1d5db] dark:focus:ring-[#d1d5db]",
        },
        gray: {
          outline:
            "shadow-sm bg-transparent dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-[#138B96] dark:focus:ring-[#138B96]",
        },
      },
      variant: {
        outline:
          "shadow-sm bg-transparent text-gray-900 dark:text-dark ring-1 ring-inset ring-[#d1d5db] dark:ring-[#d1d5db] focus:ring-2 focus:ring-[#d1d5db] dark:focus:ring-[#d1d5db] bg-[#A6AFC366]",
        none: "bg-transparent focus:ring-0 focus:shadow-none",
      },
      default: {
        size: "sm",
        color: "primary",
        variant: "outline",
      },
    },
    button: {
      base: "focus:outline-none flex-shrink-0 font-medium rounded-md text-center",
      block: "w-full flex justify-center items-center",
      padding: {
        sm: "px-4 py-2",
        md: "px-5 py-2.5",
        lg: "px-6 py-3",
      },
      color: {
        primary: {
          solid:
            "bg-[#107b86] text-[#fff] hover:bg-[#044B56] hover:text-[#fff] focus-visible:ring-2 focus-visible:ring-[#107b86]",
        },

        icon: {
          solid:
            "bg-transparent text-[#111928] hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-400",
        },
        selector: {
          solid:
            "bg-[#107b86] text-[#fff] hover:bg-[#044B56] hover:text-[#fff] focus-visible:ring-2 focus-visible:ring-[#107b86]",
        },
      },
      variant: {
        solid:
          "shadow-sm bg-gray-400 text-white hover:bg-gray-600 focus-visible:ring-2 focus-visible:ring-{color}-500",
        outline:
          "ring-1 ring-inset ring-gray-300 text-dark hover:bg-[#C2EBEC] focus-visible:ring-2 focus-visible:ring-{color}-500",
      },
      default: {
        size: "sm",
        variant: "outline",
        color: "primary",
      },
    },
    modal: {
      wrapper: "relative z-50",
      inner: "fixed inset-0 overflow-y-auto",
      container: "flex min-h-full items-center justify-center text-center",
      padding: "p-6 sm:p-8",
      margin: "sm:my-10",
      base: "relative text-left rtl:text-right flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-2xl",
      overlay: {
        base: "fixed inset-0 transition-opacity",
        background: "bg-gray-900/60 dark:bg-gray-800/80",
        transition: {
          enter: "ease-out duration-300",
          enterFrom: "opacity-0",
          enterTo: "opacity-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
        },
      },
      background: "bg-white dark:bg-white",
      ring: "ring-1 ring-gray-300 dark:ring-gray-700",
      rounded: "rounded-2xl",
      shadow: "shadow-xl dark:shadow-gray-800",
      width: "w-full sm:max-w-md",
      height: "",
      fullscreen: "w-screen h-screen",
      transition: {
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 scale-95",
        enterTo: "opacity-100 scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 scale-100",
        leaveTo: "opacity-0 scale-95",
      },
    },
    radio: {
      wrapper: "relative flex items-start",
      container: "flex items-center h-5",
      base: "h-4 w-4 dark:checked:bg-current dark:checked:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent",
      form: "form-radio",
      color: "text-{color}-500 dark:text-{color}-400",
      background: "bg-white dark:bg-white",
      border: "border border-gray-300 dark:border-gray-700",
      ring: "focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
      inner: "ms-3 flex flex-col",
      label: "text-sm font-medium text-[#111928] dark:text-[#111928]",
      required: "text-sm text-red-500 dark:text-red-400",
      help: "text-sm text-gray-500 dark:text-gray-400",
      default: {
        color: "primary",
      },
    },
    select: {
      wrapper: "relative",
      base: "relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0",
      form: "form-select",
      rounded: "rounded-md",
      placeholder: "text-gray-400 dark:text-gray-500",
      file: {
        base: "file:mr-1.5 file:font-medium file:text-gray-500 dark:file:text-gray-400 file:bg-transparent file:border-0 file:p-0 file:outline-none",
      },
      color: {
        white: {
          outline:
            "shadow-sm bg-white dark:bg-white text-gray-900 dark:text-gray-900 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
        },
        gray: {
          outline:
            "shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
        },
        black: {
          outline:
            "bg-gray-900 dark:bg-white text-white dark:text-gray-900 ring-1 ring-inset ring-gray-900 dark:ring-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400",
        },
        green: {
          outline:
            "bg-green-500 dark:bg-green-400 text-white dark:text-gray-900 ring-1 ring-inset ring-green-500 dark:ring-green-400 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400",
        },
        red: {
          outline:
            "bg-red-500 dark:bg-red-400 text-white dark:text-gray-900 ring-1 ring-inset ring-red-500 dark:ring-red-400 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400",
        },
      },
      variant: {
        outline:
          "shadow-sm bg-transparent text-gray-900 dark:text-white ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 focus:ring-2 focus:ring-{color}-500 dark:focus:ring-{color}-400",
        none: "bg-transparent focus:ring-0 focus:shadow-none",
      },
      default: {
        size: "sm",
        color: "primary",
        variant: "outline",
        loadingIcon: "i-heroicons-arrow-path-20-solid",
        trailingIcon: "i-heroicons-chevron-down-20-solid",
      },
    },
    table: {
      wrapper: "relative overflow-x-auto",
      base: " table-fixed",
      divide: "divide-y divide-gray-300 dark:divide-gray-300",
      thead: "relative",
      tbody: "divide-y divide-gray-200 dark:divide-gray-200",
      caption: "sr-only",
      tr: {
        base: "",
        selected: "bg-white dark:bg-white",
        expanded: "bg-white dark:bg-white",
        active: "hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer",
      },
      th: {
        base: "text-left rtl:text-right",
        padding: "px-4 py-3.5",
        color: "text-[#111928] dark:text-[#111928]",
        font: "font-semibold",
        size: "text-sm",
      },
      td: {
        base: "whitespace-nowrap",
        padding: "px-4 py-4",
        color: "text-[#111928] dark:text-[#111928]",
        font: "",
        size: "text-sm",
      },
      checkbox: {
        padding: "ps-4",
      },
      loadingState: {
        wrapper:
          "flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",
        label: "text-sm text-center text-[#111928] dark:text-[#111928]",
        icon: "w-6 h-6 mx-auto text-[#138B96] dark:text-[#138B96] mb-4 animate-spin",
      },
      emptyState: {
        wrapper:
          "flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",
        label: "text-sm text-center text-[#111928] dark:text-[#111928]",
        icon: "w-6 h-6 mx-auto text-[#138B96] dark:text-[#138B96] mb-4",
      },
      expand: {
        icon: "transform transition-transform duration-200",
      },
      progress: {
        wrapper: "absolute inset-x-0 -bottom-[0.5px] p-0",
      },
      default: {
        sortAscIcon: "i-heroicons-bars-arrow-up-20-solid",
        sortDescIcon: "i-heroicons-bars-arrow-down-20-solid",
        color: "#111928",
        sortButton: {
          icon: "i-heroicons-arrows-up-down-20-solid",
          trailing: true,
          square: true,
          class: "-m-1.5",
        },

        expandButton: {
          icon: "i-heroicons-chevron-down",
          class: "-my-1.5 align-middle",
        },
        checkbox: {
          color: "primary",
        },
        progress: {
          color: "primary",
          animation: "carousel",
        },
        loadingState: {
          icon: "i-heroicons-arrow-path-20-solid",
          label: "Loading...",
        },
        emptyState: {
          icon: "i-heroicons-circle-stack-20-solid",
          label: "No items.",
        },
      },
    },
    dropdown: {
      wrapper: "relative inline-flex text-left rtl:text-right",
      container: "z-20 group",
      trigger: "inline-flex w-full",
      width: "w-48",
      height: "",
      background: "bg-white dark:bg-white",
      shadow: "shadow-lg",
      rounded: "rounded-md",
      ring: "ring-none dark:ring-none",
      base: "relative focus:outline-none overflow-y-auto scroll-py-1",
      divide: "divide-y divide-gray-200 dark:divide-gray-700",
      padding: "p-1",
      item: {
        base: "group flex items-center gap-1.5 w-full",
        rounded: "rounded-md",
        padding: "px-1.5 py-1.5",
        size: "text-sm",
        active:
          "bg-primary-20 dark:bg-primary-20 text-primary dark:text-primary",
        inactive: "text-[#111928] dark:text-[#111928]",
        disabled: "cursor-not-allowed opacity-50",
        icon: {
          base: "flex-shrink-0 w-5 h-5",
          active: "text-primary dark:text-primary",
          inactive: "text-gray-400 dark:text-gray-500",
        },
        transition: {
          enterActiveClass: "transition duration-100 ease-out",
          enterFromClass: "transform scale-95 opacity-0",
          enterToClass: "transform scale-100 opacity-100",
          leaveActiveClass: "transition duration-75 ease-in",
          leaveFromClass: "transform scale-100 opacity-100",
          leaveToClass: "transform scale-95 opacity-0",
        },
        popper: {
          placement: "bottom-end",
          strategy: "fixed",
        },
        default: {
          openDelay: 0,
          closeDelay: 0,
        },
        arrow: {
          base: "invisible before:visible before:block before:rotate-45 before:z-[-1] before:w-2 before:h-2",
          ring: "before:ring-1 before:ring-gray-200 dark:before:ring-gray-700",
          rounded: "before:rounded-sm",
          background: "before:bg-white dark:before:bg-gray-700",
          shadow: "before:shadow",
          placement:
            "group-data-[popper-placement*='right']:-left-1 group-data-[popper-placement*='left']:-right-1 group-data-[popper-placement*='top']:-bottom-1 group-data-[popper-placement*='bottom']:-top-1",
        },
      },
    },
    skeleton: {
      base: "animate-pulse rounded-md bg-primary-20 dark:bg-primary-20 ",
    },
  },
});
