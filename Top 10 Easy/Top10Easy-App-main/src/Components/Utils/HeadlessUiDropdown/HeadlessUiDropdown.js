import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export default function HeadlessUiDropdown({
  optionList,
  setSelected,
  selected,
  fieldLabel,
  isNebourHood
}) {
  // Default selected value

  const defaultSelected = `Select ${fieldLabel}`;

  // Determine the current selection
  const currentSelected = selected || defaultSelected;

  return (
    <div className="w-full md:w-[calc(25%-16px)]">
      <label className="block text-base font-semibold leading-none text-left capitalize opacity-50 mb-2 px-2">{fieldLabel}</label>
      <Listbox value={currentSelected} onChange={setSelected}>
        <div className="relative mapouter w-full min-w-36 border-2 rounded-lg">
          <Listbox.Button className="inline-flex items-center w-full py-2.5 pl-3 pr-8 bg-transparent cursor-pointer city-filter">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="block truncate pl-2">{currentSelected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              style={{ zIndex: 1 }}
              className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <Listbox.Option
                value={""}
                className={'cursor-pointer relative py-2 pl-4 pr-10 text-left'}
              >
                {defaultSelected}
              </Listbox.Option>
              {optionList?.map((place, placeIdx) => (
                <Listbox.Option
                  key={placeIdx}
                  className={({ active }) =>
                    `${active ? 'text-green-900 bg-green-100' : 'text-gray-900'}
                          cursor-pointer select-none relative py-2 pl-4 pr-10 text-left`
                  }
                  value={place}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={` ${selected ? 'font-medium' : 'font-normal'
                          } block truncate`}
                      >
                        {isNebourHood ? place?.neighborhood_name : place?.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? 'text-green-600' : 'text-green-600'
                            }
                                absolute inset-y-0 right-0 flex items-center pr-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
