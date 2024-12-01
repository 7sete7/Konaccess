import { ContextProvider } from '@/context';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import App from '@/App.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ContextProvider>
				<App />

				<ReactQueryDevtools initialIsOpen={false} />
			</ContextProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
