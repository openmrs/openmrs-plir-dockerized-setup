import { Tile } from 'carbon-components-react'



export default function Error({error}) {


    return (
        <>
            <Tile color='red'>
                <h4>{error}</h4>
            </Tile>
        </>
    )
}