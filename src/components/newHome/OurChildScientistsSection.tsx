import React from 'react'
import SectionTitle from './SectionTitle'
import ChildScientistCarousel from './ChildScientistCarousel'
import CallToActionBanner from './CallToActionBanner'

const childScientistCardsData = [
    { imageSrc: 'https://placehold.co/1920x1080/EEE/31343C' },
    { imageSrc: 'https://placehold.co/1920x1080/EEE/31343C' },
    { imageSrc: 'https://placehold.co/1920x1080/EEE/31343C' },
    { imageSrc: 'https://placehold.co/1920x1080/EEE/31343C' },
    { imageSrc: 'https://placehold.co/1920x1080/EEE/31343C' },
    { imageSrc: 'https://placehold.co/1920x1080/EEE/31343C' },
    { imageSrc: 'https://placehold.co/1920x1080/EEE/31343C' },
    { imageSrc: 'https://placehold.co/1920x1080/EEE/31343C' },

]

const OurChildScientistsSection = () => {
    return (
        <section className="container mx-auto my-12">
            <div className="flex justify-center mb-8">
                <SectionTitle title="Our Child Scientists" bgColor="bg-blue-400" />
            </div>
            <ChildScientistCarousel cardsData={childScientistCardsData} />
            <CallToActionBanner
                title="Talk to our Experts"
                description="Connect with our team of experts for expert advice and solutions. Let us help you succeed."
                buttonText="Contact Us"
                buttonLink="#contact" // Placeholder link
            />
        </section>
    )
}

export default OurChildScientistsSection 