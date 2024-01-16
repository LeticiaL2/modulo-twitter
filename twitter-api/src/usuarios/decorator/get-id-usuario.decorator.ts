import { createParamDecorator } from '@nestjs/common';
import { Usuario } from '../usuario.entity';

export const GetusuarioId = createParamDecorator((data, req): Usuario => {
	return req.args[0].user.id;
});
