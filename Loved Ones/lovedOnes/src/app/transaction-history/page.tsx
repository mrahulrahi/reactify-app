import Link from 'next/link'
import Banner from '../components/Banner/Banner'
import { FaRegCircleDown } from 'react-icons/fa6'
import Pagination from '../components/Pagination/Pagination'

const TransactionHistoryPage = () => {
    return (
        <>
            <Banner />

            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="transaction-history-table table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Invoice ID</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-grey">Video of my Son</td>
                                            <td className="fw-semibold">123456</td>
                                            <td className="text-grey">17 Sep 2023 10:34 AM</td>
                                            <td className="fw-semibold">$49.99</td>
                                            <td ><Link href="#!" className="btn-download d-flex align-items-center" download> <span className="download-icon"><FaRegCircleDown /></span> Download</Link></td>
                                        </tr>
                                        <tr>
                                            <td className="text-grey">A Beautiful Video Tribute of My...</td>
                                            <td className="fw-semibold">123456</td>
                                            <td className="text-grey">17 Sep 2023 10:34 AM</td>
                                            <td className="fw-semibold">$49.99</td>
                                            <td ><Link href="#!" className="btn-download d-flex align-items-center" download> <span className="download-icon"><FaRegCircleDown /></span> Download</Link></td>
                                        </tr>
                                        <tr>
                                            <td className="text-grey">Video of my Son</td>
                                            <td className="fw-semibold">123456</td>
                                            <td className="text-grey">17 Sep 2023 10:34 AM</td>
                                            <td className="fw-semibold">$49.99</td>
                                            <td ><Link href="#!" className="btn-download d-flex align-items-center" download> <span className="download-icon"><FaRegCircleDown /></span> Download</Link></td>
                                        </tr>
                                        <tr>
                                            <td className="text-grey">A Beautiful Video Tribute of My...</td>
                                            <td className="fw-semibold">123456</td>
                                            <td className="text-grey">17 Sep 2023 10:34 AM</td>
                                            <td className="fw-semibold">$49.99</td>
                                            <td ><Link href="#!" className="btn-download d-flex align-items-center" download> <span className="download-icon"><FaRegCircleDown /></span> Download</Link></td>
                                        </tr>
                                        <tr>
                                            <td className="text-grey">Video of my Son</td>
                                            <td className="fw-semibold">123456</td>
                                            <td className="text-grey">17 Sep 2023 10:34 AM</td>
                                            <td className="fw-semibold">$49.99</td>
                                            <td ><Link href="#!" className="btn-download d-flex align-items-center" download> <span className="download-icon"><FaRegCircleDown /></span> Download</Link></td>
                                        </tr>
                                        <tr>
                                            <td className="text-grey">Video of my Son</td>
                                            <td className="fw-semibold">123456</td>
                                            <td className="text-grey">17 Sep 2023 10:34 AM</td>
                                            <td className="fw-semibold">$49.99</td>
                                            <td ><Link href="#!" className="btn-download d-flex align-items-center" download> <span className="download-icon"><FaRegCircleDown /></span> Download</Link></td>
                                        </tr>
                                        <tr>
                                            <td className="text-grey">A Beautiful Video Tribute of My...</td>
                                            <td className="fw-semibold">123456</td>
                                            <td className="text-grey">17 Sep 2023 10:34 AM</td>
                                            <td className="fw-semibold">$49.99</td>
                                            <td ><Link href="#!" className="btn-download d-flex align-items-center" download> <span className="download-icon"><FaRegCircleDown /></span> Download</Link></td>
                                        </tr>
                                        <tr>
                                            <td className="text-grey">Video of my Son</td>
                                            <td className="fw-semibold">123456</td>
                                            <td className="text-grey">17 Sep 2023 10:34 AM</td>
                                            <td className="fw-semibold">$49.99</td>
                                            <td ><Link href="#!" className="btn-download d-flex align-items-center" download> <span className="download-icon"><FaRegCircleDown /></span> Download</Link></td>
                                        </tr>
                                        <tr>
                                            <td className="text-grey">A Beautiful Video Tribute of My...</td>
                                            <td className="fw-semibold">123456</td>
                                            <td className="text-grey">17 Sep 2023 10:34 AM</td>
                                            <td className="fw-semibold">$49.99</td>
                                            <td ><Link href="#!" className="btn-download d-flex align-items-center" download> <span className="download-icon"><FaRegCircleDown /></span> Download</Link></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionHistoryPage