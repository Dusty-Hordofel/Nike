// "use client";
// import { Chevron } from "@/icons";
// import classNames from "classnames";
// import { useState } from "react";
// import React from "react";
// import ProductCheckbox from "./ProductCheckbox";
// import { cn } from "@/lib/utils";
// import ShoeSizeSelector from "./ShoeSizeSelector";
// import ColorFilter from "./ColorFilter";
// import { IProduct } from "@/types/types";

// interface AccordionProps {
//     title: string,
//     type?: "size" | "color" | "brand" | "price" | "category" | "property" | "sexe",
//     data?: {
//         name: string,
//         label: string,
//         type: string,
//         defaultValue: boolean,
//         url: string
//     }[]
//     products?: IProduct[]
// }

// const FilterAccordion = ({ data, title, type, products }: AccordionProps) => {
//     const [isClicked, setIsClicked] = useState(false);
//     const [selectedColors, setSelectedColors] = useState<string[]>([])
//     const [isChecked, setIsChecked] = useState(false);
//     const [filteredProducts, setFilteredProducts] = useState<IProduct[] | undefined>(products)

//     const filterProductsByColor = (selectedColors: string[]) => {
//         if (selectedColors.length === 0) {
//             products && setFilteredProducts(products)
//             return
//         } else {
//             const filteredProducts = products && products.filter((product) => {
//                 return selectedColors.includes(product.color)
//             })
//             products && setFilteredProducts(filteredProducts)
//         }
//     }

//     return (
//         <div
//             className={cn("border-t-[1px] border-gray-200")}
//         >
//             <div
//                 className={cn("py-3 flex items-center justify-between"/*, isClicked ? "pb-[32px]" : ""*/)}

//                 onClick={() => setIsClicked(prev => !prev)}
//             >
//                 <div className="font-medium flex">
//                     <p>{title}</p> &nbsp;
//                     {selectedColors.length > 0 && <span className="block">{type === "color" ? `(${selectedColors.length})` : ""}</span>}
//                 </div>
//                 <span>
//                     <Chevron
//                         className={classNames(
//                             "w-4 h-4 transition-all duration-300 ease-in-out",
//                             isClicked ? "rotate-90" : "-rotate-90"
//                         )}
//                     />
//                 </span>
//             </div>
//             <div className={cn(isClicked ? "block" : "hidden", "transition-all pb-4")}>
//                 {type === "size" ? <ShoeSizeSelector />
//                     : type === "color" ? <ColorFilter colors={Array.from(new Set(products?.map((product) => product.color)))} onFilterChange={filterProductsByColor} isChecked={isChecked} setIsChecked={setIsChecked} selectedColors={selectedColors} setSelectedColors={setSelectedColors} />
//                         : type === "property" ? <ProductCheckbox label="Classique" name="classique" type="checkbox" defaultValue={true} url="https://www.nike.com/fr/w/running-chaussures-37v7jz5e1x6znik1zy7ok" />
//                             : type === "sexe" ? <>
//                                 <ProductCheckbox label="Homme" name="homme" type="checkbox" defaultValue={true} url="https://www.nike.com/fr/w/running-chaussures-37v7jz3rauvz5e1x6zy7ok" />
//                                 <ProductCheckbox label="Femme" name="femme" type="checkbox" defaultValue={true} url="https://www.nike.com/fr/w/running-chaussures-37v7jz3rauvznik1zy7ok" />
//                                 <ProductCheckbox label="Mixte" name="mixte" type="checkbox" defaultValue={true} url="https://www.nike.com/fr/w/running-chaussures-37v7jz5e1x6znik1zy7ok" />
//                             </> :
//                                 <>
//                                     {data?.map(({ label, name, type, url }, index) => (
//                                         <ProductCheckbox label={label} name={name} type={type} url={url} key={index} />

//                                     ))}
//                                 </>
//                 }
//             </div>

//         </div>
//     );
// };

// export default FilterAccordion;
