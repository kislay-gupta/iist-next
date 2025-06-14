import React from 'react'
import TitleCard from '../shared/TitleCard'
import { internships } from './internshipData'
import { FocusCards } from '../ui/focus-cards'

const InternshipProgramme = () => {
    return (
        <div className='mx-auto my-8 container w-4/5'>
            <div className='flex justify-center mb-8'>
                <TitleCard bgColor='bg-orange-600' title='Internship Programme' />
            </div>
            <div className=" ">
                <FocusCards cards={internships} />
            </div>
        </div>
    )
}

export default InternshipProgramme