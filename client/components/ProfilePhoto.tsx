import { useState } from "react";

interface ProfilePhotoProps {
  name: string;
  gender?: 'male' | 'female';
  personalityType?: 'blue' | 'amber' | 'red';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function ProfilePhoto({ name, gender = 'female', personalityType = 'blue', size = 'md', className = '' }: ProfilePhotoProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  // Generate attractive photos based on personality type and gender
  const generateAvatarUrl = (name: string, gender: string, personalityType: string) => {
    const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Use RandomUser.me API for real, attractive photos
    // Different nationalities and styles based on personality type
    const nationalityMap = {
      blue: ['us', 'ca', 'gb'], // Professional, serious looking
      amber: ['au', 'nl', 'dk'], // Adventurous, fun looking
      red: ['es', 'it', 'br'] // Passionate, attractive looking
    };

    const nationalities = nationalityMap[personalityType as keyof typeof nationalityMap] || ['us'];
    const nationality = nationalities[seed % nationalities.length];

    // Use a consistent seed for the same person
    const seedValue = `${name}-${gender}-${personalityType}`;

    return `https://randomuser.me/api/portraits/${gender === 'male' ? 'men' : 'women'}/${(seed % 99) + 1}.jpg`;
  };

  const fallbackInitial = name.charAt(0).toUpperCase();

  if (imageError) {
    return (
      <div className={`${sizeClasses[size]} ${className} rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center`}>
        <span className="text-white font-bold text-sm">
          {fallbackInitial}
        </span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${className} rounded-full overflow-hidden bg-white/10`}>
      <img
        src={generateAvatarUrl(name, gender, personalityType)}
        alt={`${name} profile`}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
