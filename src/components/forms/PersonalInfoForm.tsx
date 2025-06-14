import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PersonalInfo } from '@/types/cv';
import { Upload, X } from 'lucide-react';
import { useRef } from 'react';

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onChange: (personalInfo: PersonalInfo) => void;
}

export const PersonalInfoForm = ({ personalInfo, onChange }: PersonalInfoFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...personalInfo, [field]: value });
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleChange('profilePicture', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    handleChange('profilePicture', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {personalInfo.profilePicture ? (
            <div className="relative">
              <img
                src={personalInfo.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                onClick={removeProfilePicture}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <Upload className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            className="hidden"
            id="profile-picture"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>{personalInfo.profilePicture ? 'Change Photo' : 'Upload Photo'}</span>
          </Button>
        </div>
      </div>

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
