import React from 'react';
import { Link } from 'react-router-dom';

interface SEOInternalLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
  prefetch?: boolean;
}

const SEOInternalLink: React.FC<SEOInternalLinkProps> = ({
  to,
  children,
  className = '',
  title,
  onClick,
  prefetch = true
}) => {
  return (
    <Link
      to={to}
      className={className}
      title={title}
      onClick={onClick}
      prefetch={prefetch ? 'intent' : undefined}
      aria-label={title}
    >
      {children}
    </Link>
  );
};

export default SEOInternalLink; 