"use client"
import ParseHTML from '@/components/shared/ParsedHTML'
import { Button } from '@/components/ui/button'
import React from 'react'

const DescriptionComponent = ({ description, hindiDescription }: { description: string, hindiDescription: string }) => {
    const [selectedLanguage, setSelectedLanguage] = React.useState('en')
    return (
        <div className="prose max-w-none">
            <div className='flex gap-2 mb-4'>
                <Button variant={selectedLanguage === 'en' ? 'default' : 'outline'} onClick={() => setSelectedLanguage('en')}>
                    English
                </Button>
                <Button variant={selectedLanguage === 'hi' ? 'default' : 'outline'} onClick={() => setSelectedLanguage('hi')}>
                    Hindi
                </Button>
            </div>
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <div className="text-gray-700">
                {selectedLanguage === 'en' ? (
                    <ParseHTML data={description} />
                ) : (
                    <div>
                        {hindiDescription ? <ParseHTML data={hindiDescription} /> : <p>No Hindi description available</p>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DescriptionComponent