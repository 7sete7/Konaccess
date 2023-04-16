import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { Routes } from '../server/routes';

let client: ReturnType<typeof createTRPCProxyClient<Routes>>;

export default function getClient() {
	if (client != null) return client;

	const PORT = Number(3000);
	client = createTRPCProxyClient<Routes>({
		links: [httpBatchLink({ url: `http://localhost:${PORT}/trpc` })],
	});

	return client;
}
