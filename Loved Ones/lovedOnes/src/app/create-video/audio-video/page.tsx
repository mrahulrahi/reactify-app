'use client'
import Image from 'next/image'
import Link from 'next/link'
import StepNav from '../../components/StepNav/StepNav'
import Alert from '../../components/Alert/Alert'
import SelectField from '../../components/SelectField/SelectField'
import UploadBox from '../../components/UploadBox/UploadBox'

const countryIcon = (iconUrl: string) => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
        backgroundImage: `url("${iconUrl}")`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        content: '" "',
        display: 'flex',
        flexShrink: 0,
        marginRight: 8,
        height: 20,
        width: 20,
    },
});

const accentOptions = [
    { value: 'All', label: 'No-accent', flag: '/images/accent-icon.svg' },
    { value: 'american', label: 'American', flag: '/images/country-icon-1.svg' },
    { value: 'australian', label: 'Australian', flag: '/images/country-icon-2.svg' },
    { value: 'british', label: 'British', flag: '/images/country-icon-3.svg' },
    { value: 'swedish', label: 'Swedish', flag: '/images/country-icon-1.svg' },
    { value: 'transatlantic', label: 'Transatlantic', flag: '/images/country-icon-2.svg' },
    { value: 'african', label: 'African', flag: '/images/country-icon-3.svg' },
    { value: 'asian', label: 'Asian', flag: '/images/country-icon-1.svg' },
    { value: 'indian', label: 'Indian', flag: '/images/country-icon-2.svg' },
];

const genderOptions = [
    { value: 'All', label: 'All', flag: '/images/gender-icon.svg' },
    { value: 'male', label: 'Male', flag: '/images/male-icon.svg' },
    { value: 'female', label: 'Female', flag: '/images/female-icon.svg' },
];

const ageOptions = [
    { value: 'All', label: 'All', },
    { value: 'young', label: 'Young', },
    { value: 'old', label: 'Old', },
    { value: 'middle-aged', label: 'Middle aged', },
];

