'use client';
import { useEffect } from 'react';
import { Grid, Card, Text, Badge, Button, Group, Loader, Alert } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUsers, hydrateFilters } from '@/store/userSlice';
import Link from 'next/link';

export default function UserList() {
  const dispatch = useAppDispatch();
  const { items, loading, error, filters } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(hydrateFilters());
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = items.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesCompany = filters.company === '' || user.company.name === filters.company;
    return matchesName && matchesCompany;
  });

  if (loading) return <Group justify="center" py="xl"><Loader size="lg" /></Group>;
  if (error) return <Alert color="red" variant="filled" mt="md">{error}</Alert>;

  return (
    <Grid gutter="md">
      {filteredUsers.map((user) => (
        <Grid.Col key={user.id} span={{ base: 12, sm: 6, lg: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={600} size="lg">{user.name}</Text>
              <Badge color="blue" variant="light">{user.company.name}</Badge>
            </Group>

            <Button 
              component={Link} 
              href={`/users/${user.id}`} 
              fullWidth 
              variant="outline" 
              color="blue"
              mt="auto"
            >
              Ver Detalle
            </Button>
          </Card>
        </Grid.Col>
      ))}
      
      {filteredUsers.length === 0 && !loading && (
        <Grid.Col span={12}>
          <Text ta="center" py="xl" c="dimmed">No se encontraron usuarios.</Text>
        </Grid.Col>
      )}
    </Grid>
  );
}