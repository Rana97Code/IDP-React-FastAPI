import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useContext, useEffect, useState, Fragment } from 'react';
import sortBy from 'lodash/sortBy';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconX from '../../../components/Icon/IconX';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconSend from '../../../components/Icon/IconSend';
import IconEdit from '../../../components/Icon/IconEdit';
import IconDownload from '../../../components/Icon/IconDownload';
import IconFileUpload from '../../../components/Icon/IconFileUpload';
//import { ImageListType } from 'react-images-uploading';
import axios from 'axios';
import UserContex from '../../../context/UserContex';



const index = () => {
    const user = useContext(UserContex);
    const headers = user.headers;

    useEffect(() => {
        if (user) {
            axios.get(`${user.base_url}/customer/all_customer`, { headers })
                .then((response) => {
                    setInitialRecords(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [user]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Upload Excel Table'));
    });


    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState([]);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'serial', direction: 'asc' });

    interface RecordWithIndex {
        [key: string]: any; // Define the type for each property in the record
        index: number; // Add index property
        date: string;
        passport_no: string;
        customer_name: string;
        description: string;
        description_code: string;
        amount: string;
        vat_value: string;
        status: string,
    }

    //For Index Number
    const recordsDataWithIndex: RecordWithIndex[] = recordsData.map((record: RecordWithIndex, index: number) => ({
        ...record,
        index: index + 1
    }));

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return initialRecords.filter((item: any) => {
                return (
                    item.serial.toString().includes(search.toLowerCase()) ||
                    item.date.toString().includes(search.toLowerCase()) ||
                    item.passport_no.toLowerCase().includes(search.toLowerCase()) ||
                    item.customer_name.toLowerCase().includes(search.toLowerCase()) ||
                    item.description.toLowerCase().includes(search.toLowerCase()) ||
                    item.description_code.toLowerCase().includes(search.toLowerCase()) ||
                    item.amount.toLowerCase().includes(search.toLowerCase()) ||
                    item.vat_value.toLowerCase().includes(search.toLowerCase()) ||
                    item.total_vat.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    // File Upload
    const [addFileModal, setAddFileModal] = useState<any>(false);

    const [defaultParams] = useState({
        file: '',
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setAddFileModal(true);
    };

    const [codeArr, setCodeArr] = useState<string[]>([]);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };


    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4 text-black">
                <h2 className="text-xl font-bold">Upload Excel Sales</h2>
                <div className="flex items-center flex-wrap gap-3">
                    <button type="button" className="btn btn-primary">
                        <IconDownload className="ltr:mr-2 rtl:ml-2" />
                        Download Sample File
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => editUser()}>
                        <IconFileUpload className="ltr:mr-2 rtl:ml-2" />
                        Excel File Upload
                    </button>
                </div>
            </div>
            <Transition appear show={addFileModal} as={Fragment}>
                <Dialog as="div" open={addFileModal} onClose={() => setAddFileModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddFileModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        Excel File
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg width-450px" >
                                                <svg className="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <div className="input_field flex flex-col w-max mx-auto text-center">
                                                    <label className="custom-file-container__custom-file">
                                                        <input id="file" className="text-sm cursor-pointer w-36 hidden" type="file" multiple />
                                                        <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                                                    </label>
                                                    <div className="title text-indigo-500 uppercase">or drop files here</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-success" onClick={() => setAddFileModal(false)}>
                                                    <IconSend className="ltr:mr-2 rtl:ml-2 " />
                                                    Upload
                                                </button>
                                                <button type="button" className="btn btn-outline-danger ltr:ml-4 rtl:mr-4" onClick={() => setAddFileModal(false)}>
                                                    <IconTrashLines className="ltr:mr-2 rtl:ml-2 " />
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div className="panel mt-6">
                <div className="flex items-center justify-between mb-6">
                    <h5 className="font-semibold text-lg dark:text-white-light">Excel Sales List</h5>
                    <input type="text" className="h-12 w-60 border border-slate-300 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search..."></input>
                </div>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsDataWithIndex}
                        columns={[
                            { accessor: 'index', title: 'Serial No', sortable: true },
                            { accessor: 'date', title: 'Date', sortable: true },
                            { accessor: 'passport_no', title: 'Passport No/NID', sortable: true },
                            { accessor: 'customer_name', title: 'Customer Name', sortable: true },
                            { accessor: 'description', title: 'Description', sortable: true },
                            { accessor: 'description_code', title: 'Description Code', sortable: true },
                            { accessor: 'amount', title: 'Amount', sortable: true },
                            { accessor: 'vat_value', title: 'VAT-able Value', sortable: true },
                            { accessor: 'total_vat', title: 'Total VAT', sortable: true },
                            {
                                accessor: 'action',
                                title: 'Action',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <NavLink to={"/pages/relationship/customers/edit/" + id} className="flex btn btn-outline-primary btn-sm m-1 p-2">
                                            <IconEdit className="w-4.5 h-4.5 mr-2" />
                                            Edit
                                        </NavLink>
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>

            </div>
        </div>
    );
};

export default index;
