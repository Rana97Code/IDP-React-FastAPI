import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../../store/themeConfigSlice';
// import IconEdit from '../../../components/Icon/IconEdit';
import axios from 'axios';


const rowData = [
    {
        description: '',
        quantity: '',
        rate: '',
        value: '',
        sd: '',
        sdBDT: '',
        vatableValue: '',
        vatType: '',
        vat: '',
        vatBDT: '',
        vds: '',
        rebate: '',
        action: '',
    },
];

const col = ['description', 'quantity', 'rate', 'value', 'sd', 'sdBDT', 'vatableValue', 'vatType', 'vat', 'vatBDT', 'vds', 'rebate', '', ''];


const tableLocalPurchase = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Export Table'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'serial'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'serial', direction: 'asc' });

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
            return rowData.filter((item: any) => {
                return (
                    item.description.toString().includes(search.toLowerCase()) ||
                    item.quantity.toLowerCase().includes(search.toLowerCase()) ||
                    item.rate.toLowerCase().includes(search.toLowerCase()) ||
                    item.value.toLowerCase().includes(search.toLowerCase()) ||
                    item.sd.toLowerCase().includes(search.toLowerCase()) ||
                    item.sdBDT.toLowerCase().includes(search.toLowerCase()) ||
                    item.vatableValue.toLowerCase().includes(search.toLowerCase()) ||
                    item.vatType.toLowerCase().includes(search.toLowerCase()) ||
                    item.vat.toLowerCase().includes(search.toLowerCase()) ||
                    item.vatBDT.toLowerCase().includes(search.toLowerCase()) ||
                    item.vds.toLowerCase().includes(search.toLowerCase()) ||
                    item.vatBDT.toLowerCase().includes(search.toLowerCase()) ||
                    item.vds.toLowerCase().includes(search.toLowerCase()) ||
                    item.rebate.toLowerCase().includes(search.toLowerCase()) ||
                    item.totalAmount.toLowerCase().includes(search.toLowerCase()) ||
                    // item.status.tooltip.toLowerCase().includes(search.toLowerCase())
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
    const header = ['Description', 'Quantity', 'Rate', 'Value', 'Sd%', 'SD(BDT)', 'Vatable Value(BDT)', 'VAT Type', 'VAT(%)', 'VAT(BDT)', 'VDS', ''];
    

    return (
        <div>
            <div className="mt-6 mb-6">
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'description', title: 'Description', sortable: true },
                            { accessor: 'quantity', title: 'Quantity', sortable: true },
                            { accessor: 'rate', title: 'Rate(BDT)', sortable: true },
                            { accessor: 'value', title: 'Value', sortable: true },
                            { accessor: 'sd', title: 'SD%', sortable: true },
                            { accessor: 'sdBDT', title: 'SD(BDT)', sortable: true },
                            { accessor: 'vatableValue', title: 'Vatable Value(BDT)', sortable: true },
                            { accessor: 'vatType', title: 'VAT Type', sortable: true },
                            { accessor: 'vat', title: 'VAT(%)', sortable: true },
                            { accessor: 'vatBDT', title: 'VAT(BDT)', sortable: true },
                            { accessor: 'vds', title: 'VDS', sortable: true },
                            { accessor: 'rebate', title: 'Rebate', sortable: true },
                            { accessor: 'totalAmount', title: 'Total Amount', sortable: true },
                            // {
                            //     accessor: 'status',
                            //     title: 'Status',
                            //     sortable: true,
                            //     render: ({ status }) => <span className={`p-2 badge badge-outline-${status.color} `}>{status.tooltip}</span>,
                            // },
                            {
                                accessor: 'action',
                                title: 'Action',
                                sortable: false,
                                textAlignment: 'center',
                                // render: ({ }) => (
                                //     <div className="flex gap-4 items-center w-max mx-auto">
                                //         <NavLink to="/pages/relationship/customers/edit" className="flex btn btn-outline-primary btn-sm m-1 p-2">
                                //                 <IconEdit className="w-4.5 h-4.5 mr-2" />
                                //                 Edit
                                //             </NavLink>

                                //     </div>
                                // ),
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="flex-col pt-6 pb-6">
                <div className="sm:w-2/5">
                    <div className="flex items-center justify-between text-lg font-bold">
                        <div>Total Vat (BDT)</div>
                    </div>
                    <div className="flex items-center justify-between mt-4 font-semibold text-base">
                        <div>Grand Total (BDT)</div>
                        <div>$0.00</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default tableLocalPurchase;