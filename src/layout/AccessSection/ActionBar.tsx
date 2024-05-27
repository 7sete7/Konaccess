import { Button } from "@/components/ui/button";

export default function ActionBar() {
  return (
    <nav className="sticky bottom-0 p-2 flex justify-end border-t-2 border-accent bg-white">
      <div className="w-1/2 flex align-center gap-5 justify-end px-3">
        <Button variant="outline">Cancelar</Button>
        <Button variant="default" className="bg-success-500 hover:bg-success-600">
          Salvar
        </Button>
      </div>
    </nav>
  );
}
