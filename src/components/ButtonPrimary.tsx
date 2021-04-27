import {ButtonHTMLAttributes, FC} from "react";

export const ButtonPrimary: FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => <button
    {...props}
    className={'p-2 bg-blue-900 text-white'}
>{props.children}</button>;