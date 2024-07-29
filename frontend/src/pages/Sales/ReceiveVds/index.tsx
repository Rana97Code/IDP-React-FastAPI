import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useContext, useEffect, useState, Fragment } from 'react';
import sortBy from 'lodash/sortBy';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
// import IconX from '../../../components/Icon/IconX';
// import IconTrashLines from '../../../components/Icon/IconTrashLines';
// import IconSend from '../../../components/Icon/IconSend';
import IconEdit from '../../../components/Icon/IconEdit';
import IconPlus from '../../../components/Icon/IconPlus';
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
        dispatch(setPageTitle('Receive VDS Table'));
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
        customer_name: string;
        vds_no: string;
        invoice_date: string;
        vat_amount: string;
        vds_amount: string;
        receive_amount: string;
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
                    item.customer_name.toLowerCase().includes(search.toLowerCase()) ||
                    item.vds_no.toLowerCase().includes(search.toLowerCase()) ||
                    item.issue_date.toLowerCase().includes(search.toLowerCase()) ||
                    item.vat_amount.toLowerCase().includes(search.toLowerCase()) ||
                    item.vds_amount.toLowerCase().includes(search.toLowerCase()) ||
                    item.receive_amount.toLowerCase().includes(search.toLowerCase()) ||
                    item.action.toLowerCase().includes(search.toLowerCase())
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
    // const [addFileModal, setAddFileModal] = useState<any>(false);

    // const [defaultParams] = useState({
    //     file: '',
    // });

    // const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    // const editUser = (user: any = null) => {
    //     const json = JSON.parse(JSON.stringify(defaultParams));
    //     setParams(json);
    //     if (user) {
    //         let json1 = JSON.parse(JSON.stringify(user));
    //         setParams(json1);
    //     }
    //     setAddFileModal(true);
    // };

    // const [codeArr, setCodeArr] = useState<string[]>([]);

    // const toggleCode = (name: string) => {
    //     if (codeArr.includes(name)) {
    //         setCodeArr((value) => value.filter((d) => d !== name));
    //     } else {
    //         setCodeArr([...codeArr, name]);
    //     }
    // };


    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4 text-black">
                <h2 className="text-xl font-bold">Receive VDS</h2>
                <div className="flex items-center flex-wrap gap-3">
                    <Link to="/pages/sales/receive_vds/add" className="btn btn-primary gap-2">
                        <IconPlus />
                        Add New
                    </Link>
                </div>
            </div>

            <div className="panel mt-6">
                <div className="flex items-center justify-between mb-6">
                    <h5 className="font-semibold text-lg dark:text-white-light">Receive VDS List</h5>
                    <input type="text" className="h-12 w-60 border border-slate-300 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search..."></input>
                </div>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsDataWithIndex}
                        columns={[
                            { accessor: 'index', title: 'Serial', sortable: true },
                            { accessor: 'customer_name', title: 'Customer Name', sortable: true },
                            { accessor: 'vds_no', title: 'VDS No', sortable: true },
                            { accessor: 'issue_date', title: 'Issue Date', sortable: true },
                            { accessor: 'vat_amount', title: 'VAT Amount', sortable: true },
                            { accessor: 'vds_amount', title: 'VDS Amount', sortable: true },
                            { accessor: 'receive_amount', title: 'Receive Amount', sortable: true },
                            { accessor: 'id', title: 'Action', 
                                sortable: true,
                                render: ({ id }) => (
                                    <div >
                                        <NavLink to={"/pages/sales/foreign_sales/mushak/"+ id} className="text-cyan-500" target="_blank">
                                            Mushak-6.3
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
