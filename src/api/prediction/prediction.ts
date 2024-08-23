import { axiosClient } from '../../lib/axios-client';

export const prediction = async (topicId: string = '') => {
  try {
    await axiosClient.post('/topic/prediction', {
      topicId: topicId
    });
  } catch (error) {
    throw error;
  }
};
