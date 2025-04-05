import React from 'react';
import { Link } from 'react-router-dom';

export default function ExecutingWill() {
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
        <h1 className="text-4xl font-bold text-[#212529] mb-8">How to Carry Out Your Loved One’s Will: A Step-by-Step Guide</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#212529] mb-4">What Does It Mean to Execute a Will?</h2>
          <p className="text-[#6c757d] mb-4">
            The executor, or estate administrator, is responsible for managing the deceased's assets, settling debts, and distributing property as outlined in the will. This process may require probate, a legal proceeding that validates the will and ensures everything is handled correctly.
          </p>
          <p className="text-[#6c757d]">
            If no will exists, state laws determine how the estate is divided.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Steps to Execute the Will</h2>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Step 1: Locate and File the Will</h3>
              <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                <li>Find the original will and any related estate planning documents</li>
                <li>File the will with the local probate court to begin the legal process</li>
                <li>If probate is required, the court will officially appoint an executor (typically named in the will)</li>
              </ul>
              <p className="text-sm italic text-[#6c757d] mt-2">
                Tip: If you're unsure whether probate is necessary, consult an estate attorney or the local court clerk.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Step 2: Identify and Secure Assets</h3>
              <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                <li>Take inventory of all assets, including bank accounts, real estate, vehicles, investments, and personal belongings</li>
                <li>Ensure property and financial accounts are protected to prevent unauthorized access or misuse</li>
                <li>Keep track of any income the estate receives (such as rental income or dividends)</li>
              </ul>
              <p className="text-sm italic text-[#6c757d] mt-2">
                Tip: Lock valuable items away, notify financial institutions, and inform beneficiaries about the next steps.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Step 3: Notify Creditors & Pay Outstanding Debts</h3>
              <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                <li>Notify banks, credit card companies, and lenders of the death</li>
                <li>Publish a death notice (if required) to alert unknown creditors</li>
                <li>Use estate funds to pay valid debts, including medical bills, loans, and taxes</li>
              </ul>
              <p className="text-sm italic text-[#6c757d] mt-2">
                Note: You are not personally responsible for debts unless you co-signed on a loan or credit card.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Step 4: Distribute Assets to Beneficiaries</h3>
              <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                <li>Follow the instructions in the will to transfer property and funds to heirs</li>
                <li>If probate is required, wait for the court to approve distributions</li>
                <li>Ensure all legal requirements, including tax filings, are met before finalizing transfers</li>
              </ul>
              <p className="text-sm italic text-[#6c757d] mt-2">
                Tip: Some assets, like life insurance or retirement accounts, pass directly to named beneficiaries and do not go through probate.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Step 5: Handle Probate Disputes (If Necessary)</h3>
              <p className="text-[#6c757d] mb-4">
                If someone contests the will, claiming it is invalid or unfair, probate litigation may occur. Common disputes include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                <li>Allegations of undue influence or fraud</li>
                <li>Concerns about the deceased's mental state when drafting the will</li>
                <li>Conflicts between heirs over asset distribution</li>
              </ul>
              <p className="text-sm italic text-[#6c757d] mt-2">
                Tip: If a dispute arises, consult an estate attorney to protect the estate's integrity and ensure a fair resolution.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[#6266ea] mb-4">Step 6: Finalize the Estate & Close Accounts</h3>
              <ul className="list-disc pl-6 space-y-2 text-[#6c757d]">
                <li>File any final tax returns required for the estate</li>
                <li>Obtain court approval (if applicable) to officially close the estate</li>
                <li>Provide final accounting to the court and distribute remaining funds</li>
              </ul>
              <p className="text-[#6c757d] mt-4">
                Once these steps are complete, the executor's duties are fulfilled, and the estate is officially closed.
              </p>
            </section>
          </div>
        </div>

        <div className="bg-[#6266ea]/5 border border-[#6266ea]/10 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-[#212529] mb-6">Additional Support</h2>
          <p className="text-[#6c757d] mb-4">
            The will execution process can be complicated, but you don't have to handle it alone. Consider seeking help from:
          </p>
          <ul className="list-disc pl-6 space-y-4 text-[#6c757d]">
            <li>
              <span className="font-medium text-[#212529]">An estate attorney</span>
              <p className="mt-1">For legal guidance on probate, disputes, and tax matters</p>
            </li>
            <li>
              <span className="font-medium text-[#212529]">A financial advisor</span>
              <p className="mt-1">To ensure assets are managed and distributed properly</p>
            </li>
            <li>
              <span className="font-medium text-[#212529]">A probate court clerk</span>
              <p className="mt-1">For information on local probate requirements</p>
            </li>
          </ul>
          <p className="text-[#6c757d] mt-6">
            Handling a loved one's estate is a difficult responsibility, but by following these steps, you can ensure their final wishes are honored while bringing closure to the process.
          </p>
        </div>
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