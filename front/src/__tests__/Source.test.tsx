import {render, screen} from '@testing-library/react'
import Sources from "../components/Sources"
import SourcesExemple from './fixtures/sources.exemple'
it("Should display no sources ",async ()=>{
    render(<Sources sources={[]}/>)
    screen.getByText('No sources')
})

it("Should display all provided sources ",async ()=>{
    render(<Sources sources={SourcesExemple}/>)
    screen.getByText('No sources')
})