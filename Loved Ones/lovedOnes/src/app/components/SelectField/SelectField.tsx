'use client'
import { useState, useEffect } from 'react'
import Select from 'react-select'

const SelectField = ({options, className, classNamePrefix, placeholder, styles}: {options: any, className: string, classNamePrefix: string, placeholder: string, styles: any}) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        isClient ? (
            <Select options={options} className={className} classNamePrefix={classNamePrefix} placeholder={placeholder} styles={styles}  />
        ) : null
    ) 
}

export default SelectField