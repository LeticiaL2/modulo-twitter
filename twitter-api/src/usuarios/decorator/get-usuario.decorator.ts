import { createParamDecorator } from '@nestjs/common';
import { Usuario } from 'src/usuarios/usuario.entity';

export const GetUsuario = createParamDecorator((data, req): Usuario => {
	return req.args[0].user;
});
