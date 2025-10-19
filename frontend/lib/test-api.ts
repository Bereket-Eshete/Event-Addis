// Test API connection
export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`, {
      method: 'GET',
    })
    console.log('Backend connection:', response.status)
    return response.ok
  } catch (error) {
    console.error('Backend connection failed:', error)
    return false
  }
}