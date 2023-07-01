import cors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import Router from './routes';
import fetchAllModules from './store/all_modules';

const server = fastify({ logger: true });

void server.register(cors, { origin: 'http://localhost:5173' });
void server.register(fastifyTRPCPlugin, {
	useWSS: false,
	trpcOptions: { router: Router },
	prefix: '/trpc',
});

const PORT = Number(process.env.PORT ?? 3000);

server.listen({ port: PORT }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server listening at ${address}`);
	fetchAllModules();
});
