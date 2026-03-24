import { colors } from "./colors";
import { typography } from "./typography";
import { spacing, containerSizes } from "./spacing";
import { shadows } from "./shadows";
import { animations } from "./animations";

export const theme = {
    colors,
    typography,
    spacing,
    containerSizes,
    shadows,
    animations,
} as const;

export * from "./colors";
export * from "./typography";
export * from "./spacing";
export * from "./shadows";
export * from "./animations";