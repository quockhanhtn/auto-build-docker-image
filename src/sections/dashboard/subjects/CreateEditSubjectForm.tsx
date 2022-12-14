// @mui
import { TextField } from '@mui/material';

import { DraggableDialog } from '~/components/dialog';
import { SubjectDto } from '~/services/subjectServices';

export type CreateEditSubjectFormProps = {
  subject: SubjectDto;
  open: boolean;
  onClose: () => void;
  onCreateOrDelete: () => void;
};

export default function CreateEditSubjectForm({
  open,
  onClose,
  subject,
  onCreateOrDelete,
}: CreateEditSubjectFormProps) {
  const renderTitle = (): React.ReactNode => null;
  const renderContent = (): React.ReactNode => null;
  const renderActions = (): React.ReactNode => null;

  return (
    <DraggableDialog
      open={open}
      onClose={onClose}
      aria-labelledby="create-edit-subject-labelled"
      aria-describedby="create-edit-subject-described"
      TitleComponent={{
        children: renderTitle(),
      }}
      ContentComponent={{
        children: renderContent(),
        dividers: true,
      }}
      ActionsComponent={{
        children: renderActions(),
      }}
    />
  );
}
