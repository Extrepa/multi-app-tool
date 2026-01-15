/**
 * Errl Club Design System - TypeScript Definitions
 * 
 * Comprehensive design tokens extracted from the Errl Club project.
 * Use this as a reference for implementing the design system in any project.
 */

export interface DesignSystemColors {
    // Core Colors
    background: string;
    border: string;
    text: string;
    accent: string;
    title: string;
    
    // Interactive States
    hover: string;
    pressed: string;
    disabled: string;
    focus: string;
    
    // Status Colors
    success: string;
    error: string;
    warning: string;
    info: string;
    
    // Special Effects
    glow: {
        white: string;
        cyan: string;
        green: string;
        magenta: string;
    };
}

export interface DesignSystemSpacing {
    padding: string;
    margin: string;
    gap: string;
    titlePaddingBottom: string;
    
    // Component-specific spacing
    buttonPadding: string;
    inputPadding: string;
    panelPadding: string;
}

export interface DesignSystemTypography {
    fontFamily: string;
    titleSize: string;
    titleWeight: string;
    
    // Font Sizes
    fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
    };
    
    // Font Weights
    fontWeight: {
        normal: string;
        medium: string;
        bold: string;
    };
    
    // Line Heights
    lineHeight: {
        tight: string;
        normal: string;
        relaxed: string;
    };
}

export interface DesignSystemBorders {
    width: string;
    radius: string;
    titleBorderBottom: string;
    
    // Border styles
    style: {
        solid: string;
        dashed: string;
    };
}

export interface DesignSystemShadows {
    panel: string;
    button: string;
    text: string;
    glow: {
        white: string;
        cyan: string;
        green: string;
        magenta: string;
    };
}

export interface DesignSystemAnimations {
    duration: {
        fast: string;
        normal: string;
        slow: string;
    };
    easing: {
        ease: string;
        easeIn: string;
        easeOut: string;
        easeInOut: string;
    };
}

export interface DesignSystemGradients {
    background: string[];
    progress: string[];
}

export interface DesignSystem {
    colors: DesignSystemColors;
    spacing: DesignSystemSpacing;
    typography: DesignSystemTypography;
    borders: DesignSystemBorders;
    shadows: DesignSystemShadows;
    animations: DesignSystemAnimations;
    gradients: DesignSystemGradients;
}

/**
 * Complete Design System Configuration
 */
export const DESIGN_SYSTEM: DesignSystem = {
    colors: {
        // Core Colors
        background: 'rgba(20, 20, 20, 0.9)',
        border: '#00ffff',
        text: '#ffffff',
        accent: '#00ffff',
        title: '#00ffff',
        
        // Interactive States
        hover: '#00ff00',
        pressed: '#222222',
        disabled: '#666666',
        focus: '#00ff00',
        
        // Status Colors
        success: '#00ff00',
        error: '#ff0000',
        warning: '#ffaa00',
        info: '#00ffff',
        
        // Special Effects
        glow: {
            white: 'rgba(255, 255, 255, 0.8)',
            cyan: 'rgba(0, 255, 255, 0.8)',
            green: 'rgba(0, 255, 0, 0.8)',
            magenta: 'rgba(255, 0, 255, 0.8)',
        },
    },
    
    spacing: {
        padding: '16px',
        margin: '12px',
        gap: '8px',
        titlePaddingBottom: '8px',
        buttonPadding: '10px 20px',
        inputPadding: '8px 12px',
        panelPadding: '16px',
    },
    
    typography: {
        fontFamily: 'Arial, sans-serif',
        titleSize: '18px',
        titleWeight: 'bold',
        
        fontSize: {
            xs: '12px',
            sm: '14px',
            base: '16px',
            lg: '18px',
            xl: '20px',
            '2xl': '24px',
            '3xl': '3rem',
        },
        
        fontWeight: {
            normal: 'normal',
            medium: '500',
            bold: 'bold',
        },
        
        lineHeight: {
            tight: '1.2',
            normal: '1.5',
            relaxed: '1.8',
        },
    },
    
    borders: {
        width: '2px',
        radius: '8px',
        titleBorderBottom: '1px solid #00ffff',
        
        style: {
            solid: 'solid',
            dashed: 'dashed',
        },
    },
    
    shadows: {
        panel: '0 4px 20px rgba(0, 255, 255, 0.3)',
        button: '0 0 20px rgba(0, 255, 255, 0.8)',
        text: '0 0 10px rgba(255, 255, 255, 0.5)',
        glow: {
            white: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2)',
            cyan: '0 0 10px rgba(0, 255, 255, 0.8)',
            green: '0 0 10px rgba(0, 255, 0, 0.8)',
            magenta: '0 0 10px rgba(255, 0, 255, 0.8)',
        },
    },
    
    animations: {
        duration: {
            fast: '0.2s',
            normal: '0.3s',
            slow: '1s',
        },
        easing: {
            ease: 'ease',
            easeIn: 'ease-in',
            easeOut: 'ease-out',
            easeInOut: 'ease-in-out',
        },
    },
    
    gradients: {
        background: [
            '#667eea',
            '#764ba2',
            '#f093fb',
            '#4facfe',
            '#00f2fe',
        ],
        progress: [
            '#ff00ff',
            '#ff88ff',
        ],
    },
};

