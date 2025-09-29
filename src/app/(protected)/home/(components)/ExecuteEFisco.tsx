
'use client'

import { Column, Message, Table } from "@uigovpe/components"
import { useEffect } from "react";
import { useStepper } from "../../(context)/StepperContext";

interface List {
    id?: string;
    item?: string;
    itemCode?: string;
    description?: string;
}

export const ExecuteEFisco = () => {

    const { currentStep, setStepValidity, getStepValidity } = useStepper();

    const list: List[] = [
        {
            id: '5jd6o',
            item: '234234',
            itemCode: '23423-5',
            description: 'TENECTEPLASE - CONCENTRACAO/DOSAGEM 50 MG,FORMA FARMACEUTICA PO LIOFILIZADO PARA SOLUCAO INJETAVEL,FORMA DE APRESENTACAO FRASCO-AMPOLA,VIA DE ADMINISTRACAO INTRAVENOSA'
        },
        {
            id: '0dus7',
            item: '234234',
            itemCode: '23423-5',
            description: 'TENECTEPLASE - CONCENTRACAO/DOSAGEM 50 MG,FORMA FARMACEUTICA PO LIOFILIZADO PARA SOLUCAO INJETAVEL,FORMA DE APRESENTACAO FRASCO-AMPOLA,VIA DE ADMINISTRACAO INTRAVENOSA'
        },
        {
            id: '7sfj4',
            item: '234234',
            itemCode: '23423-5',
            description: 'TENECTEPLASE - CONCENTRACAO/DOSAGEM 50 MG,FORMA FARMACEUTICA PO LIOFILIZADO PARA SOLUCAO INJETAVEL,FORMA DE APRESENTACAO FRASCO-AMPOLA,VIA DE ADMINISTRACAO INTRAVENOSA'
        },
    ];

    useEffect(() => {
        const currentValidity = list?.length > 0;
        if (currentValidity) {
          setStepValidity(currentStep, true);
        }
    }, [currentStep, getStepValidity, setStepValidity, list]);

    return (
        <div className="w-full">
            <Table
                value={list}
                dataKey="id"
                rowsPerPageOptions={[5, 10, 20]}
                tableStyle={{ minWidth: '40rem' }}
                stripedRows
            >
                <Column field="item" header="Item" headerStyle={{ width: '7rem' }} />
                <Column field="itemCode" header={<span className="truncate">Código do Item</span>} />
                <Column field="description" header="Descrição do Item" />
            </Table>

            <div className="mt-12 flex max-w-[31.25rem]">
                <Message
                    severity="success"
                    summary="Planilha carregada com sucesso!"
                    text="Acima segue uma amostra de pré-visualização. Clique em avançar para fazer a execução do E-FISCO"
                />
            </div>
        </div>
    );
}