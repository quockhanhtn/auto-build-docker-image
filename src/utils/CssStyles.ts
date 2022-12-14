// @mui
import { alpha } from '@mui/material';

// ----------------------------------------------------------------------

export default class CssStyle {
  static bgBlur(params: { color?: string; blur?: number; opacity?: number }): {
    backdropFilter: string;
    WebkitBackdropFilter: string;
    backgroundColor: string;
  } {
    const color = params?.color || '#000000';
    const blur = params?.blur || 6;
    const opacity = params?.opacity || 0.8;

    return {
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,
      backgroundColor: alpha(color, opacity),
    };
  }

  static bgBlurImage(params: { color?: string; blur?: number; opacity?: number; imgUrl?: string }): {
    position: string;
    backgroundImage: string;
    '&:before': any;
  } {
    const color = params?.color || '#000000';
    const blur = params?.blur || 6;
    const opacity = params?.opacity || 0.8;
    const imgUrl = params?.imgUrl;

    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    };
  }

  // ----------------------------------------------------------------------

  static bgGradient(props: any) {
    const direction = props?.direction || 'to bottom';
    const startColor = props?.startColor;
    const endColor = props?.endColor;
    const imgUrl = props?.imgUrl;
    const color = props?.color;

    if (imgUrl) {
      return {
        background: `linear-gradient(${direction}, ${startColor || color}, ${endColor || color}), url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      };
    }

    return {
      background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
    };
  }

  // ----------------------------------------------------------------------

  static textGradient(value: string) {
    return {
      background: `-webkit-linear-gradient(${value})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    };
  }

  // ----------------------------------------------------------------------

  static filterStyles(value: string) {
    return {
      filter: value,
      WebkitFilter: value,
      MozFilter: value,
    };
  }

  // ----------------------------------------------------------------------

  static hideScrollbarY = {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };

  // ----------------------------------------------------------------------

  static hideScrollbarX = {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
}
