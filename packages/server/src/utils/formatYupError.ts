import { ValidationError } from 'yup'

export const formatYupError = (error: ValidationError) => {
  const errors: Array<{ ok: string; path: string; message: string }> = []
  error.inner.forEach((e) => {
    errors.push({
      ok: '👎',
      path: e.path,
      message: e.message
    })
  })
  return errors
}
