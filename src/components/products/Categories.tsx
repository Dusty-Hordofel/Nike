import React from 'react'

type Props = {}



type categoriesProps = {
    categories: {
        name: string,
        url: string
    }[]
}
const Categories = ({ categories }: categoriesProps) => {

    return (
        <div className='pb-10 font-medium'>
            {categories.map(({ name, url }, index) => (

                <button
                    key={index}
                    aria-label={`Category for ${name}`}
                    className="block"
                    data-url={url}
                    role="link"
                    type="button"
                    data-group-type="category"
                    data-group-name={name}
                >
                    {name}
                </button>
            ))}
        </div>

    )
}

export default Categories