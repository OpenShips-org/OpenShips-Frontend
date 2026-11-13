import Link from "next/link";
import { useState } from "react";

interface NavbarLinkProps {
    href: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    isActive?: boolean;
    dropdownItems?: {
        href: string;
        label: string;
    }[];
}

export default function NavbarLink({ href, icon, children, isActive, dropdownItems }: NavbarLinkProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const hasDropdown = dropdownItems && dropdownItems.length > 0;

    const toggleDropdown = () => {
        if (hasDropdown) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    return (
        <div className="w-full">
            <Link
                href={href}
                className="flex w-full items-center rounded-md px-2 py-2 hover:bg-accent"
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => {
                    if (hasDropdown) {
                        e.preventDefault();
                        toggleDropdown();
                    }
                }}
            >
                {icon}

                <span className="ml-4 whitespace-nowrap md:opacity-0 md:transition-opacity md:duration-150 md:group-hover:opacity-100">
                    {children}
                </span>

                {hasDropdown && (
                    <span className="ml-auto">
                        <svg 
                            className={`size-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                )}
            </Link>

            {hasDropdown && isDropdownOpen && (
                <div className="ml-4 mt-1 space-y-1">
                    {dropdownItems?.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="flex items-center rounded-md px-2 py-2 text-sm hover:bg-accent"
                        >
                            <span className="ml-4">{item.label}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
