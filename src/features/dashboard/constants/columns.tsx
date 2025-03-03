import { Column } from '@/features/dashboard/components/DataTable';
import { Course } from '@/models/course';
import moment from 'moment';

export const courseColumns: Column<Course>[] = [
  {
    header: 'ID',
    accessor: 'id',
  },
  {
    header: 'Course Name',
    accessor: 'name',
  },
  {
    header: 'Instructor',
    render: (row) => <>{row?.instructor?.name}</>,
  },
  {
    header: 'Category',
    render: (row) => <>{row?.category?.name}</>,
  },
  {
    header: 'Price ($)',
    accessor: 'price',
  },
  {
    header: 'Duration (hrs)',
    accessor: 'duration',
  },
  {
    header: 'Rating',
    accessor: 'rating',
  },
  {
    header: 'Created At',
    render: (row) => (
      <>
        {row?.category?.created_at
          ? moment(row?.category?.created_at).format('DD/MM/YYYY')
          : 'N/A'}
      </>
    ),
  },
  {
    header: 'Last Updated',
    render: (row) => (
      <>
        {row?.category?.updated_at
          ? moment(row?.category?.updated_at).format('DD/MM/YYYY')
          : 'N/A'}
      </>
    ),
  },
  {
    header: 'Status',
    render: (row) => <>{row?.deleted_at ? 'Inactive' : 'Active'}</>,
  },
  {
    header: 'Actions',
    isAction: true,
  },
];
