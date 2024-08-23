import { axiosClient } from '../../lib/axios-client';

export const deleteTopic = async (topicId: string = '') => {
  try {
    await axiosClient.delete('/topic/' + topicId);
  } catch (error) {}
};
