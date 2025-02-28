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
    <div className="min-h-screen flex items-center justify-center px-4">
      <BgCard>
        <h1 className="text-xl font-semibold mb-3 text-center">
          Verification Required
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Enter the verification code sent to your registered contact
        </p>
        <VerifyOTPForm userId={userId} />
      </BgCard>
    </div>
  );
}
