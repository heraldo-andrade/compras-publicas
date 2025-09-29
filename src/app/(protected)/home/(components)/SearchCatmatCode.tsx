"use client";

import { Message } from "@uigovpe/components";
import { useEffect } from "react";
import { useStepper } from "../../(context)/StepperContext";

export const SearchCatmatCode = () => {

    const { currentStep, setStepValidity, getStepValidity } = useStepper();

    useEffect(() => {
        setStepValidity(currentStep, true);
    }, [currentStep, getStepValidity, setStepValidity]);

    return (
        <section>
            <div className="mt-12 m-auto max-w-[31.25rem]">
                <Message
                    severity="success"
                    summary="Execução do E-FISCO"
                    text="Execução do E-FISCO realizada com sucesso. Clique em avançar para realização da busca dos códigos CATMAT."
                />
            </div>
        </section>
    );
}