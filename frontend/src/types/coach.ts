export interface Coach {
  id: string;
  name: string;
  gender: 'female' | 'male';
  description: string;
  avatarModel: string;
  personality: string;
  voice: string;
  greeting: string;
}
