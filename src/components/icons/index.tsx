import { LUCIDE_ICON_MAP, CUSTOM_ICON_MAP } from "./utils";

type LucideIconName = keyof typeof LUCIDE_ICON_MAP;
type CustomIconName = keyof typeof CUSTOM_ICON_MAP
export type IconType = LucideIconName | CustomIconName;

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconType;
}

const Icon = ({ name, ...props }: IconProps) => {
    const LucideComponent = LUCIDE_ICON_MAP[name as LucideIconName];
    const CustomIconComponent = CUSTOM_ICON_MAP[name as CustomIconName];

    if (LucideComponent) return <LucideComponent {...props} />
    if (CustomIconComponent) return <CustomIconComponent {...props} />
    
    return null;
}

export default Icon;