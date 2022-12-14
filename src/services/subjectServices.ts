import { RtkTagCons } from '~/constants';
import api from './api';

export type SubjectDto = {
  id: string;
  name: string;
  hidden: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const resource = 'subjects';
const tag = RtkTagCons.subjects;

const subjectServices = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query<SubjectDto[], void>({
      query: () => `${resource}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: tag, id })), { type: tag, id: 'LIST' }]
          : [{ type: tag, id: 'LIST' }],
    }),
    createSubject: builder.mutation<SubjectDto, Partial<SubjectDto>>({
      query: (body) => ({
        url: `${resource}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: tag, id: 'LIST' }],
    }),
    updateSubject: builder.mutation<SubjectDto, Pick<SubjectDto, 'id'> & Partial<SubjectDto>>({
      query: ({ id, ...patch }) => ({
        url: `${resource}/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: tag, id }],
    }),
    deleteSubject: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `${resource}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: tag, id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetSubjectsQuery, useCreateSubjectMutation, useUpdateSubjectMutation, useDeleteSubjectMutation } =
  subjectServices;

// Export endpoints for use in SSR
export const { getSubjects } = subjectServices.endpoints;

export default subjectServices;
