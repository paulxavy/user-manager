'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Button, Card, Text, Title, Group, Loader, Badge, Stack } from '@mantine/core';
import { useAppSelector } from '@/store/hooks';
import { User } from '@/types/user';

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const userFromStore = useAppSelector((state) => 
    state.users.items.find((u) => u.id === Number(id))
  );

  useEffect(() => {
    if (userFromStore) {
      setUser(userFromStore);
      setLoading(false);
    } else {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, userFromStore]);

  if (loading) return <Group justify="center" mt="xl"><Loader size="xl" /></Group>;
  if (!user) return <Text ta="center" mt="xl">Usuario no encontrado</Text>;

  return (
    <Container size="sm" py="xl">
      <Button variant="subtle" onClick={() => router.back()} mb="md">
        ← Volver al listado
      </Button>
      
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Stack gap="xs">
          <Badge size="lg" variant="filled">ID: {user.id}</Badge>
          <Title order={2}>{user.name}</Title>
          <Group mt="md">
            <Text fw={700}>Empresa:</Text>
            <Text>{user.company.name}</Text>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
}