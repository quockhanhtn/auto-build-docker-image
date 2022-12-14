import { useState } from 'react';
import { useModal } from '~/hooks';
import { useSnackbar } from 'notistack';
import { LoadingOverlay } from '~/components/overlay';

import {
  Button,
  Card,
  Checkbox,
  Container,
  IconButton,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import Iconify from '~/components/iconify';
import {
  EerEmptyRows,
  EerTableContainer,
  EerTableHead,
  EerTablePagination,
  EerTablePopover,
  EerTableToolbar,
} from '~/components/table';

import { TableUtils } from '~/utils';

import DashboardLayout from '~/layouts/dashboard/DashboardLayout';
import { NextPageWithLayout } from '~/pages/_app';

import {
  SubjectDto,
  useGetSubjectsQuery,
  useDeleteSubjectMutation,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
} from '~/services/subjectServices';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', padding: 'none' as const },
  { id: 'hidden', label: 'Hidden', padding: 'none' as const },
  { id: 'createdAt', label: 'Created At', align: 'right' as const, padding: 'none' as const },
  { id: 'updatedAt', label: 'Updated At', align: 'right' as const, padding: 'none' as const },
  { id: '_none', label: '' },
];

const DashboardSubjectPage: NextPageWithLayout = () => {
  const { showModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const [openTablePopover, setOpenTablePopover] = useState(null);

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('createdAt');

  const [listSelectedId, setListSelectedId] = useState<Array<string>>([]);
  const [filterName, setFilterName] = useState('');

  const [currentSubject, setCurrentSubject] = useState<Partial<SubjectDto>>({});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [isBusy, setIsBusy] = useState<boolean>(false);

  const { isFetching, data: listSubjects, isError, error } = useGetSubjectsQuery();
  const [createSubject] = useCreateSubjectMutation();
  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();

  const handleOpenMenu = (event: any, id: string) => {
    setOpenTablePopover(event.currentTarget);
    setCurrentSubject(listSubjects?.find((x) => x.id === id) ?? {});
  };

  const handleCloseMenu = () => {
    setOpenTablePopover(null);
  };

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (event.target.checked) {
      const newSelected = listSubjects?.map((n) => n.id) ?? [];
      setListSelectedId(newSelected);
      return;
    }
    setListSelectedId([]);
  };

  const handleClick = (_event: any, id: string) => {
    const selectedIndex = listSelectedId.indexOf(id);
    let newSelected: any = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(listSelectedId, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(listSelectedId.slice(1));
    } else if (selectedIndex === listSelectedId.length - 1) {
      newSelected = newSelected.concat(listSelectedId.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(listSelectedId.slice(0, selectedIndex), listSelectedId.slice(selectedIndex + 1));
    }
    setListSelectedId(newSelected);
  };

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleAddSubject = async (event: any) => {
    const newSubjectName = prompt('Enter subject name', '');
    if (newSubjectName != null) {
      setIsBusy(true);
      try {
        await createSubject({
          name: newSubjectName,
          createdAt: new Date(),
          updatedAt: new Date(),
          hidden: false,
        }).unwrap();
        enqueueSnackbar('Create success !', { variant: 'success', autoHideDuration: 5000 });
      } catch (err) {
        showModal({
          icon: 'error',
          title: 'Create error',
          content: <pre>{JSON.stringify(err, null, 2)}</pre>,
          buttons: [{ label: 'OK' }],
        });
      }
      setIsBusy(false);
    }
  };

  const handleEditSubject = () => {
    if (!currentSubject?.id) {
      return;
    }

    setOpenTablePopover(null);
    alert(`edit ${currentSubject.name}`);
  };

  const handleDeleteSubject = () => {
    if (!currentSubject?.id) {
      return;
    }

    setOpenTablePopover(null);
    showModal({
      title: `DELETE SUBJECT`,
      content: (
        <Typography>
          Are you sure to delete subject "<b>{currentSubject.name}</b>" ?
        </Typography>
      ),
      icon: 'warning',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            setIsBusy(true);
            try {
              await deleteSubject(currentSubject?.id ?? '').unwrap();
              enqueueSnackbar('Delete success !', { variant: 'success', autoHideDuration: 5000 });
            } catch (err) {
              showModal({
                icon: 'error',
                title: 'Delete error',
                content: <pre>{JSON.stringify(err, null, 2)}</pre>,
                buttons: [{ label: 'OK' }],
              });
            }
            setIsBusy(false);
          },
        },
        {
          label: 'No',
          buttonProps: { variant: 'contained' },
        },
      ],
    });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (listSubjects?.length ?? 0)) : 0;

  const filteredUsers = TableUtils.applySortFilter2(listSubjects ?? [], order, orderBy, filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const renderTableBody = (): React.ReactNode => {
    if (isNotFound) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
            <Paper
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" paragraph>
                Not found
              </Typography>

              <Typography variant="body2">
                No results found for &nbsp;
                <strong>&quot;{filterName}&quot;</strong>.
                <br /> Try checking for typos or using complete words.
              </Typography>
            </Paper>
          </TableCell>
        </TableRow>
      );
    }

    return [
      ...filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: SubjectDto) => {
        const { id, name, hidden, createdAt, updatedAt } = row;
        const isSelected = listSelectedId.indexOf(id) !== -1;

        return (
          <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={isSelected}>
            <TableCell padding="checkbox">
              <Checkbox checked={isSelected} onChange={(event) => handleClick(event, id)} />
            </TableCell>

            <TableCell component="th" scope="row" padding="none">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="subtitle2" noWrap>
                  {name}
                </Typography>
              </Stack>
            </TableCell>

            <TableCell align="left" padding="none">
              {hidden ? 'Yes' : 'No'}
            </TableCell>

            <TableCell align="right" padding="none">
              {createdAt}
            </TableCell>

            <TableCell align="right" padding="none">
              {updatedAt}
            </TableCell>

            <TableCell align="right" padding="none">
              <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, id)}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      }),
      <EerEmptyRows key="empty-rows" emptyRows={emptyRows} colSpan={6} cellPadding="none" />,
    ];
  };

  return (
    <>
      <LoadingOverlay active={isBusy || isFetching} />
      <Container disableGutters maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Management Subject
          </Typography>
          <Button variant="contained" onClick={handleAddSubject}>
            New Subject
          </Button>
        </Stack>

        <Card>
          <EerTableToolbar
            numSelected={listSelectedId.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            sx={{
              paddingLeft: (theme) => `${theme.spacing(2)} !important`,
              paddingRight: (theme) => `${theme.spacing(2)} !important`,
            }}
          />

          <EerTableContainer>
            <EerTableHead
              order={order}
              orderBy={orderBy}
              headLabels={TABLE_HEAD}
              rowCount={listSubjects?.length ?? 0}
              numSelected={listSelectedId.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>{renderTableBody()}</TableBody>
          </EerTableContainer>

          <EerTablePagination
            component="div"
            count={listSubjects?.length ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <EerTablePopover
        anchorEl={openTablePopover}
        onClose={handleCloseMenu}
        menuItems={[
          {
            text: 'Edit',
            icon: 'eva:edit-fill',
            onClick: handleEditSubject,
          },
          {
            text: 'Delete',
            icon: 'eva:trash-2-outline',
            color: 'error.main',
            onClick: handleDeleteSubject,
          },
        ]}
      />
    </>
  );
};

DashboardSubjectPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardSubjectPage;
