/* eslint-disable no-undef */
import BasketList from "../../src/components/BasketList";
import BasketItem from "../../src/components/BasketItem";
import {createLocalVue, mount, router-linkStub, shallowMount} from "@vue/test-utils";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {BIcon, BootstrapVue} from "bootstrap-vue";
import Vuex from "vuex";

describe('BasketList', () => {
    const mockAxios = new MockAdapter(axios);
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    localVue.use(Vuex);

    it('it should render basket list when length is zero',  () => {
        const store = new Vuex.Store({
            actions: {
                'setSnacks': jest.fn()
            }
        });
        const wrapper = shallowMount(BasketList, {
            computed: {
                mycartList: () => [],
                snackbar: () => []
            },
            propsData: {
                value: 0
            },
            components: {
                BasketItem
            },
            stubs: {
                'router-link': router-linkStub
            },
            store,
            localVue
        });

        expect(wrapper.find('.bucket-message').text()).toBe("Your Bucket Is Empty!");
        wrapper.destroy();
    });
    it('it should render basket list when length is more than zero',  () => {
        const store = new Vuex.Store({
            actions: {
                'setSnacks': jest.fn()
            }
        });
        const wrapper = shallowMount(BasketList, {
            computed: {
                mycartList: () => [{
                    id : 0,
                    name : 'name1'
                }, {
                    id: 1,
                    name : 'name2'
                }],
                snackbar: () => []
            },
            propsData: {
                value: 2
            },
            components: {
                BasketItem
            },
            stubs: {
                'router-link': router-linkStub,
                'b-icon' : BIcon
            },
            store,
            localVue
        });

        expect(wrapper.find(BasketItem)).toBeTruthy();
        wrapper.destroy()

    });
    it('it should submit order when click the submit button', async () => {
        const store = new Vuex.Store({
            actions: {
                'setSnacks': jest.fn(),
                'clearCartItems' : jest.fn()
            }
        });
        const wrapper = mount(BasketList, {
            attachToDocument: true,
            computed: {
                mycartList: () => [{
                    id : 0,
                    name : 'name1'
                }, {
                    id: 1,
                    name : 'name2'
                }],
                snackbar: () => []
            },
            propsData: {
                value: 2,
                snackMessage : {
                    showing: true,
                    text: "message",
                    color: "success"
                }
            },
            components: {
                BasketItem
            },
            stubs: {
                'router-link': router-linkStub,
                'b-icon' : BIcon
            },
            store,
            localVue
        });
        const submitButton = wrapper.find('.order-button');
        submitButton.trigger('click');
        mockAxios.onPost().replyOnce(200, {message : 'message'});
        wrapper.vm.$store.dispatch = jest.fn();
        await wrapper.vm.submitOrder();

         expect(wrapper.vm.$store.dispatch).toHaveBeenCalled();
        wrapper.destroy();
    });
    it('it should not submit order when out of stock', async () => {
        const store = new Vuex.Store({
            actions: {
                'setSnacks': jest.fn(),
                'clearCartItems' : jest.fn()
            }
        });
        const wrapper = shallowMount(BasketList, {
            computed: {
                mycartList: () => [{
                    id : 0,
                    name : 'name1'
                }, {
                    id: 1,
                    name : 'name2'
                }],
                snackbar: () => []
            },
            propsData: {
                value: 2,
                snackMessage : {
                    showing: true,
                    text: "Dis Fircasi is out of stock!",
                    color: "danger"
                }
            },
            components: {
                BasketItem
            },
            stubs: {
                'router-link': router-linkStub,
                'b-icon' : BIcon
            },
            store,
            localVue
        });
        const submitButton = wrapper.find('.order-button');
        submitButton.trigger('click');
        wrapper.vm.$store.dispatch = jest.fn();
        mockAxios.onPost().reply(500);
        await wrapper.vm.submitOrder();
        expect(wrapper.vm.$store.dispatch).toHaveBeenCalled()
        wrapper.destroy();
    })
    it('it should clear cart items when click button', async () => {
        const store = new Vuex.Store({
            actions: {
                'setSnacks': jest.fn(),
                'clearCartItems' : jest.fn()
            }
        });
        const wrapper = shallowMount(BasketList, {
            computed: {
                mycartList: () => [{
                    id : 0,
                    name : 'name1'
                }, {
                    id: 1,
                    name : 'name2'
                }],
                snackbar: () => []
            },
            propsData: {
                value: 2
            },
            components: {
                BasketItem
            },
            stubs: {
                'router-link': router-linkStub,
                'b-icon' : BIcon
            },
            store,
            localVue
        });
        const submitButton = wrapper.find('.clear-button');
        submitButton.trigger('click');
        wrapper.vm.$store.dispatch = jest.fn();
        wrapper.vm.clearAll();
        expect(wrapper.vm.$store.dispatch).toBeCalledWith('clearCartItems');
        wrapper.destroy();
    })

});