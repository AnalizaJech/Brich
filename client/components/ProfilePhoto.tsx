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

    // Use Picsum Photos with a specific ID based on the name seed
    // This gives us realistic photos of people
    const photoId = 200 + (seed % 800); // Range 200-999 for varied photos

    // Determine gender preference based on name (simple heuristic)
    const femaleNames = ['Maria', 'Sofia', 'Lucia', 'Ana', 'Carmen', 'Elena', 'Isabel', 'Paula'];
    const isFemale = femaleNames.includes(name);

    // Using This Person Does Not Exist API for ultra-realistic fake people
    // Fallback to Lorem Picsum with face filter
    return `https://thispersondoesnotexist.com/image?${seed}`;
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
