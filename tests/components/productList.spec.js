/* eslint-disable no-undef */
import ProductList from "../../src/components/ProductList";
import ProductItem from "../../src/components/ProductItem";
import {createLocalVue, shallowMount} from "@vue/test-utils";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {BootstrapVue} from "bootstrap-vue";

describe('ProductList', () => {
    let wrapper;
    const mockAxios = new MockAdapter(axios);
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);

    beforeEach(() => {
        wrapper = shallowMount(ProductList, {
            propsData: {
                productList: [
                    {
                        id: 1,
                        image: 'image1',
                        name: 'name1',
                        price: 100
                    },
                    {
                        id: 2,
                        image: 'image2',
                        name: 'name2',
                        price: 200
                    }
                ]
            },
            components: {
                ProductItem
            },
            localVue
        })
    })

    it('it should render product list', async () => {
        const data = [
            {
                id: 1,
                image: 'image1',
                name: 'name1',
                price: 100
            },
            {
                id: 2,
                image: 'image2',
                name: 'name2',
                price: 200
            }
        ];

        const listingUri = "/listing";
        const url = new RegExp(`${listingUri}/*`);
        mockAxios.onGet(url).reply(200, data);

        expect(wrapper).toBeTruthy();
    })
});