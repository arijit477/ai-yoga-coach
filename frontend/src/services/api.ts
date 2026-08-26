const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching health status:', error);
    throw error;
  }
};

export const askCoach = async (coachId: string, exerciseId: string, message: string) => {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coach_id: coachId,
        exercise_id: exerciseId,
        message: message
      })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error chatting with coach:', error);
    throw error;
  }
};
