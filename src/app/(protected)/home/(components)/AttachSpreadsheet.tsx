"use client";

import { FileInput, Message } from "@uigovpe/components";
import { Controller, useFormContext } from "react-hook-form";
import type { UploadFormData } from "../(validations)/uploadValidation";
import { useEffect, useMemo } from "react";
import { useStepper } from "../../(context)/StepperContext";

export const AttachSpreadsheet = () => {

  // Acesso ao formulário (React Hook Form)
  const { control, clearErrors, watch, formState: { errors } } = useFormContext<UploadFormData>();

  // Controle do fluxo por passos (Stepper)
  const { currentStep, setStepValidity, getStepValidity, resetAllSteps } = useStepper();

  const fileValue = watch("file");

  // Arquivo válido quando existe e não há erro de validação
  const isValidFile = useMemo(() => {
    return !!fileValue?.length && !errors.file;
  }, [fileValue, errors.file]);

  // Mantém a validade do passo sincronizada com o estado do arquivo
  useEffect(() => {
    const currentValidity = getStepValidity(currentStep);
    if (currentValidity !== isValidFile) {
      setStepValidity(currentStep, isValidFile);
    }
  }, [currentStep, getStepValidity, isValidFile, setStepValidity]);

  // Limpa o arquivo e o erro relacionado
  const handdlerClear = (onChange: (value: FileList | null) => void) => {
    resetAllSteps();
    onChange(null);
    setStepValidity(0, false);
    clearErrors('file');
  };

  return (
    <div className="space-y-4">

      <Controller
        control={control}
        name="file"
        render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
          <FileInput
            label={isValidFile ? "Avance para próxima etapa ou selecione novo arquivo" : "Anexe a planilha padrão"}
            suportText={errors.file ? errors.file.message : "Planilha em formato .xlsx"}
            mode="select"
            onChange={(files: FileList | null) => {
              // Ao alterar o arquivo, reseta todos os passos e reatribui o novo arquivo
              resetAllSteps();
              onChange(files);
            }}
            inputRef={ref}
            success={!!value?.length && !error}
            invalid={!!error}
            onClear={() => handdlerClear(onChange)}
            fileNameAttachment={fileValue?.[0]?.name || null}
          />
        )}
      />

      {isValidFile ? (
        <div className="flex max-w-[31.25rem]">
          <Message
            severity="warn"
            summary="Planilha anexada"
            text="Se estiver tudo pronto é só clicar no botão avançar ou carregar novo arquivo para substituir o anexado."
          />
        </div>
      ) : null}
    </div>
  );
}