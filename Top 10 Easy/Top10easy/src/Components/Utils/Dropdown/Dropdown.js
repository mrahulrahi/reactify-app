import { useState, useEffect } from 'react';
const locationOptions = [
    {label: 'Raleigh, NC', country: 'united states', city: 'Raleigh', state: 'North Carolina', stateAb: 'NC',  active: true},
    {label: 'San Francisco, CA', country: 'united states', city: 'San Francisco', state: 'California', stateAb: 'CA', active: false}
]
//const RefinementList = connectRefinementList(() => null);

export default function Dropdown(){

    const [filters, setFilters] = useState('')
    const [options, setOptions] = useState(locationOptions)
    function setActive(e){
        const updateOptions = options.map( opt =>{
            return {
                ...opt,
                active : (opt.label === e.target.text) ? true : false
            }
            
        })
        setOptions(updateOptions)
        setFilters(`has_unpublished_changes:false`)
        document.querySelector('ul.dropdown-menu').blur();
    }
    useEffect(()=>{
        
    }, [])

    return <div className="p-4">
                
            <div className="dropdown inline-block relative border-2 rounded-lg mt-2 city-filter">
                <button className="text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                    <span className="mr-1 w-40">{options?.find( opt =>  opt.active === true)?.label ?? 'Oooops' }</span>
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                </button>
                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 mt-1 w-full bg-white">
                    {options.map(opt =>{
                        return <li className="w-full" key={opt.label}>
                                 <a onClick={(e)=>{ setActive(e) }} className="rounded-t hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">{opt.label}</a>
                                </li>
                    })}
                </ul>
            </div>
        </div>
}