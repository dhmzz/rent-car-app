import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useCommonAPI } from "@/stores/commonapi"
import JwtService from "@/core/services/JwtService";

export const URL_BASE_APP = `http://localhost:5125/`;
export const JWT_TOKEN = JwtService.getToken();
export const API = useCommonAPI();

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

export default { API }