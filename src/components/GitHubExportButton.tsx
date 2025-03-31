
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface GitHubExportButtonProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    githubPush: 'Push to GitHub',
    explanation: 'Generate System Explanation',
    title: 'System Explanation',
    description: 'Here is a detailed explanation of how the Indian Mall Management System works.',
    close: 'Close',
    exportSuccess: 'System explanation generated successfully!',
    downloadExplanation: 'Download Explanation',
  },
  hi: {
    githubPush: 'GitHub पर पुश करें',
    explanation: 'सिस्टम व्याख्या उत्पन्न करें',
    title: 'सिस्टम व्याख्या',
    description: 'यहां भारतीय मॉल प्रबंधन प्रणाली के काम करने का विस्तृत विवरण है।',
    close: 'बंद करें',
    exportSuccess: 'सिस्टम व्याख्या सफलतापूर्वक उत्पन्न की गई!',
    downloadExplanation: 'व्याख्या डाउनलोड करें',
  },
};

const systemExplanation = `
# Indian Mall Management System Overview

## Core Architecture

The Indian Mall Management System is a comprehensive React-based web application designed specifically for managing Indian shopping malls. It follows a modular architecture with the following key components:

### 1. Dashboard Module
- Real-time analytics of mall performance
- KPI tracking for revenue, visitors, and store performance
- Customized reporting with Indian Rupee (₹) formatting

### 2. Admin Module
- Tenant management with Indian-specific data fields (GSTIN, PAN, Aadhaar)
- Role-based access control for mall staff
- Compliance reporting for GST and other Indian regulatory requirements

### 3. Sales Module
- Transaction tracking with GST calculation
- Sales analytics by store, category, and time period
- Discount and promotion management

### 4. Inventory Module
- Stock management across mall stores
- Low inventory alerts
- Barcode integration

### 5. Payment Module
- Integration with Indian payment gateways (Razorpay, Paytm, PhonePe)
- Invoice generation with GST compliance
- Payment settlement tracking

### 6. Issue Management Module
- Ticket system for maintenance and customer complaints
- Issue prioritization and assignment
- Resolution tracking

## Technical Implementation

### Frontend
- React with TypeScript for type safety
- Tailwind CSS for responsive design
- React Router for navigation
- Recharts for data visualization

### Localization
- Dual language support (English and Hindi)
- Currency formatting in Indian Rupee (₹)
- Date formatting according to Indian standards

### Data Management
- Real-time data updates
- Secure authentication and authorization
- Data validation with Indian-specific rules

## Deployment Instructions

1. Clone the repository from GitHub
2. Install dependencies with \`npm install\`
3. Configure environment variables for API endpoints
4. Run development server with \`npm run dev\`
5. Build production version with \`npm run build\`

## Integration Points

- Connect to backend API for data persistence
- Set up payment gateway credentials (Razorpay, Paytm)
- Configure GST calculation based on current tax rates

## Indian-Specific Features

- GST compliance with automated tax calculation
- Support for Indian payment methods
- Indian address format validation
- PAN, Aadhaar, and GSTIN validation
- Multilingual support with Hindi interface

## Security Considerations

- Data protection compliant with Indian IT Act
- Secure handling of financial information
- Role-based access control
- Audit logging for all critical operations

This system is designed to be easily extendable and customizable to meet the specific needs of different malls across India.
`;

const GitHubExportButton: React.FC<GitHubExportButtonProps> = ({ language }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const t = translations[language];

  const pushToGitHub = () => {
    // This would typically call a backend API to handle GitHub operations
    // For now, show a toast notification
    toast({
      title: language === 'en' ? 'GitHub Integration' : 'GitHub एकीकरण',
      description: language === 'en' 
        ? 'This would push the code to GitHub in a real implementation.' 
        : 'वास्तविक कार्यान्वयन में यह कोड को GitHub पर पुश करेगा।',
    });
  };

  const downloadExplanation = () => {
    const blob = new Blob([systemExplanation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mall-management-system-explanation.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: t.exportSuccess,
      description: language === 'en' 
        ? 'You can now view or share the system explanation.' 
        : 'अब आप सिस्टम व्याख्या देख या साझा कर सकते हैं।',
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={pushToGitHub} className="bg-[#24292F] hover:bg-[#24292F]/90">
          <Github className="mr-2 h-4 w-4" />
          {t.githubPush}
        </Button>
        <Button onClick={() => setDialogOpen(true)} variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          {t.explanation}
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.title}</DialogTitle>
            <DialogDescription>{t.description}</DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 p-4 bg-muted/50 rounded-md overflow-auto">
            <pre className="whitespace-pre-wrap text-sm">{systemExplanation}</pre>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              {t.close}
            </Button>
            <Button onClick={downloadExplanation}>
              <FileText className="mr-2 h-4 w-4" />
              {t.downloadExplanation}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GitHubExportButton;
