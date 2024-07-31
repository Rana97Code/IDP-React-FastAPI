import React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import IconFile from '../../../../../components/Icon/IconFile';
import logo from '/assets/images/Govt/govt.png';
import axios from 'axios';
import { number } from 'yup';


const mushak68: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();

    // Function to get today's date in the format "YYYY-MM-DD"
    // const getTodayDate = () => {
    //     const today = new Date();
    //     const year = today.getFullYear();
    //     const month = String(today.getMonth() + 1).padStart(2, '0');
    //     const day = String(today.getDate()).padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    // };

    const handlePrintButtonClick = () => {
        window.print();
    };

    interface openingDetails {
        itemId: number;
        itemType: number;
        openingQuantity: number;
        openingRate: number;
        openingValue: number;
        openingDate: string;
        closingDate: string;
    }

    interface purchaseDetails {
        id: number;
        itemName: string;
        hsCode: string;
        description: string;
        supplierName: string;
        supplierAddress: string;
        supplierTin: string;
        pinvoiceNo: string;
        vendorInvoice: string;
        qty: number;
        rate: number;
        amount: number;
        sdAmount: number;
        cdAmount: number;
        rdAmount: number;
        vatableValue: number;
        vatRate: number;
        taxAmount: number;
        tAmount: number;
        chalanDate: string;
        entryDate: string;
    }

    interface productionDetails {
        id: number;
        proInvoiceId: number;
        usedQty: number;
        rate: number;
        productionDate: string;
    }
    interface debitNoteDetails {
        id: number;
        debitNoteNo: string;
        purchaseAmount: number;
        vatAmount: number;
        sdAmount: number;
        returnQty: number;
        returnAmount: number;
        returnVat: number;
        returnSd: number;
        dnIssueDate: string;
    }

    const [openingDetails, setOpeningDetails] = useState<openingDetails[]>([]);
    const [purchaseItemDetails, setPurchaseDetails] = useState<purchaseDetails[]>([]);
    const [productionDetails, setProductionDetails] = useState<productionDetails[]>([]);
    const [debitNoteDetail, setDebitNoteDetails] = useState<debitNoteDetails[]>([]);

    const [openingDate, setOpeningDate] = useState("");
    const [openingQuantity, setOpeningQty] = useState("");
    const [openingRate, setOpeningRate] = useState("");
    const [openingValue, setOpeningValue] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [companyTin, setCompanyTin] = useState("");
    const [itemDetails, setItemName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            const bearer = token.slice(1, -1);

            const headers = { Authorization: `Bearer ${bearer}` }

            axios.get(`http://localhost:8080/bmitvat/api/mushak61/getItemsDetail/${params.data}`, { headers })
                .then((response) => {
                    setCompanyName(response.data.companyReportModels.companyName);
                    setCompanyAddress(response.data.companyReportModels.street);
                    setCompanyTin(response.data.companyReportModels.comTin);

                    setOpeningDetails(response.data.openingAddModel);
                    setOpeningDate(response.data.openingAddModel.openingDate);
                    setOpeningQty(response.data.openingAddModel.openingQuantity);
                    setOpeningRate(response.data.openingAddModel.openingRate);
                    setOpeningValue(response.data.openingAddModel.openingValue);

                    setPurchaseDetails(response.data.purchaseItem61Models);
                    setProductionDetails(response.data.productionItem61Models);
                    setDebitNoteDetails(response.data.debitNoteItem61Models);

                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, []);

    const itemName = purchaseItemDetails.reduce((acc, item) => { return item.itemName; }, '');
    const pInvoiceNo = purchaseItemDetails.reduce((acc, item) => { return item.pinvoiceNo; }, '');

    let preQty = openingQuantity;
    let prePrice = openingValue;

    let totalUsedQty = openingQuantity;
    let totalPrice = openingValue;


    return (
        <div>
            <div className="items-center justify-between flex-wrap text-black m-6 grid grid-cols-3 gap-2">
                <div>
                    <img className="h-20 w-20" src={logo} />
                </div>
                <div className="font-bold  grid grid-rows-2 grid-flow-col gap-4 pt-2">
                    <h3 className='text-xl' style={{ textAlign: 'center' }} >গনপ্রজাতন্ত্রী বাংলাদেশ সরকার</h3>
                    <h3 style={{ textAlign: 'center' }} >জাতীয় রাজস্ব বোর্ড</h3>
                </div>
                <div>
                    <button type="submit" className="bg-white text-gray-800 font-semibold py-1 px-1 border border-gray-400 float-right" >
                        মূসক- ৬.৮
                    </button>
                </div>
            </div>

            <div className="m-2">
                <div className="mb-5">
                    <div className="" id="browser_default">
                        <div className="flex flex-col items-center justify-between mb-5">
                            <div className="font-bold grid grid-rows-2 grid-flow-col">
                                <h3 className='pb-2'>কর চালানপত্র</h3>
                                <h3>ডেবিট নোট</h3>
                            </div>
                            <div className="pb-1">
                                <div className='flex flex-col text-right gap-1'>
                                    <div className='flex sm:flex-row flex-row'>
                                        <label className="mr-3 text-sm font-medium"> ডেবিট নোট নম্বর: </label>
                                        <p className="text-sm font-medium"> </p>
                                    </div>
                                    <div className='flex sm:flex-row flex-row'>
                                        <label className="mr-3 text-sm font-medium"> ইস্যুর তারিখ: </label>
                                        <p className="text-sm font-medium"> </p>
                                    </div>
                                    <div className='flex sm:flex-row flex-row'>
                                        <label className="mr-3 text-sm font-medium"> ইস্যুর সময়: </label>
                                        <p className="text-sm font-medium"> </p>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-sm font-medium dark:text-white-light">[ বিধি ৪০ এর উপ-বিধি (১) এর দফা (ছ) দ্রষ্টব্য ]</h4>
                        </div>
                        <div className="pb-2 grid grid-cols-2">
                            <div className='flex flex-col text-right gap-3'>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm  font-medium"> নিবন্ধিত ব্যক্তির নাম: </label>
                                    <p className="text-sm font-medium"> </p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm  font-medium"> নিবন্ধিত ব্যক্তির বিআইএন: </label>
                                    <p className="text-sm font-medium"> </p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm  font-medium"> নিবন্ধিত ব্যক্তির ঠিকানা: </label>
                                    <p className="text-sm font-medium"> </p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm  font-medium"> ক্রেতা/গ্রহীতার নাম: </label>
                                    <p className="text-sm font-medium"> </p>
                                </div>
                            </div>
                            <div className='flex flex-col text-right gap-3'>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm font-medium "> ক্রেতা/গ্রহীতার বিআইএন: </label>
                                    <p className="text-sm font-medium"> </p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm font-medium"> ঠিকানা: </label>
                                    <p className="text-sm font-medium"> </p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm font-medium"> মূল্য চালান ইস্যুর তারিখ: </label>
                                    <p className="text-sm font-medium"> </p>
                                </div>
                                <div className='flex sm:flex-row flex-row'>
                                    <label className="mr-3 text-sm font-medium"> যানবাহনের প্রকৃতি ও নম্বর: </label>
                                    <p className="text-sm font-medium"> </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="border-collapse border overflow-hidden overflow-x-auto">
                                <table className="table-auto min-w-full border-collapse border border-black">
                                    <thead>
                                        <tr>
                                            <th className="border border-black p-2 font-semibold" rowSpan={2} style={{ textAlign: 'center' }} >ক্রমিক সংখ্যা</th>
                                            <th className="border border-black font-semibold" rowSpan={2} style={{ textAlign: 'center' }} >কর চালানপত্রের নম্বর ও তারিখ</th>
                                            <th className="border border-black font-semibold" rowSpan={2} style={{ textAlign: 'center' }} >ডেবিট নোট ইস্যুর কারণ</th>
                                            <th className="border border-black font-semibold" colSpan={4} style={{ textAlign: 'center' }} >চালানপত্রের উল্লেখিত সরবরাহের</th>
                                            <th className="border border-black font-semibold" colSpan={4} style={{ textAlign: 'center' }} >বৃদ্ধিকারী সমন্বয়ের সহিত সংশ্লিষ্ট</th>
                                        </tr>

                                        <tr>
                                            <th className="border border-black p-2 font-semibold" rowSpan={2} style={{ textAlign: 'center' }} >মূল্য</th>
                                            <th className="border border-black p-2 font-semibold" rowSpan={2} style={{ textAlign: 'center' }} >পরিমাণ</th>
                                            <th className="border border-black p-2 font-semibold" rowSpan={2} style={{ textAlign: 'center' }} >মূল্য সংযোজন করের পরিমাণ</th>
                                            <th className="border border-black p-2 font-semibold" rowSpan={2} style={{ textAlign: 'center' }} >সম্পূরক শুল্কের পরিমাণ</th>
                                            <th className="border border-black p-2 font-semibold" rowSpan={2} style={{ textAlign: 'center' }} >মূল্য</th>
                                            <th className="border border-black p-2 font-semibold" rowSpan={2} style={{ textAlign: 'center' }} >পরিমাণ</th>
                                            <th className="border border-black p-2 font-semibold" rowSpan={2} style={{ textAlign: 'center' }} >মূল্য সংযোজন করের পরিমাণ</th>
                                            <th className="border border-black p-2 font-semibold" rowSpan={2} style={{ textAlign: 'center' }} >সম্পূরক শুল্কের পরিমাণ</th>
                                        </tr>

                                        <tr>
                                        </tr>

                                        <tr>
                                            <th className="border border-black" style={{ textAlign: 'center' }} >(১)</th>
                                            <th className="border border-black" style={{ textAlign: 'center' }} >(২)</th>
                                            <th className="border border-black" style={{ textAlign: 'center' }} >(৩)</th>
                                            <th className="border border-black" style={{ textAlign: 'center' }} >(৪)</th>
                                            <th className="border border-black" style={{ textAlign: 'center' }} >(৫)</th>
                                            <th className="border border-black" style={{ textAlign: 'center' }} >(৬)</th>
                                            <th className="border border-black" style={{ textAlign: 'center' }} >(৭)</th>
                                            <th className="border border-black" style={{ textAlign: 'center' }} >(৮)</th>
                                            <th className="border border-black" style={{ textAlign: 'center' }} >(৯)</th>
                                            <th className="border border-black" style={{ textAlign: 'center' }} >(১০)</th>
                                            <th className="border border-black" style={{ textAlign: 'center' }} >(১১)</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {/* {openingDetails.map((item, index) => {
                                            totalUsedQty += item.openingQuantity;
                                            totalPrice += item.openingValue;
                                        return ( */}
                                        <tr className="hover:bg-gray-50 text-center border border-black h-10">
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black overflow-hidden">{openingDate}</td>
                                            <td className="p-0 border border-black">{preQty}</td>
                                            <td className="p-0 border border-black">{prePrice}</td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                        </tr>
                                        {/* );
                                    })}  */}

                                        {purchaseItemDetails.map((item, index) => {
                                            preQty = totalUsedQty;
                                            prePrice = totalPrice;
                                            totalUsedQty += item.qty;
                                            totalPrice += item.qty * item.rate;
                                            return (
                                                <tr className="hover:bg-gray-50 text-center border border-black h-10">
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black overflow-hidden" >{item.chalanDate}</td>
                                                    <td className="p-0 border border-black">{preQty}</td>
                                                    <td className="p-0 border border-black">{prePrice}</td>
                                                    <td className="p-0 border border-black overflow-hidden">{item.pinvoiceNo}</td>
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black">{item.supplierName}</td>
                                                    <td className="p-0 border border-black">{item.supplierAddress}</td>
                                                    <td className="p-0 border border-black">{item.supplierTin}</td>
                                                    <td className="p-0 border border-black">{item.itemName}</td>
                                                    <td className="p-0 border border-black">{item.qty}</td>
                                                </tr>
                                            );
                                        })}

                                        {debitNoteDetail.map((item, index) => {
                                            preQty = totalUsedQty;
                                            prePrice = totalPrice;
                                            totalUsedQty += item.returnQty;
                                            totalPrice += item.returnAmount;

                                            return (
                                                <tr className="hover:bg-gray-50 text-center border border-black h-10">
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black overflow-hidden" >{item.dnIssueDate}</td>
                                                    <td className="p-0 border border-black">{preQty}</td>
                                                    <td className="p-0 border border-black">{prePrice}</td>
                                                    <td className="p-0 border border-black overflow-hidden">{item.debitNoteNo}</td>
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black">{item.returnQty}</td>
                                                </tr>
                                            );
                                        })}

                                        {productionDetails.map((item, index) => {
                                            preQty = totalUsedQty;
                                            prePrice = totalPrice;
                                            totalUsedQty += -item.usedQty;
                                            totalPrice += -(item.rate * item.usedQty);
                                            return (
                                                <tr className="hover:bg-gray-50 text-center border border-black h-10">
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black overflow-hidden">{item.productionDate}</td>
                                                    <td className="p-0 border border-black">{preQty}</td>
                                                    <td className="p-0 border border-black">{prePrice}</td>
                                                    <td className="p-0 border border-black overflow-hidden">{item.proInvoiceId}</td>
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black"></td>
                                                    <td className="p-0 border border-black"></td>
                                                </tr>
                                            )
                                        })}

                                        <tr className="hover:bg-gray-50 text-center border border-black h-10">
                                            <td className="p-0 border border-black">Total</td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                            <td className="p-0 border border-black"></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <div className="pb-2">
                                <div className='flex flex-col text-right gap-3'>
                                    <div className='flex sm:flex-row flex-row'>
                                        <label className="mr-3 text-sm  font-semibold"> দায়িত্বপ্রাপ্ত বাক্তির নাম: </label>
                                        <p className="text-sm font-medium"> </p>
                                    </div>
                                    <div className='flex sm:flex-row flex-row'>
                                        <label className="mr-3 text-sm  font-semibold"> পদবি: </label>
                                        <p className="text-sm font-medium"> </p>
                                    </div>
                                    <div className='flex sm:flex-row flex-row'>
                                        <label className="mr-3 text-sm font-semibold"> স্বাক্ষর: </label>
                                        <p className="text-sm font-medium"> </p>
                                    </div>
                                    <div className='flex sm:flex-row flex-row'>
                                        <label className="mr-3 text-sm font-semibold"> সিল: </label>
                                        <p className="text-sm font-medium"> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default mushak68;


