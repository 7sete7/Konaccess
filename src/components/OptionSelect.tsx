import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Eye, Pencil, PlusCircle } from "lucide-react";

const selectTypes = {
  read: {
    icon: Eye,
    label: "Pode ler:",
  },
  edit: {
    icon: Pencil,
    label: "Pode editar:",
  },
  create: {
    icon: PlusCircle,
    label: "Pode criar:",
  },
};

const ACCESS_OPTS = ["Apenas o responsável", "O responsável e seu gerente", "O responsável e seus superiores", "Todos os usuários"];

type OptionSelectProps = {
  type: keyof typeof selectTypes;
  variant: keyof typeof variants;
};

const variants = {
  standalone: {
    withLabel: true,
    withIcon: true,
    withBorder: true,
    placeholder: "Selecione...",
  },
  table: {
    withLabel: false,
    withIcon: false,
    withBorder: false,
    placeholder: null,
  },
};

export default function OptionSelect({ type, variant }: OptionSelectProps) {
  const { icon: Icon, label } = selectTypes[type];
  const { withLabel, withIcon, withBorder, placeholder } = variants[variant];

  return (
    <>
      {withLabel && <label className="block text-sm mb-2">{label}</label>}
      <Select>
        <SelectTrigger className={cn("py-1 px-2", withBorder === false && "border-0")}>
          {withIcon && <Icon size={16} />}
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {ACCESS_OPTS.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
