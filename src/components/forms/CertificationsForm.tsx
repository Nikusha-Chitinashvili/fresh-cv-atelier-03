
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Certification } from '@/types/cv';
import { Plus, Trash2, GripVertical, ExternalLink } from 'lucide-react';

interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export const CertificationsForm = ({ certifications, onChange }: CertificationsFormProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      link: ''
    };
    onChange([...certifications, newCertification]);
    setExpandedItem(newCertification.id);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange(certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const removeCertification = (id: string) => {
    onChange(certifications.filter(cert => cert.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Certifications</h3>
        <Button onClick={addCertification} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </div>

      {certifications.map((cert, index) => (
        <Card key={cert.id} className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{cert.name || `Certification ${index + 1}`}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExpandedItem(expandedItem === cert.id ? null : cert.id)}
              >
                {expandedItem === cert.id ? 'Collapse' : 'Expand'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeCertification(cert.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {expandedItem === cert.id && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Certification Name *</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
                <div>
                  <Label>Issuing Organization *</Label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    placeholder="Amazon Web Services"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Issue Date</Label>
                  <Input
                    type="month"
                    value={cert.date}
                    onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Expiry Date (Optional)</Label>
                  <Input
                    type="month"
                    value={cert.expiryDate}
                    onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Credential ID (Optional)</Label>
                  <Input
                    value={cert.credentialId}
                    onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                    placeholder="ABC123XYZ"
                  />
                </div>
                <div>
                  <Label>Verification URL (Optional)</Label>
                  <div className="relative">
                    <Input
                      value={cert.link}
                      onChange={(e) => updateCertification(cert.id, 'link', e.target.value)}
                      placeholder="https://credentials.example.com/verify"
                    />
                    <ExternalLink className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      ))}

      {certifications.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No certifications added yet.</p>
          <Button onClick={addCertification} className="mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Certification
          </Button>
        </div>
      )}
    </div>
  );
};
