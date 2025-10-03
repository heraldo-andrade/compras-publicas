"use client";

import { Column, Message, Table } from "@uigovpe/components";
import { useEffect, useState } from "react";
import { useStepper } from "../../(context)/StepperContext";

export const SearchCatmatCode = () => {

    const { currentStep, setStepValidity, getStepValidity } = useStepper();

    useEffect(() => {
        setStepValidity(currentStep, true);
    }, [currentStep, getStepValidity, setStepValidity]);

    const [selectedProducts, setSelectedProducts] = useState<any>(null);

    const list = [
        {
            id: '5jd6o',
            description: 'TENECTEPLASE - CONCENTRACAO/DOSAGEM 50 MG,FORMA FARMACEUTICA PO LIOFILIZADO PARA SOLUCAO INJETAVEL,FORMA DE APRESENTACAO FRASCO-AMPOLA,VIA DE ADMINISTRACAO INTRAVENOSA',
            code: '344382-5',
            items: [
                {
                    id: '23fdsf',
                    codeCatmat: '23423-5',
                    catmatDescription: 'TENECTEPLASE - CONCENTRACAO/DOSAGEM 50 MG,FORMA FARMACEUTICA PO LIOFILIZADO PARA SOLUCAO INJETAVEL,FORMA DE APRESENTACAO FRASCO-AMPOLA,VIA DE ADMINISTRACAO INTRAVENOSA',
                    similarityRate: '81.76%'
                },
                {
                    id: '65dfgt',
                    codeCatmat: '23423-5',
                    catmatDescription: 'TENECTEPLASE - CONCENTRACAO/DOSAGEM 50 MG,FORMA FARMACEUTICA PO LIOFILIZADO PARA SOLUCAO INJETAVEL,FORMA DE APRESENTACAO FRASCO-AMPOLA,VIA DE ADMINISTRACAO INTRAVENOSA',
                    similarityRate: '81.76%'
                },
                {
                    id: '76fsju',
                    codeCatmat: '23423-5',
                    catmatDescription: 'TENECTEPLASE - CONCENTRACAO/DOSAGEM 50 MG,FORMA FARMACEUTICA PO LIOFILIZADO PARA SOLUCAO INJETAVEL,FORMA DE APRESENTACAO FRASCO-AMPOLA,VIA DE ADMINISTRACAO INTRAVENOSA',
                    similarityRate: '81.76%'
                },
            ]
        },
        {
            id: '5hjoim',
            description: 'TENECTEPLASE - CONCENTRACAO/DOSAGEM 50 MG,FORMA FARMACEUTICA PO LIOFILIZADO PARA SOLUCAO INJETAVEL,FORMA DE APRESENTACAO FRASCO-AMPOLA,VIA DE ADMINISTRACAO INTRAVENOSA 2',
            code: '344382-5',
            items: [
                {
                    id: '21sftrh',
                    codeCatmat: '23423-5',
                    catmatDescription: 'TENECTEPLASE - CONCENTRACAO/DOSAGEM 50 MG,FORMA FARMACEUTICA PO LIOFILIZADO PARA SOLUCAO INJETAVEL,FORMA DE APRESENTACAO FRASCO-AMPOLA,VIA DE ADMINISTRACAO INTRAVENOSA',
                    similarityRate: '81.76%'
                },
                {
                    id: '87kfucj',
                    codeCatmat: '23423-5',
                    catmatDescription: 'TENECTEPLASE - CONCENTRACAO/DOSAGEM 50 MG,FORMA FARMACEUTICA PO LIOFILIZADO PARA SOLUCAO INJETAVEL,FORMA DE APRESENTACAO FRASCO-AMPOLA,VIA DE ADMINISTRACAO INTRAVENOSA',
                    similarityRate: '81.76%'
                },
                {
                    id: '04kduhb',
                    codeCatmat: '23423-5',
                    catmatDescription: 'TENECTEPLASE - CONCENTRACAO/DOSAGEM 50 MG,FORMA FARMACEUTICA PO LIOFILIZADO PARA SOLUCAO INJETAVEL,FORMA DE APRESENTACAO FRASCO-AMPOLA,VIA DE ADMINISTRACAO INTRAVENOSA',
                    similarityRate: '81.76%'
                },
            ]
        },
    ];

    const dateBodyTemplate = (rowData: any) => {
        return (
            <div className="search-catmat-description-cell" title={rowData?.catmatDescription}>
                {rowData?.catmatDescription}
            </div>
        );
    };

    console.log(selectedProducts)

    return (
        <section>
            <div className="search-catmat-wrapper">
                {list.map((listItem, index) => (
                    <div key={listItem.id} className="search-catmat-item">
                        <div className="search-catmat-info-section">
                            <div className="search-catmat-header">Cod. E-FISCO {listItem.code}</div>
                            <div className="search-catmat-description">{listItem.description}</div>
                        </div>
                        <Table
                            value={listItem.items}
                            dataKey="id"
                            stripedRows
                            rowsPerPageOptions={[5, 10, 20]}
                            tableStyle={{ minWidth: '40rem' }}
                            className="search-catmat-table-wrapper"
                            selectionMode={'multiple'}
                            selection={selectedProducts!}
                            onSelectionChange={(e: { value: any }) => setSelectedProducts(e.value)}
                        >
                            <Column
                                field="catmatDescription"
                                header="Descrição do CATMAT"
                                headerStyle={{ width: '28%' }}
                                body={dateBodyTemplate}
                            />
                            <Column field="codeCatmat" header="Código CATMAT" headerStyle={{ width: '28%' }} />
                            <Column field="similarityRate" header="Taxa de similaridade" headerStyle={{ width: '28%' }} />
                            <Column selectionMode="multiple" headerClassName="hidden"></Column>
                        </Table>
                    </div>
                ))}
            </div>
            
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