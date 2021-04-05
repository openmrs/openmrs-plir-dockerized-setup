library TX_PVLS version '0.0.1'
 
using FHIR version '4.0.1'
 
include FHIRHelpers version '4.0.1' called FHIRHelpers
 
codesystem "CIEL": 'https://openconceptlab.org/orgs/CIEL/sources/CIEL'
 
code "Viral Load Quantitative": '856' from "CIEL" display 'HIV viral load'
 
code "Viral Load Qualitative": '1305' from "CIEL" display 'HIV VIRAL LOAD, QUALITATIVE'
 
code "Viral Load Qualitative Value": '1306' from "CIEL" display 'BEYOND DETECTABLE LIMIT'
 
parameter "Measurement Period" Interval<DateTime>
 
context Patient
 
define "Denominator":
    "Initial Population"
 
define "Numerator":
    exists "Viral Load Suppresed"
 
define "Viral Load Check":
    ( [Observation: "Viral Load Quantitative"]
        union [Observation: "Viral Load Qualitative"] ) o
        where o.status in {'final', 'amended', 'corrected'}
        and o.effective in day of "Measurement Period"
 
define "Viral Load Suppresed":
       "Viral Load Check" v where (v.value as Quantity)  < 1000
        or v.value.coding[1]= "Viral Load Qualitative Value"
        or v.value.coding[2]= "Viral Load Qualitative Value"  
 
define "Initial Population":
    exists "Viral Load Check"