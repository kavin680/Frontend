import { apiSlice } from '../api';
import type { ApiResponse, PaginatedResponse, QueryParams } from '@/types/api';
import type { User } from '@/types/auth';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedResponse<User>, QueryParams | void>({
      query: (params) => ({
        url: '/users',
        params: params ?? undefined,
      }),
      providesTags: ['Users'],
    }),
    getUser: builder.query<ApiResponse<User>, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
    createUser: builder.mutation<ApiResponse<User>, Partial<User>>({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<ApiResponse<User>, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
      // Optimistic update: reflect changes immediately, rollback on failure
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
            const user = draft.data?.find((u: User) => u.id === id);
            if (user) Object.assign(user, data);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'User', id },
        'Users',
      ],
    }),
    deleteUser: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      // Optimistic delete: remove from list immediately, rollback on failure
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
            if (draft.data) {
              const idx = draft.data.findIndex((u: User) => u.id === id);
              if (idx !== -1) draft.data.splice(idx, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
