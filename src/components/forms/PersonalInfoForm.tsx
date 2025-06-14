
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PersonalInfo } from '@/types/cv';

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onChange: (personalInfo: PersonalInfo) => void;
}

export const PersonalInfoForm = ({ personalInfo, onChange }: PersonalInfoFormProps) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...personalInfo, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={personalInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="City, State, Country"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <Label htmlFor="website">Website/Portfolio</Label>
          <Input
            id="website"
            value={personalInfo.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="www.johndoe.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={personalInfo.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Brief description of your professional background and goals..."
          rows={4}
        />
      </div>
    </div>
  );
};
