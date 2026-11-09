import { Star } from 'lucide-react';

export default function AuthRightSidebar() {
  return (
    <div className="relative hidden lg:flex flex-1 min-h-screen bg-[#05291e] overflow-hidden select-none">
      {/* Background Image with Deep Emerald Teal Duotone Gradient matching screenshot */}
      <img
        src="/images/auth-testimonial.jpg"
        alt="ZeeWork professional at work"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-85 mix-blend-luminosity"
      />

      {/* Emerald Duotone Color Grading Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#022117]/95 via-[#023324]/75 to-[#00b064]/30" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#032419]/40 to-[#021710]/90" />

      {/* Bottom Floating Testimonial Content matching screenshot */}
      <div className="relative z-10 mt-auto w-full p-12 lg:p-16 text-white space-y-6">
        {/* 5 Stars Rating */}
        <div className="flex items-center gap-1.5 text-[#00c26f]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current stroke-none text-[#00c26f]" />
          ))}
        </div>

        {/* Big Testimonial Quote */}
        <blockquote className="text-2xl xl:text-3xl font-semibold tracking-tight leading-snug text-white max-w-xl">
          “ZeeWork has enabled me to increase my rates. I know what I&apos;m bringing to the table.”
        </blockquote>

        {/* Social Proof Avatars Row */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex -space-x-2.5">
            <img
              src="/images/avatar-elena.jpg"
              alt="Client"
              className="w-10 h-10 rounded-full border-2 border-[#05291e] object-cover ring-1 ring-white/10"
            />
            <img
              src="/images/avatar-marcus.jpg"
              alt="Client"
              className="w-10 h-10 rounded-full border-2 border-[#05291e] object-cover ring-1 ring-white/10"
            />
            <img
              src="/images/avatar-priya.jpg"
              alt="Client"
              className="w-10 h-10 rounded-full border-2 border-[#05291e] object-cover ring-1 ring-white/10"
            />
          </div>
          <span className="text-xs sm:text-sm text-white/80 font-medium">
            Join 42,000+ teams hiring on ZeeWork
          </span>
        </div>
      </div>
    </div>
  );
}