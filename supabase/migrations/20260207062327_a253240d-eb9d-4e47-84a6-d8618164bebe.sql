-- Insert a test application for an existing borrower
INSERT INTO public.applications (borrower_id, company_name, loan_amount, loan_purpose, status)
VALUES 
  ('534ee3fd-b781-47c8-b553-8ffa1b58e90e', 'Acme Tech Solutions', 5000000, 'Working Capital', 'pending'),
  ('534ee3fd-b781-47c8-b553-8ffa1b58e90e', 'Acme Manufacturing', 2500000, 'Equipment Purchase', 'approved');

-- Insert test assessments with risk scores for these applications
INSERT INTO public.assessments (application_id, lender_id, risk_score, risk_category, status, notes)
SELECT 
  a.id,
  '3ca3ab52-1314-418a-83fc-50d337466cfd',
  CASE 
    WHEN a.company_name = 'Acme Tech Solutions' THEN 45
    ELSE 28
  END,
  CASE 
    WHEN a.company_name = 'Acme Tech Solutions' THEN 'medium'
    ELSE 'low'
  END,
  'completed',
  CASE 
    WHEN a.company_name = 'Acme Tech Solutions' THEN 'Moderate risk profile with stable cash flows but elevated debt-to-income ratio.'
    ELSE 'Strong financials with excellent credit history and consistent revenue growth.'
  END
FROM public.applications a
WHERE a.borrower_id = '534ee3fd-b781-47c8-b553-8ffa1b58e90e';