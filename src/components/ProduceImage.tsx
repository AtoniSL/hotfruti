import React, { useState } from 'react';

interface ProduceImageProps {
  src: string;
  alt: string;
  fallbackEmoji: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}

export const ProduceImage: React.FC<ProduceImageProps> = ({
  src,
  alt,
  fallbackEmoji,
  className = '',
  imgClassName = '',
  eager = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-[var(--color-cream)] text-4xl select-none ${className}`}
      >
        {fallbackEmoji}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[var(--color-cream)] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
};
