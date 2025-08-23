export const formatDate = (dateString, options) => {
  const date = new Date(dateString)

  const settings = options || {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  return date.toLocaleDateString('ru-RU', settings)
}
