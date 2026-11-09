"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Modal } from "@/components/ui/Modal";
import { RequestForm } from "./RequestForm";

type RequestContext = {
  title: string;
  residence?: string;
  configuration?: string;
};

const Context = createContext<(request: RequestContext) => void>(() => {});

export function RequestProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<RequestContext | null>(null);
  const [version, setVersion] = useState(0);

  const open = useCallback((next: RequestContext) => {
    setRequest(next);
    setVersion((current) => current + 1);
  }, []);

  return (
    <Context.Provider value={open}>
      {children}
      <Modal
        open={request !== null}
        onClose={() => setRequest(null)}
        title={request?.title ?? ""}
      >
        {request && (
          <RequestForm
            key={version}
            residence={request.residence}
            configuration={request.configuration}
          />
        )}
      </Modal>
    </Context.Provider>
  );
}

export function useRequest() {
  return useContext(Context);
}
