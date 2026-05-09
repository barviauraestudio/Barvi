export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email } = req.body

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.VITE_BREVO_API_KEY || '',
    },
    body: JSON.stringify({
      email,
      listIds: [2],
      updateEnabled: true,
    }),
  })

  const status = response.status
  const data = status !== 204 ? await response.json() : {}

  return res.status(status).json(data)
}