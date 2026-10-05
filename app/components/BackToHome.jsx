import Link from 'next/link';

export default function BackToHome() {
  return (
    <section className="px-3 bg-[#0D0D12]">
      <div className="max-w-3xl mx-auto flex justify-end py-3">
        <Link 
          href="#home" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#B8F000] text-[#B8F000] font-semibold hover:bg-[#B8F000]/10 hover:text-[#D0F000] transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}