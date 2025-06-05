import { useState, useEffect } from 'react';
import axios from 'axios';
import { Topic } from '@/types/topics';

export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8000/api/topics');
        setTopics(response.data.topics);
      } catch (err) {
        setError('Failed to fetch topics');
        console.error('Error fetching topics:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const getTopicIdByName = (name: string): number | undefined => {
    const topic = topics.find(t => t.name.toLowerCase() === name.toLowerCase());
    return topic?.id;
  };

  return {
    topics,
    isLoading,
    error,
    getTopicIdByName
  };
} 