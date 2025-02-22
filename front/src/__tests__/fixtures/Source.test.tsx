import Source from "../../components/Sources"
import {render, screen} from '@testing-library/react'
it("Should display no sources ",async ()=>{
    render(<Source sources={[]}/>)
    screen.getByText('No sources')
})