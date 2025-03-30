'use client'
import { useState, useEffect } from 'react'
import Select from 'react-select'

const PhoneSelect = ({ options, disabled }: { options: { value: string, label: string }[], disabled?: boolean }) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        isClient ? (
            <Select 
                options={options}
            className="phone-select position-relative"
            classNamePrefix="phone-select"
            placeholder="+91"
            isDisabled={disabled}
            />
        ) : null
    )
}

export default PhoneSelect