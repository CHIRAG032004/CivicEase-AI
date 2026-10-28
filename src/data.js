export const CATEGORIES = ['Water leakage', 'Garbage', 'Road damage', 'Streetlights', 'Drainage', 'Other'];
export const STATUSES = ['Submitted (demo)', 'Under Review (demo)', 'In Progress (demo)', 'Resolved (demo)'];
// verified: true = typically an official step; false = commonly asked, confirm with the issuing office.
export const PROCESSES = {
  'Higher Education Scholarship': [
    { t: 'Register on the official scholarship portal', verified: true },
    { t: 'Fill the online application form', verified: true },
    { t: 'Upload passport-size photograph and signature', verified: true },
    { t: 'Attach previous year marksheet', verified: true },
    { t: 'Income certificate from competent authority', verified: true },
    { t: 'Caste / category certificate (if applicable)', verified: false },
    { t: 'Bank passbook first page with IFSC', verified: false },
    { t: 'Institute verification of the submitted application', verified: true },
    { t: 'Keep the acknowledgement slip', verified: false }
  ],
  'Senior Citizen Pension': [
    { t: 'Proof of age (birth certificate, school record or Aadhaar)', verified: true },
    { t: 'Proof of residence in the state', verified: true },
    { t: 'Income or BPL certificate', verified: true },
    { t: 'Bank account linked to Aadhaar', verified: false },
    { t: 'Two recent passport-size photographs', verified: false },
    { t: 'Submit form at the block / ward office', verified: true },
    { t: 'Field verification by the department', verified: false }
  ],
  'Water Connection Application': [
    { t: 'Application form from the water board / municipality', verified: true },
    { t: 'Proof of ownership or tenancy agreement', verified: true },
    { t: 'Government photo ID of applicant', verified: true },
    { t: 'Latest property tax receipt', verified: false },
    { t: 'Site plan or no-objection certificate', verified: false },
    { t: 'Pay the connection fee and keep the receipt', verified: true },
    { t: 'Site inspection by the department', verified: false }
  ]
};
export const SAMPLE_NOTICE = `Notice: Applications are invited for the State Merit Scholarship 2026-27. Students must be residents of the state and have scored at least 75% in the previous examination. Annual family income should not exceed Rs. 3,00,000. Last date to apply online is 15/12/2026. Applicants must upload the income certificate, Aadhaar card, bank passbook and latest marksheet. Candidates should register on the scholarship portal and submit the form before the deadline. Incomplete applications will be rejected.`;
