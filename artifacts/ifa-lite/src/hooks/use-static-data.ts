import { useMemo, useCallback, useState } from 'react';
import { useDataStore } from '@/data/static-store';
import type { Broker, ListBrokersParams } from '@/data/seed-data';

export type { Broker, ListBrokersParams } from '@/data/seed-data';

export function useListBrokers(params?: ListBrokersParams, _options?: any) {
  const { brokers } = useDataStore();

  const filtered = useMemo(() => {
    if (!params || Object.keys(params).length === 0) return brokers;

    return brokers.filter(b => {
      if (params.postcode && !b.postcode?.toLowerCase().startsWith(params.postcode.toLowerCase())) return false;
      if (params.ifaReference && !b.ifaRef?.toLowerCase().includes(params.ifaReference.toLowerCase())) return false;
      if (params.ifaName && !b.brokerName?.toLowerCase().includes(params.ifaName.toLowerCase())) return false;

      if (params.authorised && b.status !== 'Authorised') return false;
      if (params.cancelled && b.status !== 'Cancelled') return false;
      if (params.duplicateRecord && b.status !== 'Duplicate Record') return false;
      if (params.revoked && b.status !== 'Revoked') return false;

      return true;
    });
  }, [brokers, params]);

  return { data: filtered, isLoading: false, isError: false, error: null };
}

export function useGetBroker(id: number, options?: { query?: { enabled?: boolean } }) {
  const { brokers } = useDataStore();
  const enabled = options?.query?.enabled !== false;
  const data = enabled ? brokers.find(b => b.id === id) : undefined;
  return { data, isLoading: false, isError: false, error: null };
}

export function useUpdateBroker() {
  const { updateBroker } = useDataStore();
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback((
    { id, data }: { id: number; data: Partial<Broker> },
    callbacks?: { onSuccess?: (result: Broker) => void; onError?: (err: Error) => void }
  ) => {
    setIsPending(true);
    setTimeout(() => {
      try {
        const result = updateBroker(id, data);
        setIsPending(false);
        callbacks?.onSuccess?.(result);
      } catch (err) {
        setIsPending(false);
        callbacks?.onError?.(err as Error);
      }
    }, 100);
  }, [updateBroker]);

  return { mutate, isPending };
}

export function useCreateBroker() {
  const { createBroker } = useDataStore();
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback((
    { data }: { data: Partial<Broker> },
    callbacks?: { onSuccess?: (result: Broker) => void; onError?: (err: Error) => void }
  ) => {
    setIsPending(true);
    setTimeout(() => {
      try {
        const result = createBroker(data);
        setIsPending(false);
        callbacks?.onSuccess?.(result);
      } catch (err) {
        setIsPending(false);
        callbacks?.onError?.(err as Error);
      }
    }, 100);
  }, [createBroker]);

  return { mutate, isPending };
}

export function useListContacts(brokerId: number, options?: { query?: { enabled?: boolean } }) {
  const { contacts } = useDataStore();
  const enabled = options?.query?.enabled !== false;
  const data = enabled ? contacts.filter(c => c.brokerId === brokerId) : [];
  return { data, isLoading: false };
}

export function useListNotes(brokerId: number, options?: { query?: { enabled?: boolean } }) {
  const { notes } = useDataStore();
  const enabled = options?.query?.enabled !== false;
  const data = enabled ? notes.filter(n => n.brokerId === brokerId) : [];
  return { data, isLoading: false };
}

export function useCreateNote() {
  const { addNote } = useDataStore();

  const mutate = useCallback((
    { brokerId, data }: { brokerId: number; data: any },
    callbacks?: { onSuccess?: () => void }
  ) => {
    addNote(brokerId, data);
    callbacks?.onSuccess?.();
  }, [addNote]);

  return { mutate };
}

export function useGetRetirementIncome(brokerId: number, options?: { query?: { enabled?: boolean } }) {
  const { retirementIncome } = useDataStore();
  const enabled = options?.query?.enabled !== false;
  const data = enabled ? retirementIncome.find(r => r.brokerId === brokerId) : undefined;
  return { data, isLoading: false };
}

export function useGetEquityRelease(brokerId: number, options?: { query?: { enabled?: boolean } }) {
  const { equityRelease } = useDataStore();
  const enabled = options?.query?.enabled !== false;
  const data = enabled ? equityRelease.find(e => e.brokerId === brokerId) : undefined;
  return { data, isLoading: false };
}

export function getListBrokersQueryKey() {
  return ['brokers'];
}
