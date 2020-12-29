import React from 'react'
import Bottomtab from '../containers/Bottomtab'
import Navigationtabs from '../containers/Navigationtabs'
import Tournamentsheading from '../containers/Tournamentsheading'

function Tournaments() {
    return (
        <div className="screenwidth">
            <Tournamentsheading />
            <Navigationtabs />
            {/* <div className="playerlisttab">

            </div> */}
            <Bottomtab />
        </div>
    )
}

export default Tournaments