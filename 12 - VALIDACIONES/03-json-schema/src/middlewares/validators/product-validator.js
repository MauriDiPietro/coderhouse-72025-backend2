// npm i ajv ajv-errors ajv-formats @sinclair/typebox
import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
// import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'

const ajv = new Ajv({ allErrors: true })
// addFormats(ajv, ['email'])
addErrors(ajv)

const productSchema = Type.Object({
  name: Type.String(),
  description: Type.String(),
  price: Type.Number(),
  stock: Type.Number()
})

const validate = ajv.compile(productSchema)

export const createValidator = (req, res, next) =>{
  const isValid = validate(req.body)
  if(!isValid) res.status(400).send(ajv.errorsText(validate.errors, { separator: "\n" }));
  return next()
  }