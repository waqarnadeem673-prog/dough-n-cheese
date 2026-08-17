import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { branches, defaultBranchId } from '@/data/branches';
import type { Branch } from '@/types';

type BranchContextValue = {
  selectedBranch: Branch;
  setSelectedBranch: (id: string) => void;
  allBranches: Branch[];
};

const BranchContext = createContext<BranchContextValue | null>(null);

const STORAGE_KEY = 'dnc-branch';

export function BranchProvider({ children }: { children: ReactNode }) {
  const [branchId, setBranchId] = useState<string>(defaultBranchId);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setBranchId(stored);
  }, []);

  const setSelectedBranch = (id: string) => {
    setBranchId(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  const selectedBranch = branches.find((b) => b.id === branchId) ?? branches[0];

  return (
    <BranchContext.Provider value={{ selectedBranch, setSelectedBranch, allBranches: branches }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error('useBranch must be used within BranchProvider');
  return ctx;
}
