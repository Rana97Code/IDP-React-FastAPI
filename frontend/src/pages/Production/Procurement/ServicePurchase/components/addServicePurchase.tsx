import React from 'react';
import { useState } from 'react';
import IconFile from '../../../../../components/Icon/IconFile';
import IconTrashLines from '../../../../../components/Icon/IconTrashLines';
import TableServicePurchase from './tableServicePurchase';


const addServicePurchase = () => {

    const [date, setDate] = useState();

    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4 text-black">
                <h2 className="text-xl font-bold">Production Service Purchase</h2>
            </div>
            <div className="pt-5 gap-2">
                <div className="mb-5">
                    <form className="space-y-5 pt-4">
                        <div className="panel" id="browser_default">
                            <div className="flex items-center justify-between mb-7">
                                <h5 className="font-semibold text-lg dark:text-white-light">Add New Service Purchase</h5>
                            </div>
                            <div className="mb-5">
                                <form className="space-y-5" >
                                    <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                                        <div>
                                            <label htmlFor="gridState">Supplier</label>
                                            <select id="gridState" className="form-select text-dark col-span-4 text-sm" required >
                                                <option>Select Supplier</option>
                                                <option>A</option>
                                                <option>B</option>
                                                <option>C</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="browserLname">Supplier Address</label>
                                            <input id="browserLname" type="text" placeholder="" className="form-input" required />
                                        </div>
                                        <div>
                                            <label htmlFor="browserLname">Entry Date</label>
                                            <input id="browserLname" type="date" placeholder="" className="form-input" required />
                                        </div>
                                        <div>
                                            <label htmlFor="browserLname">Chalan Number</label>
                                            <input id="browserLname" type="text" placeholder="" className="form-input" required />
                                        </div>
                                        <div>
                                            <label htmlFor="browserLname">Chalan Date</label>
                                            <input id="browserLname" type="date" placeholder="" className="form-input" required />
                                        </div>
                                        <div >
                                            <label htmlFor="gridState">Fiscal Year</label>
                                            <select id="gridState" className="form-select text-dark col-span-4 text-sm" required>
                                                <option>Please Select</option>
                                                <option>2023-2024</option>
                                                <option>2022-2023</option>
                                            </select>
                                            <h5 className='pt-4 text-danger text-sm font-semibold'>*Please Select Fiscal Year</h5>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                                        <label htmlFor="userName" className='col-span-1 text-sm'>Add Items</label>
                                        <input id="userName" type="text" placeholder="Enter Product Name" className="form-input py-2.5 text-sm col-span-4" name="user_name" />
                                    </div>
                                    <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                                        <label htmlFor="userName" className='col-span-1 text-sm'>Note</label>
                                        <textarea id="userName" placeholder="Notes..." className="form-input py-2.5 text-sm col-span-4" name="user_name" />
                                    </div>
                                    <TableServicePurchase />
                                    <div className="flex items-center justify-center gap-6 pt-4">
                                        <button type="submit" className="btn btn-success gap-2" >
                                            <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                            Submit
                                        </button>
                                        <button type="button" className="btn btn-danger gap-2" >
                                            <IconTrashLines className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default addServicePurchase;
