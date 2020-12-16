import {
  ApolloCache,
  useApolloClient,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useCallback, useMemo, useRef } from "react";
import {
  DailyReportSpecialOccurrencesQuery,
  DailyReportSpecialOccurrencesQueryVariables,
  getSpecialOccurrences,
  OrderDirection,
} from "../api/getSpecialOccurrences";
import {
  DailyReportDeleteSpecialOccurrenceMutation,
  DailyReportDeleteSpecialOccurrenceMutationVariables,
  deleteSpecialOccurrence,
} from "../api/deleteSpecialOccurrence";
import {
  createSpecialOccurrenceMutation,
  DailyReportCreateSpecialOccurrenceMutation,
  DailyReportCreateSpecialOccurrenceMutationVariables,
} from "../api/createSpecialOccurrence";
import {
  DailyReportUpdateSpecialOccurrenceMutation,
  DailyReportUpdateSpecialOccurrenceMutationVariables,
  updateSpecialOccurrence,
} from "../api/updateSpecialOccurrence";
import { debounce } from "@material-ui/core";
import { generateOccurrence, updateOccurenciesData } from "../helpers";

export const useManageOccurrencies = (
  date: string,
  projectId: string,
  orderDirection: OrderDirection
) => {
  const client = useApolloClient();
  const localData = useRef<Record<string, any>>({});

  const baseQueryOptions = useMemo(
    () => ({
      query: getSpecialOccurrences,
      variables: {
        input: {
          projectId,
          date,
          orderDirection,
        },
      },
    }),
    [projectId, date, orderDirection]
  );

  const [createMutation] = useMutation<
    DailyReportCreateSpecialOccurrenceMutation,
    DailyReportCreateSpecialOccurrenceMutationVariables
  >(createSpecialOccurrenceMutation);
  const [updateMutation] = useMutation<
    DailyReportUpdateSpecialOccurrenceMutation,
    DailyReportUpdateSpecialOccurrenceMutationVariables
  >(updateSpecialOccurrence);
  const [removeMutation] = useMutation<
    DailyReportDeleteSpecialOccurrenceMutation,
    DailyReportDeleteSpecialOccurrenceMutationVariables
  >(deleteSpecialOccurrence);
  const { data } = useQuery<
    DailyReportSpecialOccurrencesQuery,
    DailyReportSpecialOccurrencesQueryVariables
  >(getSpecialOccurrences, {
    ...baseQueryOptions,
    onCompleted: (data) => {
      if (!data.result.items.some((el) => localData.current[el.id])) {
        client.writeQuery({
          ...baseQueryOptions,
          data: {
            result: updateOccurenciesData(
              data.result,
              Object.values(localData.current),
              orderDirection
            ),
          },
        });
      }
    },
  });

  const removeFromCache = useCallback(
    <T>(id: string, cache: ApolloCache<T>) => {
      const data = cache.readQuery<DailyReportSpecialOccurrencesQuery>(
        baseQueryOptions
      );

      if (data) {
        const itemToRemove = data.result?.items.find((el) => el.id === id);

        if (itemToRemove) {
          cache.evict({ id: cache.identify(itemToRemove) });
          cache.gc();
        }
      }
    },
    [baseQueryOptions]
  );

  const create = useCallback(() => {
    const newOccurrence = generateOccurrence(projectId);
    localData.current[newOccurrence.id] = newOccurrence;

    const data = client.readQuery<DailyReportSpecialOccurrencesQuery>(
      baseQueryOptions
    );

    if (data?.result) {
      client.writeQuery({
        ...baseQueryOptions,
        data: {
          result: updateOccurenciesData(
            data.result,
            [newOccurrence],
            orderDirection
          ),
        },
      });
    }
  }, [projectId, orderDirection, client, baseQueryOptions]);

  const update = useCallback(
    (id: string, description: string) => {
      const obj = localData.current[id];

      if (obj) {
        createMutation({
          variables: {
            input: {
              id: obj.id,
              projectId: obj.projectId,
              date: obj.date,
              description,
            },
          },
        });

        delete localData.current[id];
      } else {
        updateMutation({
          variables: {
            input: {
              id,
              description,
            },
          },
        });
      }
    },
    [createMutation, updateMutation]
  );

  const remove = useCallback(
    (id: string) => {
      if (localData.current[id]) {
        removeFromCache(id, client.cache);

        delete localData.current[id];
      } else {
        removeMutation({
          variables: {
            input: {
              id,
            },
          },
          update: (cache) => {
            removeFromCache(id, cache);
          },
        });
      }
    },
    [client, removeFromCache, removeMutation]
  );

  const defferedUpdate = useMemo(() => debounce(update, 200), [update]);

  return {
    data,
    create,
    update,
    defferedUpdate,
    remove,
  };
};
