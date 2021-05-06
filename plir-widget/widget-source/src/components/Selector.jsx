import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Dropdown, Button, DatePicker, DatePickerInput } from 'carbon-components-react'


window.fhirBaseUrl = (typeof window.fhirBaseUrl === 'undefined') ? "http://localhost:8899/fhir" :  window.fhirBaseUrl;
window.hapiUser = (typeof window.hapiUser === 'undefined') ? "hapi" :  window.hapiUser;
window.hapiPass = (typeof window.hapiPass === 'undefined') ? "hapi123" :  window.hapiPass;

let url = window.fhirBaseUrl + '/Measure?_format=json';
let username = window.hapiUser;
let password = window.hapiPass;
let base64 = require('base-64');

let headers = new Headers();

headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));


export default function Selector() {

    let [selected, setSelected] = useState('')
    let [reportingDate, setReportingDate] = useState('')
    let [indicators, setIndicators] = useState([])
    
    let history = useHistory()

    let generateResults = () => {
        if (!reportingDate){return}
        history.push(`/results/${selected}?reportingDate=${reportingDate}`)
    }


    useEffect(() => {
        async function getData() {
            let response = await fetch(url ,{ method:'GET',headers: headers});
            let data = await response.json();
            let res = []
            data.entry.forEach(entry => {
                res.push({ id: entry.resource.id, title: entry.resource.id })
            });
            setIndicators(res)
        }
        getData()
    }, [])


    return (
        <>
            <Dropdown
                id="default"
                titleText="Select an indicator or a FHIR Measure Resource"
                // helperText="Click to generate results"
                label="Select item from list"
                items={indicators}
                itemToString={(item) => (item ? item.title : '')}
                onChange={e => { setSelected(e.selectedItem.id) }}
            />
            <br />
            {
                selected &&
                <DatePicker dateFormat="Y-m-d" datePickerType="single" value={reportingDate} onChange={e => setReportingDate(
                    document.getElementById('reportingDate').value
                )} >
                    <DatePickerInput id="reportingDate"
                        required
                        placeholder="yyyy-mm-dd"
                        labelText="Reporting Date"
                    />
                </DatePicker>
            }

            {   selected &&
                <>
                    <br />
                    <Button  className="" kind="secondary" type="button" onClick={e => { console.log(e); generateResults() }}>
                        Generate Report
                            </Button>
                </>
            }
        </>
    )
}