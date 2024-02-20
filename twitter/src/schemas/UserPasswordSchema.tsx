import { z } from "zod";

interface Props {
  user: string;
  password: string;
}
export default function NameEmailSchema({ user, password }: Props) {
  const createUserFormSchema = z.object({
    user: z
      .string({ required_error: "O usuário é obrigatório." })
      .max(50, { message: "O usuário deve ter menos de 50 caracteres" })
      .min(1, { message: "O usuário é obrigatório." }),

    password: z
      .string({
        required_error: "A senha é obrigatória.",
        invalid_type_error: "A senha deve ser uma string.",
      })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]*$/, {
        message:
          "A senha deve conter pelo menos 1 caractere minúsculo, 1 maiúsculo, 1 dígito e 1 símbolo.",
      })
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres." })
      .max(200, {
        message: "A senha deve ter no máximo 200 caracteres.",
      }),
  });

  const data = {
    user: user,
    password: password,
  };

  const result = createUserFormSchema.safeParse(data);

  return result;
}
