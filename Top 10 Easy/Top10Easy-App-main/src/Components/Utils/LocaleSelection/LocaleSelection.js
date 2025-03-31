import { Listbox, Transition } from '@headlessui/react'
import { useState, useEffect, Fragment } from 'react';
import locales from '../../../locales/locales'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil';
import { localeState } from '../../../context/appState';
import { useDispatch } from 'react-redux';
import { changeLanguage } from '../../../store/slices/payment';

export default function LocaleSelection() {
  const [availableLocales, setAvailableLocales] = useState([]);
  const [selectedLocale, setSelectedLocale] = useState([]);
  const [locString, setLocString] = useRecoilState(localeState);

  const dispatch = useDispatch();

  useEffect(() => {
    const allLocales = Object.keys(locales).map((loc, idx) => {
      return {
        name: loc,
        id: idx,
        unavailable: false

      }
    })
    setAvailableLocales(allLocales)
  }, [])

  useEffect(() => {
    setSelectedLocale(availableLocales.find(loc => loc?.name === locString ?? 'en'))
  }, [availableLocales])

  useEffect(() => {
    const currentLocale = selectedLocale?.name ?? 'en'
    setLocString(currentLocale)
  }, [selectedLocale])

  return (
    <>
      <Listbox value={selectedLocale} onChange={(e) => {
        setSelectedLocale(e);
        dispatch(changeLanguage(e));
      }}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selectedLocale?.name}</span>
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
            <Listbox.Options className="z-10 absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {availableLocales.map((locale, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                              cursor-default select-none relative py-2 pl-4 pr-4`
                  }
                  value={locale}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${selected ? 'font-medium' : 'font-normal'
                          } block truncate`}
                      >
                        {locale.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? 'text-amber-600' : 'text-amber-600'
                            }
                                    absolute inset-y-0 left-0 flex items-center pl-4`}
                        >
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
    </>
  )
}