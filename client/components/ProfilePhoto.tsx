import { useState } from "react";

interface ProfilePhotoProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function ProfilePhoto({ name, size = 'md', className = '' }: ProfilePhotoProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  // Generate a consistent avatar URL based on the name
  const generateAvatarUrl = (name: string) => {
    const encodedName = encodeURIComponent(name);
    // Using DiceBear API for consistent, beautiful avatars
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodedName}&backgroundColor=transparent&clothesColor=3c4043&eyebrowColor=724133&hairColor=724133&hatColor=3c4043&skinColor=f3c7a4,fdb4a6,ee8667,d08b5b,ae5d29&topColor=3c4043`;
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
        src={generateAvatarUrl(name)}
        alt={`${name} profile`}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
