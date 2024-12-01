import { Button } from '@/components/ui/button';
import AppContext from '@/context';
import { useCallback, useContext } from 'react';
import { toast } from 'sonner';

export default function ActionBar() {
	const [, { onSave }] = useContext(AppContext);
	const onSaveClick = useCallback(async () => {
		const { success, errors } = await onSave();
		if (success) {
			toast.success('Acesso salvo com sucesso');
		} else {
			for (const error of errors ?? ['Erro desconhecido']) {
				const msg = (error as { message: string }).message ?? error;
				toast.error(msg);
			}
		}
	}, [onSave]);

	return (
		<nav className="sticky bottom-0 p-2 flex justify-end border-t-2 border-accent bg-white">
			<div className="w-1/2 flex align-center gap-5 justify-end px-3">
				<Button variant="outline">Cancelar</Button>
				<Button variant="default" className="bg-success-500 hover:bg-success-600" onClick={onSaveClick}>
					Salvar
				</Button>
			</div>
		</nav>
	);
}
