import {FC, HTMLProps} from "react";

export const InputPrimary: FC<HTMLProps<HTMLInputElement>> = props => <input
    {...props}
    className={props.className + ' p-3 border border-grey-400 rounded'}
/>;