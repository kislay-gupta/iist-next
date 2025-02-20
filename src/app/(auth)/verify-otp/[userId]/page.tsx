import { BgCard } from "@/components/cards";
import VerifyOTPForm from "@/components/Forms/VerifyOTPForm";

interface VerifyOTPPageProps {
    params: Promise<{
        userId: string;
    }>;
}

export default async function VerifyOTPPage({ params }: VerifyOTPPageProps) {
    const { userId } = await params;
    return (
        <div className="container max-w-md mx-auto py-8">
            <BgCard>

                <h1 className="text-2xl font-bold mb-6 text-center">Verify OTP</h1>
                <p className="text-center mb-6 text-gray-600">
                    Please enter the 6-digit code sent to your email/phone
                </p>
                <VerifyOTPForm userId={userId} />
            </BgCard>
        </div>
    );
}