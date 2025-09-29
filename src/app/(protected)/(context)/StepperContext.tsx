"use client";

import { createContext, useContext, useState, useCallback, type ReactNode, type Dispatch, type SetStateAction } from "react";
import type { Step } from "@uigovpe/components";

/** Contexto do Stepper: controla passo atual, avanço e validade por passo. */
export type StepperContextType = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  onNext: (steps: Step[]) => void;
  setStepValidity: (stepIndex: number, isValid: boolean) => void;
  getStepValidity: (stepIndex: number) => boolean | undefined;
  resetAllSteps: () => void;
};

const StepperContext = createContext<StepperContextType | undefined>(undefined);

/** Provider do Stepper: mantém `currentStep` e mapa de validade; evita re-render desnecessário. */
export function StepperProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepValidity, setStepValidityState] = useState<Record<number, boolean>>({});

  /** Define validade do passo e ignora atualização se o valor não mudar. */
  const setStepValidity = useCallback((stepIndex: number, isValid: boolean) => {
    setStepValidityState((prev) => {
      const current = prev[stepIndex];
      if (current === isValid) return prev; // evita re-render desnecessário
      return { ...prev, [stepIndex]: isValid };
    });
  }, []);

  /** Retorna a validade do passo (ou `undefined` se não definida). */
  const getStepValidity = useCallback((stepIndex: number) => stepValidity[stepIndex], [stepValidity]);

  /** Reseta todos os passos: volta ao passo inicial e limpa a validade de todos. */
  const resetAllSteps = useCallback(() => {
    setCurrentStep(0);
    setStepValidityState({});
  }, []);

  /** Avança se não for o último; em passo de conclusão não completo, dispara ação (placeholder). Validação é responsabilidade do chamador via `getStepValidity`. */
  const onNext = (steps: Step[]) => {
    const step = steps[currentStep];

    if (step?.isConclusion && !steps[currentStep]?.isCompleted) {
      alert("disparar function de conclusão caso tenha!");
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  return (
    <StepperContext.Provider value={{ currentStep, setCurrentStep, onNext, setStepValidity, getStepValidity, resetAllSteps }}>
      {children}
    </StepperContext.Provider>
  );
}

/** Hook do Stepper; exige uso dentro de `StepperProvider`. */
export function useStepper() {
  const ctx = useContext(StepperContext);
  if (!ctx) throw new Error("useStepper deve ser usado dentro de um StepperProvider");
  return ctx;
}


