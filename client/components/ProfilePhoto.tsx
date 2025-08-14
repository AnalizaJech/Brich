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

  // Generate a consistent realistic photo URL based on the name
  const generateAvatarUrl = (name: string) => {
    // Create a seed based on the name to ensure consistency
    const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Use specific photo IDs that show faces from Lorem Picsum
    const facePhotoIds = [
      91, 177, 211, 287, 342, 399, 407, 494,
      548, 554, 593, 659, 661, 665, 683, 714,
      790, 823, 836, 856, 883, 885, 886, 887
    ];

    const photoId = facePhotoIds[seed % facePhotoIds.length];
    const size = 200; // Size for good quality

    // Using Lorem Picsum with specific face photo IDs
    return `https://picsum.photos/id/${photoId}/${size}/${size}`;
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
