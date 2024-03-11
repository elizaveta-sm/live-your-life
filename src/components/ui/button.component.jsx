import { useEffect, useState } from "react";

export const BUTTON_STYLE_TYPES = {
    base: 'base',
    delete: 'delete',
    cancel: 'cancel',
    confirm: 'confirm'
};

const BUTTON_STYLES = {
    base: 'py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800',
    confirm: 'py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800',
    delete: 'py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800',
    cancel: 'py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-neutral-600 transition-all text-sm dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800',
}


const getButtonStyle = (buttonStyleType = BUTTON_STYLE_TYPES.base) => {
    return BUTTON_STYLES[buttonStyleType];
};

const Button = (props) => {
    const { value, validation, buttonStyleType, type, onClick } = props;
  
    const style = getButtonStyle(buttonStyleType);

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (validation) {
            setDisabled(false);
        } else {
            setDisabled(true)
        }
    }, [validation])

    return (
        <button type={type} className={style} disabled={disabled}onClick={onClick}>
            {value}
        </button>
    )
};

export default Button;