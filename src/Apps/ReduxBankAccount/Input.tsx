import React, {ComponentProps, ReactNode} from "react";

interface InputProps extends ComponentProps<"input"> {
    children?: ReactNode;
}
const Input: React.FC<InputProps> = ({children, ...props}) => {
  return (
      <>
          {children && <label>{children}</label>}
          <input {...props} />
      </>
  )
}

export default Input