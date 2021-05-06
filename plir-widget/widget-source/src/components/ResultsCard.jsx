import { Tile }  from 'carbon-components-react' 


export default function ResultsCard({results, reportingPeriod}) {


    return (
        <>
            <Tile>
                <h4><u>{results.measure}</u></h4>
                <br/>
                
                <p>From: <b>{reportingPeriod.start}</b>;  To: <b>{reportingPeriod.end}</b></p>
                <br/>
               <table>
                   <tbody>
                {results.group[0].population.map((population) => {
                   return <tr key={String(population.code.coding[0].code)}  style={{width: "100px" ,height : "20px"}}><td style={{width: "200px", border: "1px solid black" ,textAlign : "center"}}>{population.code.coding[0].code}</td><td style={{width: "200px" ,border: "1px solid black" , textAlign : "center"}}>{population.count}</td></tr>
                })}
                 </tbody>
                </table>
                <h5>
					Measure Score: {results.group[0].measureScore ? (results.group[0].measureScore.value).toFixed(2):  "0" }
				</h5>
            </Tile>
        </>
    )
}