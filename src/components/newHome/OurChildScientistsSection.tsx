import React from 'react'
import SectionTitle from './SectionTitle'
import ChildScientistCarousel from './ChildScientistCarousel'
import CallToActionBanner from './CallToActionBanner'
import akshay from "@/assets/scientist/akshay.jpg"
import krish from "@/assets/scientist/krish.jpg"
import laxmi from "@/assets/scientist/laxmi.jpg"
import monalisha from "@/assets/scientist/monalisha.jpg"
import monu from "@/assets/scientist/monu.jpg"
import piyush from "@/assets/scientist/piyush.jpg"
import pranjal from "@/assets/scientist/pranjan.jpg"
import pratyush from "@/assets/scientist/Priyansu.jpg"
import sakshiSuman from "@/assets/scientist/saksh-suman.jpg"
import sakshiSinha from "@/assets/scientist/sakshi-sinha.jpg"
import simmi from "@/assets/scientist/simmi.jpg"
import suraj from "@/assets/scientist/suraj.jpg"
const childScientistCardsData = [
    { imageSrc: akshay, name: "Akshay Aarav" },
    { imageSrc: krish, name: "Krish Bhagat" },
    { imageSrc: laxmi, name: "Laxmi Kumari" },
    { imageSrc: monalisha, name: "Monalisha" },
    { imageSrc: monu, name: "Monu kumar" },
    { imageSrc: piyush, name: "Piyush Kumar" },
    { imageSrc: pranjal, name: "Pranjal Das" },
    { imageSrc: pratyush, name: "Pratyush Kumar" },
    { imageSrc: sakshiSuman, name: "Sakshi Suman" },
    { imageSrc: sakshiSinha, name: "Sakshi Sinha" },
    { imageSrc: simmi, name: "Simmi" },
    { imageSrc: suraj, name: "Suraj" },



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