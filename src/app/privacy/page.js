export const metadata = {
  title: "Privacy Policy",
  description: "How LankaTrail collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-display font-bold text-3xl mb-6">Privacy Policy</h1>
      <div className="prose prose-ink max-w-none text-ink/80 leading-relaxed space-y-4">
        <p>Last updated: August 2026</p>

        <p>
          LankaTrail ("we", "us") respects your privacy. This page explains what data we collect and how it's used.
        </p>

        <h2 className="font-display font-bold text-xl mt-8 mb-2">Account Information</h2>
        <p>
          If you create an account, we store your email, name, and password (encrypted) to provide check-in,
          progress tracking, and review features. We use Google OAuth or email/password authentication via NextAuth.js.
        </p>

        <h2 className="font-display font-bold text-xl mt-8 mb-2">Location Data</h2>
        <p>
          If you use the GPS check-in feature, your device's location is requested by your browser and used only
          to verify proximity to a destination. We do not store your raw location — only whether a check-in was
          successful.
        </p>

        <h2 className="font-display font-bold text-xl mt-8 mb-2">Cookies and Advertising</h2>
        <p>
          We use Google AdSense to show ads on this site. Google and its partners may use cookies to serve ads
          based on your prior visits to this or other websites. You can opt out of personalized advertising by
          visiting{" "}
          <a href="https://adssettings.google.com" className="text-jungle hover:underline" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>.
        </p>
        <p>
          For users in the EU/UK, a consent banner will ask for your preferences regarding personalized
          advertising before any such cookies are set.
        </p>

        <h2 className="font-display font-bold text-xl mt-8 mb-2">Third-Party Services</h2>
        <p>
          We use Supabase for database storage and Vercel for hosting. Both providers may process data as part
          of delivering the site to you, governed by their own privacy policies.
        </p>

        <h2 className="font-display font-bold text-xl mt-8 mb-2">Contact</h2>
        <p>
          Questions about this policy? Reach out via the contact details on our GitHub repository.
        </p>
      </div>
    </div>
  );
}