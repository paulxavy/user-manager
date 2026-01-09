'use client';
import { TextInput, Select, Group, Paper } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilters } from '@/store/userSlice';

export default function UserFilters() {
  const dispatch = useAppDispatch();
  const { items, filters } = useAppSelector((state) => state.users);
  const companyOptions = Array.from(new Set(items.map((u) => u.company.name)));
  const handleNameChange = (val: string) => {
    dispatch(setFilters({ ...filters, name: val }));
  };

  const handleCompanyChange = (val: string | null) => {
    dispatch(setFilters({ ...filters, company: val || '' }));
  };

  return (
    <Paper shadow="sm" p="md" mb="xl" withBorder radius="md">
      <Group grow>
        <TextInput
          label="Buscar por nombre"
          placeholder="Escribe un nombre..."
          value={filters.name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <Select
          label="Filtrar por empresa"
          placeholder="Selecciona una empresa"
          data={companyOptions}
          value={filters.company || null}
          onChange={handleCompanyChange}
          clearable
        />
      </Group>
    </Paper>
  );
}