const AudioVideoPage = () => {
    return (
        <>
            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-lg-12">
                            <StepNav />
                            <div className="create-video-body">
                                <div className="create-video-head text-black">
                                    <h4>Upload an Audio or Video file of your LovedOne’s voice to have the text spoken in the LovedOne’s Voice.</h4>
                                    <p>(No worries if you don’t have an audio or video file. We have plenty of voices to choose from below!)</p>
                                </div>
                                <div className="create-video-content">
                                    <h6>The files must be:</h6>
                                    <ul className="custom-num-list mb-5">
                                        <li>Clear without static or background noise.</li>
                                        <li>Not less than five seconds or more than two minutes long.</li>
                                        <li>Only your Loved One should be speaking, this will ensure a more accurate voice clone of your Loved One.</li>
                                    </ul>
                                    <form>
                                        <div className="form-group">
                                            <UploadBox label="Upload Audio or Video File" />
                                        </div>
                                        <div className="form-bottom-btn d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 gap-sm-4">
                                            <Link href="/preview" className="btn btn-primary w-100">Submit</Link>
                                            <span className="fw-bold text-black text-uppercase">or</span>
                                            <Link className="btn btn-blue-light w-100" href="#voiceModal" data-bs-toggle="modal">Choose a Voice</Link>
                                        </div>
                                    </form>
                                    <div className="create-video-footer text-center">
                                        <h6>No worries if you don’t have an audio or video file, we have plenty of voices to choose from.</h6>
                                        <p>* Voices Powered by ElevenLabs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade voice-modal" id="voiceModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content voice-wrapper w-100 mx-auto d-flex flex-column">
                        <div className="voice-header d-flex align-items-center justify-content-between">
                            <h5>Choose a Voice</h5>
                            <Link href="#voiceModal" className="voice-header-close d-flex align-item-center justify-content-center has-img-contain" data-bs-dismiss="modal">
                                <Image src="../../images/close-icon.svg" alt="" width={30} height={30} quality={100} />
                            </Link>
                        </div>
                        <div className="voice-body d-flex flex-column">
                            <div className="voice-filter-row d-flex flex-wrap justify-content-between gap-4">
                                <div className="voice-filter-item">
                                    <SelectField options={accentOptions} className="custom-select" classNamePrefix="custom-select" placeholder="Choose an Accent" styles={{
                                        option: (styles: any, { data }: any) => ({ ...styles, ...countryIcon(data.flag) }),
                                        placeholder: (styles: any) => ({ ...styles, ...countryIcon('/images/accent-icon.svg') }),
                                        singleValue: (styles: any, { data }: any) => ({ ...styles, ...countryIcon(data.flag) }),
                                    }} />
                                </div>

                                <div className="voice-filter-item">
                                    <SelectField options={genderOptions} className="custom-select" classNamePrefix="custom-select" placeholder="Choose a Gender" styles={{
                                        option: (styles: any, { data }: any) => ({ ...styles, ...countryIcon(data.flag) }),
                                        placeholder: (styles: any) => ({ ...styles, ...countryIcon('/images/gender-icon.svg') }),
                                        singleValue: (styles: any, { data }: any) => ({ ...styles, ...countryIcon(data.flag) }),
                                    }} />
                                </div>

                                <div className="voice-filter-item">
                                    <SelectField options={ageOptions} className="custom-select" classNamePrefix="custom-select" placeholder="Choose an Age" styles={{
                                        input: (styles: any) => ({ ...styles, ...countryIcon('/images/age-icon.svg') }),
                                        placeholder: (styles: any) => ({ ...styles, ...countryIcon('/images/age-icon.svg') }),
                                        singleValue: (styles: any, { data }: any) => ({ ...styles, ...countryIcon(data.flag) }),
                                    }} />
                                </div>
                            </div>

                            <p className="mb-0">* Voices Powered by ElevenLabs</p>

                            <div className="people-voice-list d-flex flex-column gap-4">
                                <div className="people-voice-item">
                                    <a href="#!" className="people-voice-box d-flex align-items-center justify-content-between gap-3">
                                        <div className="people-voice-left d-flex flex-column justify-content-center">
                                            <h6>Robert <Image src="../../images/male-icon.svg" className="ms-1" alt="" width={8} height={16} quality={100} /></h6>
                                            <ul className="pvl-list d-flex">
                                                <li className="pvl-item">Male</li>
                                                <li className="pvl-item">Young</li>
                                                <li className="pvl-item">American</li>
                                            </ul>
                                        </div>
                                        <div className="people-voice-right">
                                            <button className="pvr-play-btn d-flex align-items-center justify-content-center has-img-contain">
                                                <Image src="../../images/play-icon-blue.svg" alt="" width={26} height={26} quality={100} />
                                            </button>
                                        </div>
                                    </a>
                                </div>

                                <div className="people-voice-item">
                                    <a href="#!" className="people-voice-box d-flex align-items-center justify-content-between gap-3">
                                        <div className="people-voice-left d-flex flex-column justify-content-center">
                                            <h6>Lily <Image src="../../images/female-icon.svg" className="ms-1" alt="" width={9} height={17} quality={100} /></h6>
                                            <ul className="pvl-list d-flex">
                                                <li className="pvl-item">Male</li>
                                                <li className="pvl-item">Young</li>
                                                <li className="pvl-item">American</li>
                                            </ul>
                                        </div>
                                        <div className="people-voice-right">
                                            <button className="pvr-play-btn d-flex align-items-center justify-content-center has-img-contain">
                                                <Image src="../../images/play-icon-blue.svg" alt="" width={26} height={26} quality={100} />
                                            </button>
                                        </div>
                                    </a>
                                </div>
                                {Array.from({ length: 7 }).map((_, index) => (
                                    <div className="people-voice-item" key={index}>
                                        <a href="#!" className="people-voice-box d-flex align-items-center justify-content-between gap-3">
                                            <div className="people-voice-left d-flex flex-column justify-content-center">
                                                <h6>Robert <Image src="../../images/male-icon.svg" className="ms-1" alt="" width={8} height={16} quality={100} /></h6>
                                                <ul className="pvl-list d-flex">
                                                    <li className="pvl-item">Male</li>
                                                    <li className="pvl-item">Young</li>
                                                    <li className="pvl-item">American</li>
                                                </ul>
                                            </div>
                                            <div className="people-voice-right">
                                                <button className="pvr-play-btn d-flex align-items-center justify-content-center has-img-contain">
                                                    <Image src="../../images/play-icon-blue.svg" alt="" width={26} height={26} quality={100} />
                                                </button>
                                            </div>
                                        </a>
                                    </div>
                                ))}

                                <div className="people-voice-item">
                                    <a href="#!" className="people-voice-box d-flex align-items-center justify-content-between gap-3">
                                        <div className="people-voice-left d-flex flex-column justify-content-center">
                                            <h6>Lily <Image src="../../images/female-icon.svg" className="ms-1" alt="" width={9} height={17} quality={100} /></h6>
                                            <ul className="pvl-list d-flex">
                                                <li className="pvl-item">Male</li>
                                                <li className="pvl-item">Young</li>
                                                <li className="pvl-item">American</li>
                                            </ul>
                                        </div>
                                        <div className="people-voice-right">
                                            <button className="pvr-play-btn d-flex align-items-center justify-content-center has-img-contain">
                                                <Image src="../../images/play-icon-blue.svg" alt="" width={26} height={26} quality={100} />
                                            </button>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="voice-footer">
                            <button className="btn btn-blue btn-block" data-bs-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
            </div>  

            <div className="alert-wrapper">
                <Alert type="success" message="Data Uploaded successfully, video being generated" />
            </div>
        </>
    )
}

export default AudioVideoPage