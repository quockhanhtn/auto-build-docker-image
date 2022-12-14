import MuiAutocomplete from './MuiAutocomplete';
import MuiBackdrop from './MuiBackdrop';
import MuiButton from './MuiButton';
import MuiCard from './MuiCard';
import MuiCheckbox from './MuiCheckbox';
import MuiInput from './MuiInput';
import MuiLink from './MuiLink';
import MuiPaper from './MuiPaper';
import MuiTable from './MuiTable';
import MuiTooltip from './MuiTooltip';
import MuiTypography from './MuiTypography';

export default function ComponentsOverrides(theme: any) {
  return Object.assign(
    MuiAutocomplete(theme),
    MuiBackdrop(theme),
    MuiButton(theme),
    MuiCard(theme),
    MuiCheckbox(theme),
    MuiInput(theme),
    MuiLink(theme),
    MuiPaper(theme),
    MuiTable(theme),
    MuiTooltip(theme),
    MuiTypography(theme),
  );
}
