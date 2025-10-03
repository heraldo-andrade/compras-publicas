"use client";

import { Column, Divider, Dropdown, DropdownChangeEvent, Table } from "@uigovpe/components";
import { useMemo, useState } from "react";

export default function SearchPricesPncp() {

  // Dropdown genérico (se necessário para futuro uso)
  const [dropdownValue, setDropdownValue] = useState(null);
  const dropdownValues = [
    { name: "Opção 1", code: "option1" },
    { name: "Opção 2", code: "option2" },
    { name: "Opção 3", code: "option3" },
    { name: "Opção 4", code: "option4" },
    { name: "Opção 5", code: "option5" },
  ];

  // Estados dos 3 filtros
  const [categoryFilter, setCategoryFilter] = useState<any>(null);
  const [sourceFilter, setSourceFilter] = useState<any>(null);
  const [unitFilter, setUnitFilter] = useState<any>(null);

  // Opções de filtros
  const filterCategories = [
    { name: "Medicamento", code: "med" },
    { name: "Material", code: "mat" },
    { name: "Serviço", code: "srv" },
  ];

  const filterSources = [
    { name: "Federal", code: "fed" },
    { name: "Estadual", code: "est" },
    { name: "Municipal", code: "mun" },
  ];
  
  const filterUnits = [
    { name: "Unidade", code: "und" },
    { name: "Caixa", code: "cx" },
    { name: "Frasco", code: "fr" },
  ];

  // Lista ampliada com metadados para filtragem
  const list: any = [
        { id: '5jd6o', item: '100001', itemCode: '01001-1', unit: 'und', source: 'fed', category: 'med', description: 'TENECTEPLASE 50 MG PO LIOFILIZADO - VIA IV' },
        { id: '0dus7', item: '100002', itemCode: '01002-1', unit: 'cx',  source: 'est', category: 'med', description: 'DIPIRONA 500 MG COMPRIMIDO' },
        { id: '7sfj4', item: '100003', itemCode: '01003-1', unit: 'fr',  source: 'mun', category: 'med', description: 'AMOXICILINA 500 MG SUSPENSÃO' },
        { id: 'a1b2c', item: '200001', itemCode: '02001-2', unit: 'und', source: 'fed', category: 'mat', description: 'SERINGA DESCARTÁVEL 5ML' },
        { id: 'd3e4f', item: '200002', itemCode: '02002-2', unit: 'cx',  source: 'est', category: 'mat', description: 'LUVAS DE PROCEDIMENTO TAM M' },
        { id: 'g5h6i', item: '200003', itemCode: '02003-2', unit: 'fr',  source: 'mun', category: 'mat', description: 'ÁLCOOL 70% 1L' },
        { id: 'j7k8l', item: '300001', itemCode: '03001-3', unit: 'und', source: 'fed', category: 'srv', description: 'SERVIÇO DE ESTERILIZAÇÃO' },
        { id: 'm9n0o', item: '300002', itemCode: '03002-3', unit: 'cx',  source: 'est', category: 'srv', description: 'SERVIÇO DE MANUTENÇÃO EQUIP.' },
        { id: 'p1q2r', item: '300003', itemCode: '03003-3', unit: 'fr',  source: 'mun', category: 'srv', description: 'SERVIÇO DE LIMPEZA TÉCNICA' },
        { id: 's3t4u', item: '100004', itemCode: '01004-1', unit: 'und', source: 'fed', category: 'med', description: 'PARACETAMOL 750 MG COMPRIMIDO' },
        { id: 'v5w6x', item: '100005', itemCode: '01005-1', unit: 'cx',  source: 'est', category: 'med', description: 'IBUPROFENO 600 MG COMPRIMIDO' },
        { id: 'y7z8a', item: '100006', itemCode: '01006-1', unit: 'fr',  source: 'mun', category: 'med', description: 'Soro Fisiológico 0,9% 500ML' },
        { id: 'b9c0d', item: '200004', itemCode: '02004-2', unit: 'und', source: 'fed', category: 'mat', description: 'GAZE ESTÉRIL 7,5CM X 7,5CM' },
        { id: 'e1f2g', item: '200005', itemCode: '02005-2', unit: 'cx',  source: 'est', category: 'mat', description: 'MÁSCARA DESCARTÁVEL TRIPLA' },
        { id: 'h3i4j', item: '200006', itemCode: '02006-2', unit: 'fr',  source: 'mun', category: 'mat', description: 'CLORO 2% SOLUÇÃO' },
        { id: 'k5l6m', item: '300004', itemCode: '03004-3', unit: 'und', source: 'fed', category: 'srv', description: 'SERVIÇO DE CALIBRAÇÃO' },
        { id: 'n7o8p', item: '300005', itemCode: '03005-3', unit: 'cx',  source: 'est', category: 'srv', description: 'SERVIÇO DE TRANSPORTE' },
        { id: 'q9r0s', item: '300006', itemCode: '03006-3', unit: 'fr',  source: 'mun', category: 'srv', description: 'SERVIÇO DE COLETA RESÍDUOS' },
  ];

  // Lista filtrada conforme filtros selecionados
  const filteredList = useMemo(() => {
    return list.filter((row: any) => {
      const categoryOk = categoryFilter ? row.category === categoryFilter.code : true;
      const sourceOk = sourceFilter ? row.source === sourceFilter.code : true;
      const unitOk = unitFilter ? row.unit === unitFilter.code : true;
      return categoryOk && sourceOk && unitOk;
    });
  }, [list, categoryFilter, sourceFilter, unitFilter]);

  return (
    <div>
      <Dropdown
        value={dropdownValue}
        onChange={(e: DropdownChangeEvent) => setDropdownValue(e.value)}
        options={dropdownValues}
        optionLabel="name"
        placeholder="Placeholder"
        showClear 
        label="Label / rótulo"
        suportText="Texto de suporte"
      />

    <Divider layout="horizontal" className="spncp-divider" />

      <div className="spncp-row">
        <div className="spncp-col">
            <Dropdown
                value={categoryFilter}
                onChange={(e: DropdownChangeEvent) => setCategoryFilter(e.value)}
                options={filterCategories}
                optionLabel="name"
                placeholder="Categoria"
                showClear 
                label="Categoria"
                suportText="Filtre pela categoria do item"
            />
        </div>
        <div className="spncp-col">
            <Dropdown
                value={sourceFilter}
                onChange={(e: DropdownChangeEvent) => setSourceFilter(e.value)}
                options={filterSources}
                optionLabel="name"
                placeholder="Origem"
                showClear 
                label="Origem"
                suportText="Filtre pela origem da referência"
            />
        </div>
        <div className="spncp-col">
            <Dropdown
                value={unitFilter}
                onChange={(e: DropdownChangeEvent) => setUnitFilter(e.value)}
                options={filterUnits}
                optionLabel="name"
                placeholder="Unidade"
                showClear 
                label="Unidade"
                suportText="Filtre pela unidade de fornecimento"
            />
        </div>
      </div>
        <Divider layout="horizontal" className="spncp-divider" />

        <Table
            value={filteredList}
            dataKey="id"
            rowsPerPageOptions={[5, 10, 20]}
            tableStyle={{ minWidth: '40rem' }}
            stripedRows
        >
            <Column field="item" header="Item" headerStyle={{ width: '7rem' }} />
            <Column field="itemCode" header={<span className="text-truncate">Código do Item</span>} />
            <Column field="description" header="Descrição do Item" />
        </Table>
    </div>
  );
}