import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeCare() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link 
          to="/checklist" 
          className="text-[#6266ea] hover:text-[#4232c2] flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Checklist
        </Link>
      </div>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-[#212529] mb-8">Securing and Managing Your Loved One's Home</h1>
        
        <p className="text-[#6c757d] mb-8">
          If your loved one lived alone, securing their home is an important step in settling their affairs. Taking action early can help prevent security risks, property damage, and missed bills while allowing time for thoughtful decisions about the home's future.
        </p>

        <h2 className="text-2xl font-semibold text-[#212529] mt-12 mb-6">Steps to Secure the Home</h2>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">1. Lock & Secure the Property</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Ensure all doors, windows, and gates are locked.</li>
              <li>Collect spare keys from family, friends, or neighbors.</li>
              <li>If necessary, change the locks to prevent unauthorized access.</li>
              <li>Notify a trusted neighbor or local authorities if the home will be vacant.</li>
              <li>Remove valuables if the home will be empty for an extended time.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">2. Notify Key Contacts</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Inform the homeowner's insurance provider to keep the policy active.</li>
              <li>Notify family members, neighbors, or a property manager about who will check on the home.</li>
              <li>If the deceased was renting, contact the landlord to discuss lease termination or next steps.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">3. Manage Mail & Deliveries</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Forward mail through <strong>USPS Mail Forwarding</strong> to prevent buildup.</li>
              <li>Cancel subscriptions (newspapers, magazines, meal kits, etc.).</li>
              <li>Regularly check the mailbox for important documents or bills.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">4. Maintain Utilities & Property Upkeep</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Keep electricity, water, and heat on if needed to prevent weather-related damage.</li>
              <li>Arrange for yard care, snow removal, or general maintenance to keep the home looking occupied.</li>
              <li>Ensure trash and recycling services continue or are paused if the home will remain vacant.</li>
              <li>Address any urgent repairs (e.g., leaks, plumbing, pest control) to prevent damage.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#6266ea] mb-4">5. Consider Home Security</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
              <li>Use timers for lights to make the home appear lived in.</li>
              <li>Check or install a security system if needed.</li>
              <li>If the home has smart locks or cameras, ensure they are monitored or disconnected.</li>
            </ul>
          </section>
        </div>

        <section className="mt-12 bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Planning for the Home's Future</h2>
          <p className="text-[#6c757d] mb-4">
            Once the home is secure, decisions will need to be made about its long-term future:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
            <li><strong>Mortgage or Rent Payments</strong> – Determine if there is an active mortgage or lease and arrange payments if needed.</li>
            <li><strong>Estate Executor's Role</strong> – If the home is part of the estate, the executor should review legal documents regarding ownership and responsibilities.</li>
            <li><strong>Selling or Transferring Ownership</strong> – If the home will be sold or inherited, consult with a real estate professional or attorney for guidance.</li>
          </ul>
        </section>

        <p className="text-[#6c757d] mt-8">
          Taking these steps ensures your loved one's home is protected, prevents unnecessary stress, and allows time for careful decisions. If you need guidance, consider speaking with a real estate attorney, estate planner, or property manager.
        </p>
      </article>

      <div className="mt-12 flex justify-between items-center">
        <Link 
          to="/checklist" 
          className="text-[#6266ea] hover:text-[#4232c2] flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Checklist
        </Link>
      </div>
    </div>
  );
} 