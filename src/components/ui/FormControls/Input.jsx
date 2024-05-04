import { useState } from "react";
import { Eye } from "react-bootstrap-icons"


const Input = ({ type, value, label, placeholder = "", name, id, required, invalid, invalidMessage, ...props}) => {
    const [passShow, setPassShow] = useState(false);

    const showPasswordClickHandler = () => {
        setPassShow(!passShow);
    }

    let inputType = type;

    if(inputType === "password" && passShow) inputType = "text";

    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id} className="mb-2 uppercase">{label}</label>
            <div className="relative">
                <input {...props} className={`py-2 px-2 bg-bgGray outline-none w-full ${invalid ? 'border-l-2 border-red-500' : ''}`} type={inputType} name={name} id={id} placeholder={placeholder} required={required ? true : false} value={value} />

                {type === "password" ? <Eye onClick={showPasswordClickHandler} className="text-xl absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer" opacity={passShow ? 1 : 0.6} /> : ''}
            </div>
            {invalid ? <p className="text-xs text-red-500 my-2">{invalidMessage}</p> : ''}
        </div>
    )
}

export default Input