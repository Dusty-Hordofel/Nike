"use client";
import { useState } from "react";

interface ProductCheckboxProps {
    label: string;
    name: string;
    type?: string;
    url?: string;
    defaultValue?: boolean;
    // title: string;
    // isChecked: boolean;
    // setIsChecked: React.Dispatch<React.SetStateAction<boolean>>; // Type pour la fonction qui met à jour l'état
    // isChecked?: boolean;
    // handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductCheckbox = ({ label, name, type, defaultValue, url }: ProductCheckboxProps) => {
    const checkboxInputValue = defaultValue ? defaultValue : false;
    const [isChecked, setIsChecked] = useState(checkboxInputValue);
    const [checkedInput, setCheckedInput] = useState<string>("")
    console.log("🚀 ~ file: ProductCheckbox.tsx:16 ~ ProductCheckbox ~ isChecked:", isChecked, checkedInput)
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(prev => !prev);
        setCheckedInput(e.target.name)
    };
    return (
        <div className='flex items-center m-[2px]' >
            <input
                className="cursor-pointer mr-[6px]"
                type={type}
                name={name}
                // checked={isChecked}
                {...((defaultValue) && { defaultChecked: true })}
                aria-label="Filtrer sur"
                data-url={url}
                role="checkbox"
                data-group-type="filter"
                data-is-color="false"
                onChange={handleCheckboxChange}
            />
            <label htmlFor={name} className='cursor-pointer flex items-center pt-1'>
                <span className='capitalize'>{label}</span>
            </label>
        </div >

    );
};
export default ProductCheckbox;