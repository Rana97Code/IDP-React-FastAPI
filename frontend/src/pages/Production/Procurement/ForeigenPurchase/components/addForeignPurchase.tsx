import React from 'react';
import { useState, useEffect, ChangeEventHandler } from 'react';
import IconFile from '../../../../../components/Icon/IconFile';
import IconTrashLines from '../../../../../components/Icon/IconTrashLines';
import TableGForeignPurchase from './tableForeignPurchase';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import axios from 'axios';


const addForeignPurchase = () => {

    const navigate = useNavigate();


    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    interface suppliers {
        id: number;
        supplierName: string;
        supplierAddress: string;
    }
    interface customhouse {
        id: number;
        houseName: string;
        houseCode: string;
        houseAddress: string;
    }
    interface country {
        id: number;
        countryName: string;
        supplierAddress: string;
    }
    interface cpcCode {
        id: number;
        cpcDescription: string;
    }
    interface suggestItem {
        id: number;
        itemName: string;
    }

    interface detailsItem {
        id: number;
        itemName: string;
        hsCodeId: number;
        hsCode: string;
        sd: number;
        vat: number;
    }

    const [all_suppliers, setAllSupplier] = useState<suppliers[]>([]);
    const [all_customhouse, setAllCustomHouse] = useState<customhouse[]>([]);
    const [all_country, setAllCountry] = useState<country[]>([]);
    const [all_cpccode, setAllCpcCode] = useState<cpcCode[]>([]);
    const [all_suggestitm, setSuggestItem] = useState<suggestItem[]>([]);

    const [itemDetails, setItemDetails] = useState<detailsItem[]>([]);
    const [suppAddress, setAddress] = useState("");

    const [supplier, setSupplier] = useState("");
    const [supplierAdd, setSupplierAdd] = useState("");
    const [houseId, setHouseId] = useState("");
    const [housecode, setHouseCode] = useState("");
    const [countryId, setCountryId] = useState("");
    const [lcnumber, setLcNumber] = useState("");
    const [lcDate, setLcDate] = useState(getTodayDate());
    const [entryDate, setEntryDate] = useState(getTodayDate());
    const [boe, setBoe] = useState("");
    const [boeDate, setBoeDate] = useState(getTodayDate());
    const [dataSource, setDateSource] = useState("");
    const [cpcCode, setCpcCode] = useState("");
    const [fiscalYear, setFiscalYear] = useState("");

    const [note, setNote] = useState('');



    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            const bearer = token.slice(1, -1);

            const headers = { Authorization: `Bearer ${bearer}` }

            axios.get('http://localhost:8080/bmitvat/api/supplier/all_supplier', { headers })
                .then((response) => {
                    setAllSupplier(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });

            axios.get('http://localhost:8080/bmitvat/api/customhouse/all_customhouse', { headers })
                .then((response) => {
                    setAllCustomHouse(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });

            axios.get('http://localhost:8080/bmitvat/api/country/all_country', { headers })
                .then((response) => {
                    setAllCountry(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });

            axios.get('http://localhost:8080/bmitvat/api/cpc/all_cpc', { headers })
                .then((response) => {
                    setAllCpcCode(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });

        }
    }, []);



    const getSupplierId: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const selectedOptionId = event.target.value;

        const token = localStorage.getItem('Token');
        if (token) {
            const bearer = JSON.parse(token);
            const headers = { Authorization: `Bearer ${bearer}` }

            axios.get(`http://localhost:8080/bmitvat/api/supplier/get_supplier/${selectedOptionId}`, { headers })
                .then((response) => {
                    const data = response.data;
                    setSupplier(data.id)
                    setAddress(data.supplierAddress)

                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    };

    const getHouseId: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const selectedOptionId = event.target.value;
        setHouseId(selectedOptionId);
        const token = localStorage.getItem('Token');
        if (token) {
            const bearer = JSON.parse(token);
            const headers = { Authorization: `Bearer ${bearer}` }

            axios.get(`http://localhost:8080/bmitvat/api/customhouse/get_customhouse/${selectedOptionId}`, { headers })
                .then((response) => {
                    const data = response.data;
                    setHouseCode(data.houseCode)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    };

    // const getFiscalYear: ChangeEventHandler<HTMLSelectElement> = (event) => {
    //     const selectedOptionId = event.target.value;
    //     console.log(selectedOptionId);
    // }


    async function getItemByKeyUp(event: React.FormEvent<HTMLInputElement>) {


        const searchInput = event.currentTarget as HTMLInputElement;
        const suggestionsList = document.getElementById('suggestionsList');

        if (suggestionsList) {
            suggestionsList.style.display = 'block';
        }

        if (!suggestionsList) {
            return;
        }

        if (searchInput.value.trim() === '') {
            suggestionsList.innerHTML = '';
            return;
        }
        const token = localStorage.getItem('Token');
        if (token) {
            const bearer = JSON.parse(token);
            const headers = { Authorization: `Bearer ${bearer}` }

            let selectElement = document.getElementById('fiscalYear') as HTMLSelectElement;
            let fiscalYear = selectElement.value;

            const searchTerm = fiscalYear + '/' + encodeURIComponent(searchInput.value);
            // console.log(searchTerm);
            // if(searchInput.value.length>0){
            try {
                const response = await axios.post('http://localhost:8080/bmitvat/api/item/getItemSuggestions', searchTerm, { headers });
                const suggestions = response.data;
                setSuggestItem(suggestions);

                suggestionsList.innerHTML = '';
                all_suggestitm.forEach(suggestion => {

                    const listItem = document.createElement('li');
                    listItem.style.width = '500px';
                    listItem.style.padding = '10px';
                    listItem.className = 'suggestion-item';
                    listItem.value = suggestion.id;
                    listItem.textContent = suggestion.itemName;
                    suggestionsList.appendChild(listItem);
                });


                const selectedLiElements = document.querySelectorAll('.suggestion-item');
                selectedLiElements.forEach(async (liElement) => {

                    liElement.addEventListener('click', () => {
                        const clickedValue = (liElement as HTMLLIElement).value;
                        const liElementTyped = liElement as HTMLElement;
                        liElementTyped.style.backgroundColor = 'green';

                        // Now 'clickedValue' contains the value of the clicked li element
                        console.log('Clicked Item ID:', clickedValue);
                        if (suggestionsList) {
                            suggestionsList.style.display = 'none';
                        }

                        if (clickedValue > 0) {


                            const token = localStorage.getItem('Token');
                            if (token) {
                                const bearer = JSON.parse(token);
                                const headers = { Authorization: `Bearer ${bearer}` }

                                axios.get(`http://localhost:8080/bmitvat/api/purchase/get_item_details/${clickedValue}`, { headers })
                                    .then((response) => {
                                        const data = response.data;
                                        setItemDetails(data);
                                        addRow(data);
                                    })
                                    .catch((error) => {
                                        console.error('Error fetching data:', error);
                                    });
                            }


                            function addRow(data: any) {
                                const dataTable = document.querySelector('#dataTable tbody') as HTMLTableElement;

                                const arrayData: any[] = [];

                                const inputId = document.createElement('input');
                                inputId.type = 'hidden';
                                inputId.name = 'itemId';
                                inputId.value = data.id;
                                inputId.autocomplete = 'off';
                                inputId.disabled = true;
                                inputId.style.cssText = 'width: 1px;';

                                const input = document.createElement('input');
                                input.type = 'text';
                                input.name = 'itemName';
                                input.value = data.itemName;
                                input.autocomplete = 'off';
                                input.disabled = true;
                                input.style.cssText = 'border: 1px solid black; width: 180px;';

                                const input1 = document.createElement('input');
                                input1.type = 'text';
                                input1.name = 'boe';
                                input1.className = '';
                                input1.value = '';
                                input1.id = 'boe';
                                input1.autocomplete = 'off';
                                input1.min = '0';
                                input1.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input2 = document.createElement('input');
                                input2.type = 'number';
                                input2.name = 'quantity';
                                input2.className = '';
                                input2.value = '';
                                input2.id = 'qtyId';
                                input2.autocomplete = 'off';
                                input2.min = '0';
                                input2.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input3 = document.createElement('input');
                                input3.type = 'number';
                                input3.name = 'accessableValue';
                                input3.className = '';
                                input3.value = '';
                                input3.id = 'accessableValue';
                                input3.autocomplete = 'off';
                                input3.min = '0';
                                input3.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input4 = document.createElement('input');
                                input4.type = 'number';
                                input4.name = 'rate';
                                input4.className = 'rateClass';
                                input4.value = '';
                                input4.id = 'rateId';
                                input4.autocomplete = 'off';
                                input4.min = '0';
                                input4.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input5 = document.createElement('input');
                                input5.type = 'number';
                                input5.name = 'cd';
                                input5.className = '';
                                input5.value = data.cd;
                                input5.autocomplete = 'off';
                                input5.disabled = true;
                                input5.min = '0';
                                input5.style.cssText = 'border: 1px solid black; width: 60px;';

                                const input6 = document.createElement('input');
                                input6.type = 'number';
                                input6.name = 'cdAmount';
                                input6.className = '';
                                input6.value = '';
                                input6.autocomplete = 'off';
                                input6.disabled = true;
                                input6.min = '0';
                                input6.style.cssText = 'border: 1px solid black; width: 150px;';

                                const input7 = document.createElement('input');
                                input7.type = 'number';
                                input7.name = 'rd';
                                input7.className = '';
                                input7.value = data.rd;
                                input7.autocomplete = 'off';
                                input7.disabled = true;
                                input7.min = '0';
                                input7.style.cssText = 'border: 1px solid black; width: 60px;';

                                const input8 = document.createElement('input');
                                input8.type = 'number';
                                input8.name = 'rdAmount';
                                input8.className = '';
                                input8.value = '';
                                input8.autocomplete = 'off';
                                input8.disabled = true;
                                input8.min = '0';
                                input8.style.cssText = 'border: 1px solid black; width: 150px;';

                                const input9 = document.createElement('input');
                                input9.type = 'number';
                                input9.name = 'sd';
                                input9.className = '';
                                input9.value = data.sd;
                                input9.autocomplete = 'off';
                                input9.disabled = true;
                                input9.min = '0';
                                input9.style.cssText = 'border: 1px solid black; width: 60px;';

                                const input10 = document.createElement('input');
                                input10.type = 'number';
                                input10.name = 'sdAmount';
                                input10.className = 'total_sd';
                                input10.value = '';
                                input10.autocomplete = 'off';
                                input10.disabled = true;
                                input10.min = '0';
                                input10.style.cssText = 'border: 1px solid black; width: 100px;';

                                const input11 = document.createElement('input');
                                input11.type = 'number';
                                input11.name = 'vatableValue';
                                input11.className = '';
                                input11.value = '';
                                input11.autocomplete = 'off';
                                input11.disabled = true;
                                input11.min = '0';
                                input11.style.cssText = 'border: 1px solid black; width: 160px;';

                                const selectElement = document.createElement('select');
                                selectElement.name = 'vatType';
                                selectElement.className = '';
                                selectElement.style.cssText = 'border: 1px solid black; width: 180px;';

                                const option0 = document.createElement('option');
                                option0.value = '';
                                option0.selected = true;
                                option0.textContent = 'Select Vat %';
                                selectElement.appendChild(option0);

                                const option1 = document.createElement('option');
                                option1.value = '1';
                                option1.textContent = 'Standard Rate(15%)';
                                selectElement.appendChild(option1);

                                const option2 = document.createElement('option');
                                option2.value = '2';
                                option2.textContent = 'Zero Rate(0%)';
                                selectElement.appendChild(option2);

                                const option3 = document.createElement('option');
                                option3.value = '3';
                                option3.textContent = 'Exempted';
                                selectElement.appendChild(option3);

                                const option4 = document.createElement('option');
                                option4.value = '4';
                                option4.textContent = 'Specific';
                                selectElement.appendChild(option4);

                                const input12 = document.createElement('input');
                                input12.type = 'number';
                                input12.name = 'vatRate';
                                input12.className = '';
                                input12.value = data.vat;
                                input12.autocomplete = 'off';
                                input12.disabled = true;
                                input12.min = '0';
                                input12.style.cssText = 'border: 1px solid black; width: 60px; display:block;';

                                const input13 = document.createElement('input');
                                input13.type = 'number';
                                input13.name = 'vatAmount';
                                input13.className = 'total_vat';
                                input13.value = '';
                                input13.autocomplete = 'off';
                                input13.disabled = true;
                                input13.min = '0';
                                input13.style.cssText = 'border: 1px solid black; width: 150px;';

                                const input14 = document.createElement('input');
                                input14.type = 'number';
                                input14.name = 'ait';
                                input14.className = '';
                                input14.value = data.ait;
                                input14.autocomplete = 'off';
                                input14.disabled = true;
                                input14.min = '0';
                                input14.style.cssText = 'border: 1px solid black; width: 60px;';

                                const input15 = document.createElement('input');
                                input15.type = 'number';
                                input15.name = 'aitAmount';
                                input15.className = '';
                                input15.value = '';
                                input15.autocomplete = 'off';
                                input15.disabled = true;
                                input15.min = '0';
                                input15.style.cssText = 'border: 1px solid black; width: 120px;';


                                const input16 = document.createElement('input');
                                input16.type = 'number';
                                input16.name = 'at';
                                input16.className = '';
                                input16.value = data.at;
                                input16.autocomplete = 'off';
                                input16.disabled = true;
                                input16.min = '0';
                                input16.style.cssText = 'border: 1px solid black; width: 60px;';

                                const input17 = document.createElement('input');
                                input17.type = 'number';
                                input17.name = 'atAmount';
                                input17.className = 'total_at';
                                input17.value = '';
                                input17.autocomplete = 'off';
                                input17.disabled = true;
                                input17.min = '0';
                                input17.style.cssText = 'border: 1px solid black; width: 120px;';

                                const selectReb = document.createElement('select');
                                selectReb.name = 'rebate';
                                selectReb.className = '';
                                selectReb.style.cssText = 'border: 1px solid black; width: 130px;';

                                const optionR = document.createElement('option');
                                optionR.value = '1';
                                optionR.textContent = 'Yes';
                                selectReb.appendChild(optionR);

                                const optionR1 = document.createElement('option');
                                optionR1.value = '2';
                                optionR1.textContent = 'No';
                                selectReb.appendChild(optionR1);

                                const optionR2 = document.createElement('option');
                                optionR2.value = '3';
                                optionR2.textContent = 'Zero/Exmptd/Turn/unreg';
                                selectReb.appendChild(optionR2);

                                const input18 = document.createElement('input');
                                input18.type = 'number';
                                input18.name = 'totalAmount';
                                input18.className = 'total_amount';
                                input18.value = '';
                                input18.autocomplete = 'off';
                                input18.disabled = true;
                                input18.min = '0';
                                input18.style.cssText = 'border: 1px solid black; width: 180px;';

                                const removeButton = document.createElement('button');
                                removeButton.textContent = 'Remove';
                                removeButton.style.cssText = 'border: 1px solid black; background-color:red; width: 100px;';
                                removeButton.addEventListener('click', () => {
                                    removeRow(newRow);
                                });
                                function removeRow(row: HTMLTableRowElement) {
                                    dataTable.removeChild(row);
                                    // Remove the corresponding data from the arrayData array
                                    const index = arrayData.findIndex((item) => item.itemName === data.itemName);
                                    if (index !== -1) {
                                        arrayData.splice(index, 1);
                                    }
                                }

                                //Both Select Calculation
                                selectElement.addEventListener('change', calculateVat1);
                                function calculateVat1() {
                                    const value1 = parseFloat(input12.value) || 0;

                                    const vat = (parseFloat(input11.value) * value1) / 100;
                                    input13.value = vat.toString();

                                    // const totalAmout = (parseFloat(VatRate.value) + vat);
                                    // input13.value = totalAmout.toString();
                                }



                                input2.addEventListener('keyup', calculateValue);
                                input3.addEventListener('keyup', calculateValue);

                                function calculateValue() {
                                    const value2 = parseFloat(input2.value) || 0;
                                    const value3 = parseFloat(input3.value) || 0;
                                    const value4 = parseFloat(input4.value) || 0;
                                    const value5 = parseFloat(input5.value) || 0;
                                    const value7 = parseFloat(input7.value) || 0;
                                    const value9 = parseFloat(input9.value) || 0;
                                    const value12 = parseFloat(input12.value) || 0;
                                    const value14 = parseFloat(input14.value) || 0;
                                    const value16 = parseFloat(input16.value) || 0;

                                    const onlyValue = value3 / value2;
                                    input4.value = onlyValue.toString();

                                    //cd
                                    const cdAmount = (value3 * value5) / 100;
                                    input6.value = cdAmount.toString();

                                    //rd
                                    const rdAmount = (value3 * value7) / 100;
                                    input8.value = rdAmount.toString();

                                    //sd
                                    const sdWithValue = (value3 * value9) / 100;
                                    input10.value = sdWithValue.toString();

                                    // VatableValue
                                    const vatAblValue = value3 + cdAmount + rdAmount + sdWithValue;
                                    input11.value = vatAblValue.toString();

                                    // vat
                                    const vatAmout = (vatAblValue * value12) / 100;
                                    input13.value = vatAmout.toString();

                                    // Ait
                                    const aitAmout = (value3 * value14) / 100;
                                    input15.value = aitAmout.toString();

                                    // at
                                    const atAmout = (vatAblValue * value16) / 100;
                                    input17.value = atAmout.toString();

                                    const totalAmount = (vatAblValue + vatAmout + aitAmout + atAmout);
                                    input18.value = totalAmount.toString();

                                }

                                input2.addEventListener('keyup', calculateTotalValue);
                                input3.addEventListener('keyup', calculateTotalValue);
                                selectElement.addEventListener('change', calculateTotalValue);

                                function calculateTotalValue() {
                                    // Grand Total VAT Calculation
                                    let grandTotalVat = 0;
                                    const VatInput = document.querySelectorAll(`.total_vat`) as NodeListOf<HTMLInputElement>;

                                    if (VatInput) {
                                        VatInput.forEach((input: HTMLInputElement) => {
                                            const value = parseFloat(input.value) || 0;
                                            grandTotalVat += value;
                                        });

                                        const grandTotalVatId = document.getElementById('vatTotal') as HTMLInputElement | null;
                                        if (grandTotalVatId !== null) {
                                            grandTotalVatId.value = grandTotalVat.toString();
                                        }
                                    }

                                    // Grand Total SD Calculation
                                    let grandTotalSd = 0;
                                    const SdInput = document.querySelectorAll(`.total_at`) as NodeListOf<HTMLInputElement>;

                                    if (SdInput) {
                                        SdInput.forEach((input: HTMLInputElement) => {
                                            const value = parseFloat(input.value) || 0;
                                            grandTotalSd += value;
                                        });

                                        const grandTotalSdInput = document.getElementById('atTotal') as HTMLInputElement | null;
                                        if (grandTotalSdInput !== null) {
                                            grandTotalSdInput.value = grandTotalSd.toString();
                                        }
                                    }

                                    // Grand Total Amount Calculation
                                    let grandTotal = 0;
                                    const inputs = document.querySelectorAll(`.total_amount`) as NodeListOf<HTMLInputElement>;

                                    if (inputs) {
                                        inputs.forEach((input: HTMLInputElement) => {
                                            const value = parseFloat(input.value) || 0;
                                            grandTotal += value;
                                        });

                                        const grandTotalInput = document.getElementById('grandTotal') as HTMLInputElement | null;
                                        if (grandTotalInput !== null) {
                                            grandTotalInput.value = grandTotal.toString();
                                        }
                                    }

                                }


                                const newRow = dataTable.insertRow();

                                const cellId = newRow.insertCell();
                                cellId.appendChild(inputId);
                                const cell = newRow.insertCell();
                                cell.appendChild(input);
                                const cell1 = newRow.insertCell();
                                cell1.appendChild(input1);
                                const cell2 = newRow.insertCell();
                                cell2.appendChild(input2);
                                const cell3 = newRow.insertCell();
                                cell3.appendChild(input3);
                                const cell4 = newRow.insertCell();
                                cell4.appendChild(input4);
                                const cell5 = newRow.insertCell();
                                cell5.appendChild(input5);
                                const cell6 = newRow.insertCell();
                                cell6.appendChild(input6);
                                const cell7 = newRow.insertCell();
                                cell7.appendChild(input7);
                                const cell8 = newRow.insertCell();
                                cell8.appendChild(input8);
                                const cell9 = newRow.insertCell();
                                cell9.appendChild(input9);
                                const cell10 = newRow.insertCell();
                                cell10.appendChild(input10);
                                const cell11 = newRow.insertCell();
                                cell11.appendChild(input11);
                                const cellSelectVat = newRow.insertCell();
                                cellSelectVat.appendChild(selectElement);
                                const cell12 = newRow.insertCell();
                                cell12.appendChild(input12);
                                const cell13 = newRow.insertCell();
                                cell13.appendChild(input13);
                                const cell14 = newRow.insertCell();
                                cell14.appendChild(input14);
                                const cell15 = newRow.insertCell();
                                cell15.appendChild(input15);
                                const cell16 = newRow.insertCell();
                                cell16.appendChild(input16);
                                const cell17 = newRow.insertCell();
                                cell17.appendChild(input17);
                                const cellRebet = newRow.insertCell();
                                cellRebet.appendChild(selectReb);
                                const cell18 = newRow.insertCell();
                                cell18.appendChild(input18);
                                const removeBtn = newRow.insertCell();
                                removeBtn.appendChild(removeButton);
                            }

                        }
                    });
                });
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
            // }

        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dataTable = document.querySelector('#dataTable tbody') as HTMLTableElement;
        const arrayData: any[] = [];
        if (dataTable) {
            dataTable.querySelectorAll('tr').forEach((row) => {

                const rowData: any = {};

                row.querySelectorAll('td input, td select').forEach((input) => {
                    const inputElement = input as HTMLInputElement;
                    const inputElementSelect = input as HTMLSelectElement;
                    const selectValue = inputElement.type === 'select-one' ? inputElementSelect.value : inputElement.value;
                    rowData[inputElement.name || 'itemId'] = inputElement.value;
                    rowData[inputElement.name || 'quantity'] = inputElement.value;
                    rowData[inputElement.name || 'rate'] = inputElement.value;
                    rowData[inputElement.name || 'priceValue'] = inputElement.value;
                    rowData[inputElement.name || 'sd'] = inputElement.value;
                    rowData[inputElement.name || 'sdAmount'] = inputElement.value;
                    rowData[inputElement.name || 'vatableValue'] = inputElement.value;
                    rowData[inputElement.name || 'vatType'] = inputElement.value;
                    rowData[inputElement.name || 'vatRate'] = inputElement.value;
                    rowData[inputElement.name || 'vatAmount'] = inputElement.value;
                    rowData[inputElement.name || 'vds'] = selectValue;
                    rowData[inputElement.name || 'rebate'] = selectValue;
                    rowData[inputElement.name || 'totalAmount'] = inputElement.value;
                });

                arrayData.push(rowData);

            });

        } else {
            console.error("Could not find #dataTable tbody element");
        }
        console.log(arrayData);
        // const jsonAllItemsData = JSON.stringify(arrayData);
        const TotalVat = document.getElementById('vatTotal') as HTMLInputElement;
        const TotalAT = document.getElementById('atTotal') as HTMLInputElement;
        const AllTotal = document.getElementById('grandTotal') as HTMLInputElement;

        if (TotalVat || TotalAT || AllTotal) {
            const Vat = TotalVat.value;
            const AT = TotalAT.value;
            const ALL = AllTotal.value;


            const purchase = {
                supplierId: supplier,
                supplierAdd: supplierAdd,
                entryDate: entryDate,
                boe: boe,
                boeDate: boeDate,
                lcnumber: lcnumber,
                lcDate: lcDate,
                customHouse: houseId,
                housecode: housecode,
                countryId: countryId,
                dataSource: dataSource,
                cpcCode: cpcCode,
                fiscalYear: fiscalYear,
                purchaseItems: arrayData,
                totalTax: Vat,
                totalAt: AT,
                grandTotal: ALL,
                note: note

            }

            console.log(purchase);

            const token = localStorage.getItem('Token');
            if (token) {
                const bearer = JSON.parse(token);
                const headers = { Authorization: `Bearer ${bearer}` }
                try {
                    // process.exit();

                    await axios.post("http://localhost:8080/bmitvat/api/purchase/add-foreign-purchase", purchase, { headers })
                        .then(function (response) {
                            navigate("/pages/procurment/foreign_purchase/index");
                        })

                } catch (err) {
                    console.log(err);
                }
            }
        }
    };



    return (
        <div>
            <div className="panel flex items-center justify-between flex-wrap gap-4 text-black">
                <h2 className="text-xl font-bold">Production Foreign Purchase</h2>
            </div>
            <div className="pt-5 gap-2">
                <div className="mb-5">
                    <div className="panel" id="browser_default">
                        <div className="flex items-center justify-between mb-7">
                            <h5 className="font-semibold text-lg dark:text-white-light">Add New Foreign Purchase</h5>
                        </div>
                        <div className="mb-5">
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                                    <div>
                                        <label htmlFor="getSupplier">Supplier</label>
                                        <select id="getSupplier" onChange={getSupplierId} className="form-select text-dark col-span-4 text-sm" required >
                                            <option>Select Supplier</option>
                                            {all_suppliers.map((option, index) => (
                                                <option key={index} value={option.id}>
                                                    {option.supplierName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="suppAddress">Supplier Address</label>
                                        <input id="suppAddress" type="text" value={suppAddress} onChange={(e) => setSupplierAdd(e.target.value)} className="form-input" required />
                                    </div>
                                    <div>
                                        <label htmlFor="entryDate">Entry Date</label>
                                        <input id="entryDate" type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} className="form-input" required />
                                    </div>
                                    <div>
                                        <label htmlFor="boeNo">BOE/Challan No</label>
                                        <input id="boeNo" type="text" placeholder="" onChange={(e) => setBoe(e.target.value)} className="form-input" required />
                                    </div>
                                    <div>
                                        <label htmlFor="boeDate">Bill Of Entry Date</label>
                                        <input id="boeDate" type="date" value={boeDate} onChange={(e) => setBoeDate(e.target.value)} className="form-input" required />
                                    </div>
                                    <div>
                                        <label htmlFor="lcNumber">LC Number</label>
                                        <input id="lcNumber" type="text" placeholder="" onChange={(e) => setLcNumber(e.target.value)} className="form-input" required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-5 pt-4">
                                    <div>
                                        <label htmlFor="lcDate">LC Date</label>
                                        <input id="lcDate" type="date" value={lcDate} onChange={(e) => setLcDate(e.target.value)} className="form-input" required />
                                    </div>
                                    <div>
                                        <label htmlFor="getHouseId">Custom House</label>
                                        <select id="getHouseId" onChange={getHouseId} className="form-select text-dark col-span-4 text-sm" required >
                                            <option>Select Custom House</option>
                                            {all_customhouse.map((option, index) => (
                                                <option key={index} value={option.id}>
                                                    {option.houseName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="houseCode">House Code</label>
                                        <input id="houseCode" type="text" value={housecode} onChange={(e) => setHouseCode(e.target.value)} className="form-input" required />
                                    </div>
                                    <div>
                                        <label htmlFor="setCountryId">Country Of Origin</label>
                                        <select id="setCountryId" onChange={(e) => setCountryId(e.target.value)} className="form-select text-dark col-span-4 text-sm">
                                            <option>Select Country</option>
                                            {all_country.map((option, index) => (
                                                <option key={index} value={option.id}>
                                                    {option.countryName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="dataSource">Data Source</label>
                                        <select id="dataSource" onChange={(e) => setDateSource(e.target.value)} className="form-select text-dark col-span-4 text-sm">
                                            <option value={"Boe Data"}>Boe Data</option>
                                            <option value={"Manual Entry For Service"}>Manual Entry For Service</option>
                                            <option value={"Manual Entry For BoE"}>Manual Entry For BoE</option>
                                        </select>
                                    </div>
                                    <div >
                                        <label htmlFor="cpcCode">CPC Code</label>
                                        <select id="cpcCode" onChange={(e) => setCpcCode(e.target.value)} className="form-select text-dark col-span-4 text-sm" required>
                                            <option >Select CPC Code</option>
                                            {all_cpccode.map((option, index) => (
                                                <option key={index} value={option.id}>
                                                    {option.cpcDescription}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='pt-4'>
                                        <label htmlFor="fiscalYear">Fiscal Year</label>
                                        <select id="fiscalYear" onChange={(e) => setFiscalYear(e.target.value)} className="form-select text-dark col-span-4 text-sm" required>
                                            <option >Please Select</option>
                                            <option value={"2024"} >2023-2024</option>
                                            <option value={"2023"} >2022-2023</option>
                                        </select>
                                        <h5 className='pt-4 text-danger text-sm font-semibold'>*Please Select Fiscal Year</h5>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap--x-2 gap-y-3">
                                    <label htmlFor="addItems" className='col-span-1 text-sm'>Add Items</label>
                                    <input id="addItems" type="text" placeholder="Enter Product Name" className="form-input py-2.5 text-sm col-span-2" onInput={getItemByKeyUp} />
                                    <ul style={{ cursor: 'pointer' }} className="mt-10 ml-20 w-1/2 absolute bg-slate-300" id="suggestionsList"></ul>
                                </div>

                                {/* <TableGForeignPurchase /> */}
                                <div className="border overflow-hidden overflow-x-auto">
                                    <table id="dataTable" className="whitespace-nowrap table-hover border dataTable">
                                        <thead>
                                            <tr className="whitespace-nowrap border overflow-x-auto">
                                                <th className="w-1"></th>
                                                <th className="w-14" >Description</th>
                                                <th className="w-9 border-black" >BOE Item No</th>
                                                <th className="w-9 border-black" >Quantity</th>
                                                <th className="w-9 border-black" >Assessable Value</th>
                                                <th className="w-9" >Rate(BDT)</th>
                                                <th className="w-6" >CD%</th>
                                                <th className="w-9" >CD(BDT)</th>
                                                <th className="w-6" >RD%</th>
                                                <th className="w-9" >RD(BDT)</th>
                                                <th className="w-6" >SD%</th>
                                                <th className="w-9 border-x-1 border-black" >SD(BDT)</th>
                                                <th className="w-14" >Base Value of VAT(BDT)</th>
                                                <th className="w-14 border-x-1 border-black" >VAT Type</th>
                                                <th className="w-7" >VAT(%)</th>
                                                <th className="w-14 border-x-1 border-black" >VAT(BDT)</th>
                                                <th className="w-6" >AIT%</th>
                                                <th className="w-9" >AIT(BDT)</th>
                                                <th className="w-6" >AT%</th>
                                                <th className="w-9" >AT(BDT)</th>
                                                <th className="w-7 border-x-1 border-black" >Rebate</th>
                                                <th className="w-14" >Total Amount</th>
                                                <th className="w-7" >Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                        </tbody>
                                    </table>

                                    <table className='mt-4'>
                                        <tr className="h-10 border border-black form-input">
                                            <td className="border-r-2 w-3/5 pr-4" align="right"><strong>Total Vat(BDT)</strong></td>
                                            <td align="left" className='pl-4'><strong><input type='text' id='vatTotal' disabled /></strong></td>
                                        </tr>
                                        <tr className="h-10 border border-black form-input">
                                            <td className="border-r-2 w-3/5 pr-4" align="right"><strong>Total At(BDT)</strong></td>
                                            <td align="left" className='pl-4'><strong id=""><input type='text' id='atTotal' disabled /></strong></td>
                                        </tr>
                                        <tr className="h-10 border border-black form-input">
                                            <td className="border-r-2 w-3/5 pr-4" align="right"><strong>Grand Total(BDT)</strong></td>
                                            <td align="left" className='pl-4'><strong><input type="text" id="grandTotal" disabled /></strong>
                                                <p></p>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                </div>
                                <div className="grid grid-cols-5 gap--x-2 gap-y-3">
                                    <label htmlFor="userName" className='col-span-1 text-sm'>Note</label>
                                    <textarea id="userName" onChange={(e) => setNote(e.target.value)} placeholder="Notes..." className="form-input py-2.5 text-sm col-span-4" name="user_name" />
                                </div>

                                <div className="flex items-center justify-center gap-6 pt-9">
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
                </div>
            </div>
        </div>
    );
};

export default addForeignPurchase;
