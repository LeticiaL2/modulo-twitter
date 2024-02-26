import { z } from "zod";

interface Props {
  name: string;
  email: string;
}

export default function NameEmailSchema({ name, email }: Props) {
  const createUserFormSchema = z.object({
    name: z
      .string()
      .max(100, { message: "O nome deve ter menos de 100 caracteres." })
      .min(1, { message: "O nome é obrigatório." }),

    email: z
      .string({
        required_error: "O e-mail é obrigatório.",
        invalid_type_error: "O e-mail deve ser uma string.",
      })
      .email("Informe um endereço de e-mail válido.")
      .max(100, {
        message: "O endereço de e-mail deve ter menos de 100 caracteres.",
      }),
  });

  const data = {
    name: name,
    email: email,
  };

  const result = createUserFormSchema.safeParse(data);

  return result;
}
