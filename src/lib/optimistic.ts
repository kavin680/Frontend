/**
 * Helper to create optimistic update handlers for RTK Query mutations.
 *
 * Optimistic updates immediately reflect changes in the UI before the server responds.
 * If the mutation fails, the cache is rolled back to the previous state.
 *
 * @example
 * ```tsx
 * // In your API endpoint definition:
 * updateUser: builder.mutation<ApiResponse<User>, { id: string; data: Partial<User> }>({
 *   query: ({ id, data }) => ({ url: `/users/${id}`, method: 'PATCH', body: data }),
 *   ...optimisticUpdate({
 *     // Update a list query optimistically
 *     onStart: ({ id, data }, { dispatch }) => {
 *       return dispatch(
 *         usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
 *           const user = draft.data?.find((u) => u.id === id);
 *           if (user) Object.assign(user, data);
 *         })
 *       );
 *     },
 *   }),
 * }),
 *
 * // Delete with optimistic removal:
 * deleteUser: builder.mutation<ApiResponse<void>, string>({
 *   query: (id) => ({ url: `/users/${id}`, method: 'DELETE' }),
 *   ...optimisticUpdate({
 *     onStart: (id, { dispatch }) => {
 *       return dispatch(
 *         usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
 *           if (draft.data) {
 *             draft.data = draft.data.filter((u) => u.id !== id);
 *           }
 *         })
 *       );
 *     },
 *   }),
 * }),
 * ```
 */
export function optimisticUpdate<TArg>({
  onStart,
}: {
  onStart: (
    arg: TArg,
    api: { dispatch: (a: unknown) => { undo: () => void }; queryFulfilled: Promise<unknown> }
  ) => { undo: () => void } | undefined;
}) {
  return {
    async onQueryStarted(
      arg: TArg,
      api: { dispatch: (a: unknown) => { undo: () => void }; queryFulfilled: Promise<unknown> }
    ) {
      const patchResult = onStart(arg, api);
      try {
        await api.queryFulfilled;
      } catch {
        patchResult?.undo();
      }
    },
  };
}

/**
 * Helper for simple list item updates.
 * Patches a single item in a list query by matching on `id`.
 *
 * @example
 * ```tsx
 * updateUser: builder.mutation({
 *   query: ({ id, data }) => ({ url: `/users/${id}`, method: 'PATCH', body: data }),
 *   ...patchListItem(usersApi, 'getUsers', undefined, (arg) => ({
 *     id: arg.id,
 *     changes: arg.data,
 *   })),
 * }),
 * ```
 */
export function patchListItem<
  TApi extends { util: { updateQueryData: (...args: unknown[]) => unknown } },
  TArg,
>(
  api: TApi,
  endpointName: string,
  queryArg: unknown,
  getUpdate: (arg: TArg) => { id: string; changes: Record<string, unknown> }
) {
  return {
    async onQueryStarted(
      arg: TArg,
      { dispatch, queryFulfilled }: { dispatch: (a: unknown) => { undo: () => void }; queryFulfilled: Promise<unknown> }
    ) {
      const { id, changes } = getUpdate(arg);
      const patchResult = dispatch(
        (api.util.updateQueryData as (name: string, arg: unknown, cb: (draft: { data?: Array<Record<string, unknown>> }) => void) => unknown)(
          endpointName,
          queryArg,
          (draft: { data?: Array<Record<string, unknown>> }) => {
            const item = draft.data?.find((i) => i.id === id);
            if (item) Object.assign(item, changes);
          }
        )
      );
      try {
        await queryFulfilled;
      } catch {
        patchResult.undo();
      }
    },
  };
}
