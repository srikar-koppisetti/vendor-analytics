import React, { useState } from "react";
import BarChart from "../shared/components/charts/BarChart";
import PieChart from "../shared/components/charts/PieChart";
import * as XLSX from "xlsx";
import { connect } from "react-redux";
import storeType, { totalSalesByVendor, vendorSalesByDate } from "../types/storeType";
import { saveTotalSalesByVendor, saveVendorSalesByDate } from "../action";
import { saveTotalSalesByVendorActionCretor, saveVendorSalesByDateActionCretor } from "../types/actionCreatorType";


interface Props {
    vendorSalesByDate: vendorSalesByDate;
    totalSalesByVendor: totalSalesByVendor;
    saveVendorSalesByDate: saveVendorSalesByDateActionCretor;
    saveTotalSalesByVendor: saveTotalSalesByVendorActionCretor;
}

const Dashboard: React.FC<Props> = ({vendorSalesByDate, totalSalesByVendor, saveVendorSalesByDate, saveTotalSalesByVendor}) => {

    const vendorData: any = [];
    const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);

    /**
     * reads the excel document, converts to JSON, downloads file and updates redux store
     * @param e 
     */
    const readUploadFile = (e: any) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                // convert excel to json
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName0 = workbook.SheetNames[0];
                const worksheet0 = workbook.Sheets[sheetName0];
                const json0 = XLSX.utils.sheet_to_json(worksheet0);
                vendorData.push(json0);
                const sheetName1 = workbook.SheetNames[1];
                const worksheet1 = workbook.Sheets[sheetName1];
                const json1 = XLSX.utils.sheet_to_json(worksheet1);
                vendorData.push(json1);
                const sheetName2 = workbook.SheetNames[2];
                const worksheet2 = workbook.Sheets[sheetName2];
                const json2 = XLSX.utils.sheet_to_json(worksheet2);
                vendorData.push(json2);

                // download file as json
                download(JSON.stringify(vendorData), "VendorData.json", "text/plain");

                // build redux states
                saveVendorSalesByDate(vendorData);
                saveTotalSalesByVendor(vendorData);
                setIsFileUploaded(true);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }


    /**
     * Downloads file
     * @param content 
     * @param fileName 
     * @param contentType 
     */
    function download(content:string, fileName:string, contentType:string) {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    /**
     * 
     * @param totalSalesByVendor 
     * @returns data for pie graphs
     */
    const getPieGraphData = (totalSalesByVendor: totalSalesByVendor) => {
        return {
            labels: [
              'V1',
              'V2',
              'V3'
            ],
            datasets: [{
              label: 'Total Sales by Vendor',
              data: [totalSalesByVendor.V1, totalSalesByVendor.V2, totalSalesByVendor.V3],
              backgroundColor: [
                'rgb(255, 99, 132, 0.5)',
                'rgb(54, 162, 235, 0.5)',
                'rgb(255, 205, 86, 0.5)'
              ],
              hoverOffset: 4
            }]
          };
    }

    /**
     * 
     * @param vendorSalesByDate 
     * @returns data for bar graphs
     */
    const getBarGraphData = (vendorSalesByDate: vendorSalesByDate) => {
        return {
            labels: vendorSalesByDate.dates,
            datasets: [
              {
                label: 'V1',
                data: vendorSalesByDate.V1,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'V2',
                data: vendorSalesByDate.V2,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
              {
                label: 'V3',
                data: vendorSalesByDate.V3,
                backgroundColor: 'rgba(255, 205, 86, 0.5)',
              },
            ],
          };
    }



    const [selectedChartOption, setSelectedChartOption] = useState<String>();
    const [barChart, pieChart] = ['Bar Chart', 'Pie Chart'];

    // This function is triggered when the select changes
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedChartOption(value);
    };
    
    return (
        <div>
            <h2>Welcome To Dashboard</h2>
            <h3>Step 1. Upload vendors data excel file</h3>
            <form>
                <label htmlFor="upload">Upload File</label>
                <input
                    type="file"
                    name="upload"
                    id="upload"
                    onChange={readUploadFile}
                />
            </form>

            {isFileUploaded &&
                <div>
                    <h3>Step 2. Select which type of Chart you want to see</h3>
                    <select defaultValue={'DEFAULT'} onChange={selectChange}>
                        <option value="DEFAULT" disabled>
                            Choose one
                        </option>
                        <option value={pieChart}>{pieChart}</option>
                        <option value={barChart}>{barChart}</option>
                    </select>
                    <div>
                        {(() => {
                            switch (selectedChartOption) {
                                case pieChart: return <PieChart title="Total Sales by Vendor" data={getPieGraphData(totalSalesByVendor)} />;
                                case barChart: return <BarChart title="Vendor Sales by Date" data={getBarGraphData(vendorSalesByDate)} />;
                                default: return;
                            }
                        })()}
                    </div>
                </div>
            }
        </div>
    );
}

const mapStateToProps = (state: storeType) => {
    return {
        vendorSalesByDate: state.vendorSalesByDate,
        totalSalesByVendor: state.totalSalesByVendor
    }
}

export default connect(mapStateToProps, {
    saveVendorSalesByDate,
    saveTotalSalesByVendor
})(Dashboard);