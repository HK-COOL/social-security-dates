import { ComponentType, lazy, Suspense } from 'react';
import {
  BadgeDollarSign,
  Building2,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CalendarRange,
  CircleHelp,
  Clock,
  ExternalLink,
  FileText,
  HelpCircle,
  ListChecks,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react';

const iconCache: { [key: string]: ComponentType<any> } = {};
const lucideIcons: Record<string, ComponentType<any>> = {
  BadgeDollarSign,
  Building2,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CalendarRange,
  CircleHelp,
  Clock,
  ExternalLink,
  FileText,
  HelpCircle,
  ListChecks,
  LockKeyhole,
  Mail,
  ShieldCheck,
};

// Function to automatically detect icon library
function detectIconLibrary(name: string): 'ri' | 'lucide' {
  if (name && name.startsWith('Ri')) {
    return 'ri';
  }

  return 'lucide';
}

export function SmartIcon({
  name,
  size = 24,
  className,
  ...props
}: {
  name: string;
  size?: number;
  className?: string;
  [key: string]: any;
}) {
  const library = detectIconLibrary(name);
  const cacheKey = `${library}-${name}`;

  if (!iconCache[cacheKey]) {
    if (library === 'ri') {
      // React Icons (Remix Icons)
      iconCache[cacheKey] = lazy(async () => {
        try {
          const module = await import('react-icons/ri');
          const IconComponent = module[name as keyof typeof module];
          if (IconComponent) {
            return { default: IconComponent as ComponentType<any> };
          } else {
            console.warn(
              `Icon "${name}" not found in react-icons/ri, using fallback`
            );
            return { default: module.RiQuestionLine as ComponentType<any> };
          }
        } catch (error) {
          console.error(`Failed to load react-icons/ri:`, error);
          const fallbackModule = await import('react-icons/ri');
          return {
            default: fallbackModule.RiQuestionLine as ComponentType<any>,
          };
        }
      });
    } else {
      iconCache[cacheKey] = lucideIcons[name] || HelpCircle;
    }
  }

  const IconComponent = iconCache[cacheKey];

  return (
    <Suspense fallback={<div style={{ width: size, height: size }} />}>
      <IconComponent size={size} className={className} {...props} />
    </Suspense>
  );
}
