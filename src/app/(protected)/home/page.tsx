'use client'

import { Button, Card, Step, StepperBody, StepperHeader } from '@uigovpe/components';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UploadFormData } from './(validations)/uploadValidation';
import { uploadSchema } from './(validations)/uploadValidation';
import { useStepper } from '../(context)/StepperContext';
// Steps
import { AttachSpreadsheet } from './(components)/AttachSpreadsheet';
import { ExecuteEFisco } from './(components)/ExecuteEFisco';
import { SearchCatmatCode } from './(components)/SearchCatmatCode';
import SearchPricesPncp from './(components)/SearchPricesPncp';

const Home = () => {

  const { currentStep, setCurrentStep, onNext: goNext, getStepValidity } = useStepper();

  const methods = useForm<UploadFormData>({
    resolver: currentStep === 0 ? zodResolver(uploadSchema) : undefined,
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: { file: undefined as unknown as FileList },
  });

  const { handleSubmit } = methods;

  const steps: Step[] = useMemo(
    () => [
      {
        label: "Etapa 1",
        title: "Anexar planilha",
        render: () => <AttachSpreadsheet />,
        isCompleted: !!getStepValidity(0),
      },
      {
        label: "Etapa 2",
        title: "Executando E-FISCO",
        render: () => <ExecuteEFisco />,
        isCompleted: !!getStepValidity(1),
      },
      {
        label: "Etapa 3",
        title: "Buscando código CATMAT",
        render: () => <SearchCatmatCode />,
        isCompleted: !!getStepValidity(2),
      },
      {
        label: "Etapa 4",
        title: "Buscando preços no PNCP",
        render: () => <SearchPricesPncp />,
        isCompleted: !!getStepValidity(3),
      },
    ], [currentStep, getStepValidity]
  );

  const onSubmit = async (data: UploadFormData) => {
    console.log(data);
    goNext(steps);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="max-w-[56rem]">
          <StepperHeader
            steps={steps}
            currentStep={currentStep}
            providerName="Assistente de processamento"
            processName="E-FISCO - Similaridade - PNCP"
            onChangeStep={setCurrentStep}
          />
        </section>

        <Card>
          <StepperBody
            steps={steps}
            currentStep={currentStep}
            footer={
              currentStep < steps.length - 1 && (
                <>
                  {currentStep > 0 && (
                    <Button
                      label="Voltar"
                      type="button"
                      outlined
                      onClick={() => setCurrentStep((step) => step - 1)}
                    />
                  )}
                  {currentStep > 0 || getStepValidity(currentStep) ? (
                    <Button
                      label={steps[currentStep].isConclusion && !steps[currentStep].isCompleted ? "Concluir" : "Avançar"}
                      disabled={!getStepValidity(currentStep)}
                      type="submit"
                    />
                  ) : null}
                </>
              )
            }
          />
        </Card>
      </form>
    </FormProvider>
  );
};

export default Home;