/**
 * Helper function to convert camelCase to kebab-case
 */
export function camelToKebab(str: string): string {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * Generate panel styles using design system constants
 */
export function generatePanelStyles(overrides: Partial<CSSStyleDeclaration> = {}): string {
    const styles: Record<string, string> = {
        background: DESIGN_SYSTEM.colors.background,
        border: `${DESIGN_SYSTEM.borders.width} solid ${DESIGN_SYSTEM.colors.border}`,
        borderRadius: DESIGN_SYSTEM.borders.radius,
        padding: DESIGN_SYSTEM.spacing.padding,
        color: DESIGN_SYSTEM.colors.text,
        fontFamily: DESIGN_SYSTEM.typography.fontFamily,
        boxShadow: DESIGN_SYSTEM.shadows.panel,
        ...overrides as Record<string, string>,
    };

    return Object.entries(styles)
        .map(([key, value]) => `${camelToKebab(key)}: ${value};`)
        .join(' ');
}

/**
 * Generate title styles using design system constants
 */
export function generateTitleStyles(overrides: Partial<CSSStyleDeclaration> = {}): string {
    const styles: Record<string, string> = {
        fontSize: DESIGN_SYSTEM.typography.titleSize,
        fontWeight: DESIGN_SYSTEM.typography.titleWeight,
        color: DESIGN_SYSTEM.colors.title,
        borderBottom: DESIGN_SYSTEM.borders.titleBorderBottom,
        paddingBottom: DESIGN_SYSTEM.spacing.titlePaddingBottom,
        marginBottom: DESIGN_SYSTEM.spacing.margin,
        ...overrides as Record<string, string>,
    };

    return Object.entries(styles)
        .map(([key, value]) => `${camelToKebab(key)}: ${value};`)
        .join(' ');
}

/**
 * Button state styles
 */
export const BUTTON_STATES = {
    normal: {
        background: '#333333',
        borderColor: DESIGN_SYSTEM.colors.border,
        transform: 'scale(1)',
    },
    hover: {
        background: '#444444',
        borderColor: DESIGN_SYSTEM.colors.hover,
        transform: 'scale(1.05)',
    },
    pressed: {
        background: '#222222',
        borderColor: DESIGN_SYSTEM.colors.border,
        transform: 'scale(0.95)',
    },
    disabled: {
        background: '#1a1a1a',
        borderColor: DESIGN_SYSTEM.colors.disabled,
        color: DESIGN_SYSTEM.colors.disabled,
        cursor: 'not-allowed',
        transform: 'scale(1)',
    },
} as const;

/**
 * Modal size presets
 */
export const MODAL_SIZES = {
    small: { width: 400, height: 300 },
    medium: { width: 600, height: 400 },
    large: { width: 800, height: 600 },
} as const;
