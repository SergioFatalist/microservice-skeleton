import * as Joi from 'joi';

export const environmentSchema = Joi.object({
  DB_URL: Joi.string().required(),
  SH_URL: Joi.string().optional(),
  NODE_ENV: Joi.string().optional(),
}).unknown(true);
