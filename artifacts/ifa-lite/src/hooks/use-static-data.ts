import { useMemo, useCallback } from 'react';
import { useDataStore } from '@/data/static-store';
import type { Broker, Contact, Note, RetirementIncome, EquityRelease, ListBrokersParams } from '@/data/seed-data';

export type { Broker, ListBrokersParams } from '@/data/seed-data';

interface QueryOptions {
  query?: { enabled?: boolean };
}

interface MutationCallbacks<T> {
  onSuccess?: (result: T) => void;
  onError?: (err: Error) => void;
}

export function useListBrokers(params?: ListBrokersParams, options?: QueryOptions) {
  const { brokers } = useDataStore();
  const enabled = options?.query?.enabled !== false;

  const filtered = useMemo(() => {
    if (!enabled) return [];
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

export function useGetBroker(id: number, options?: QueryOptions) {
  const { brokers } = useDataStore();
  const enabled = options?.query?.enabled !== false;
  const data = enabled ? brokers.find(b => b.id === id) : undefined;
  return { data, isLoading: false, isError: false, error: null };
}

export function useUpdateBroker() {
  const { updateBroker } = useDataStore();

  const mutate = useCallback((
    { id, data }: { id: number; data: Partial<Broker> },
    callbacks?: MutationCallbacks<Broker>
  ) => {
    const result = updateBroker(id, data);
    callbacks?.onSuccess?.(result);
  }, [updateBroker]);

  return { mutate, isPending: false };
}

export function useCreateBroker() {
  const { createBroker } = useDataStore();

  const mutate = useCallback((
    { data }: { data: Partial<Broker> },
    callbacks?: MutationCallbacks<Broker>
  ) => {
    const result = createBroker(data);
    callbacks?.onSuccess?.(result);
  }, [createBroker]);

  return { mutate, isPending: false };
}

export function useListContacts(brokerId: number, options?: QueryOptions) {
  const { contacts } = useDataStore();
  const enabled = options?.query?.enabled !== false;
  const data: Contact[] = enabled ? contacts.filter(c => c.brokerId === brokerId) : [];
  return { data, isLoading: false };
}

export function useListNotes(brokerId: number, options?: QueryOptions) {
  const { notes } = useDataStore();
  const enabled = options?.query?.enabled !== false;
  const data: Note[] = enabled ? notes.filter(n => n.brokerId === brokerId) : [];
  return { data, isLoading: false };
}

export function useCreateNote() {
  const { addNote } = useDataStore();

  const mutate = useCallback((
    { brokerId, data }: { brokerId: number; data: Partial<Note> },
    callbacks?: { onSuccess?: () => void }
  ) => {
    addNote(brokerId, data);
    callbacks?.onSuccess?.();
  }, [addNote]);

  return { mutate };
}

export function useGetRetirementIncome(brokerId: number, options?: QueryOptions) {
  const { retirementIncome } = useDataStore();
  const enabled = options?.query?.enabled !== false;
  const data: RetirementIncome | undefined = enabled ? retirementIncome.find(r => r.brokerId === brokerId) : undefined;
  return { data, isLoading: false };
}

export function useGetEquityRelease(brokerId: number, options?: QueryOptions) {
  const { equityRelease } = useDataStore();
  const enabled = options?.query?.enabled !== false;
  const data: EquityRelease | undefined = enabled ? equityRelease.find(e => e.brokerId === brokerId) : undefined;
  return { data, isLoading: false };
}

export function getListBrokersQueryKey() {
  return ['brokers'];
}
