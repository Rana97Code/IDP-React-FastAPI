import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import * as $ from 'jquery';
import { number } from 'yup';


const Table10: React.FC = () => {

    return (
        <div className="overflow-x-auto mt-8">
            <table className="table-fixed min-w-full border-collapse border border-gray-300 shadow-lg">
                <thead>
                    <tr>
                        <th
                            colSpan={4}
                            className="whitespace-nowrap text-center border-b border-gray-300 px-6 py-4 bg-blue-500 text-white font-semibold">
                            Part-10: CLOSING BALANCE
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-gray-200">
                        <th className="border border-slate-300 p-2" colSpan={2}>Items</th>
                        <th className="border border-slate-300">Note</th>
                        <th className="border border-slate-300">Amount</th>
                    </tr>

                    <tr>
                        <td className="border border-slate-300" colSpan={2}>Clossing Balance(VAT)[58-(50+67)+The Refund Amount not Approved]</td>
                        <td className="border border-slate-300">65</td>
                        <td className="border border-slate-300">0.00</td>
                    </tr>

                    <tr>
                        <td className="border border-slate-300" colSpan={2}>Clossing Balance(SD)[59-(51+68)+The Refund Amount not Approved]</td>
                        <td className="border border-slate-300">66</td>
                        <td className="border border-slate-300">0.00</td>
                    </tr>

                </tbody>
            </table>
        </div>

    );
};

export default Table10;


