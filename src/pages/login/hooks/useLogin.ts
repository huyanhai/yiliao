import { ref } from 'vue';

const type = ref('login');
const switchType = (val: string) => {
  type.value = val;
};

export const useLogin = () => {
  return {
    type,
    switchType,
  };
};
