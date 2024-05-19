import MasterMessage from '../src/views/skeleton/master/MasterMessage.vue'
import { shallowMount, mount } from "@vue/test-utils"
import { setActivePinia, createPinia } from 'pinia'
import { pinia } from './setup';

describe("MasterMessage Component", () => {
    expect(pinia).toBeDefined();
    // beforeEach(() => {
    //     // creates a fresh pinia and makes it active
    //     // so it's automatically picked up by any useStore() call
    //     // without having to pass it to it: `useStore(pinia)`
    //     setActivePinia(createPinia())
    // })

    it('renders properly', () => {
        const wrapper = shallowMount(MasterMessage);
        expect(wrapper.exists()).toBe(true);
    });
})