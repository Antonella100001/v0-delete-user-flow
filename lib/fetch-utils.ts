// Utility function for API calls
export default async function fetchModel(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api"

  const response = await fetch(`${baseUrl}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}
