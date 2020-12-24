/* eslint-disable no-undef */
import ProductItem from "../../src/components/ProductItem";
import {createLocalVue, mount, router-linkStub} from "@vue/test-utils";
import { BootstrapVue} from "bootstrap-vue";
import Vuex from 'vuex';


describe("ProductItem", () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store({
        mutations: {
            'ADD_TO_CART': jest.fn()
        },
        actions : {
            'setSnacks' : jest.fn()
        }
    });

    localVue.use(BootstrapVue);


    const wrapper = mount(ProductItem, {
        propsData: {
            productItem: {
                id: 1,
                image: 'image',
                name: 'name',
                price: 100
            }
        },
        stubs: {
            'router-link': router-linkStub
        },
        store,
        localVue
    });

    it("it should parse data when component is rendered", () => {
        expect(wrapper.find('.name').text()).toBe('name');
        expect(wrapper.find('.price').text()).toBe("100₺");
        expect(wrapper.find('img').attributes('src')).toBe('image');
    });

    it("it should add to cart when click the button", () => {
        const basketButton = wrapper.find('button');
        basketButton.trigger('click');
        wrapper.vm.ADD_TO_CART = jest.fn();
        wrapper.vm.$store.dispatch = jest.fn();
        wrapper.vm.addToBasket();
        expect(wrapper.vm.$store.dispatch).toBeCalledWith("setSnacks", {
            showing: true,
            text: "Product added to cart successfully!",
            color: "success"
        })

    })
});