

import { Card, CardContent } from "@/components/ui/card";
import OnboardingForm from "@/components/Forms/OnboardingForm";

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-3xl">
                <CardContent className="p-6">
                    <OnboardingForm />
                </CardContent>
            </Card>
        </div>
    );
}