import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

import {
    Container,
    Product,
    ProductImage,
    ProductTitle,
    ProductPrice,
    AddButton,
    ProductAmount,
    ProductAmountText,
    AddButtonText,
    Back,
    Category,
    CategoryImage,
    CategoryTitle,
} from './styles';

class Home extends Component {
    state = {
        products: [],
        category: [
            {
                id: 1,
                title: 'Masculino',
                image:
                    'https://static.netshoes.com.br/bnn/l_netshoes/2019-01-31/4414_Masculino.jpg',
            },
            {
                id: 2,
                title: 'Feminino',
                image:
                    'https://static.netshoes.com.br/bnn/l_netshoes/2019-01-31/5889_Feminino.jpg',
            },
            {
                id: 3,
                title: 'Infantil',
                image:
                    'https://static.netshoes.com.br/bnn/l_netshoes/2019-01-31/4042_Infantil.jpg',
            },
            {
                id: 4,
                title: 'Calçados',
                image:
                    'https://static.netshoes.com.br/bnn/l_netshoes/2019-02-01/3449_Calcados.jpg',
            },
            {
                id: 5,
                title: 'Roupas',
                image:
                    'https://static.netshoes.com.br/bnn/l_netshoes/2019-06-06/2400_Roupas.png',
            },
            {
                id: 7,
                title: 'Promoções',
                image:
                    'https://static.netshoes.com.br/bnn/l_netshoes_staging/2019-03-21/4875_promocoes.jpg',
            },
            {
                id: 8,
                title: 'Suplementos',
                image:
                    'https://static.netshoes.com.br/bnn/l_netshoes/2019-01-31/6648_Suplementos.jpg',
            },
        ],
    };

    componentDidMount() {
        this.getProducts();
    }

    getProducts = async () => {
        const response = await api.get('/products');

        const data = response.data.map(product => ({
            ...product,
            priceFormatted: formatPrice(product.price),
        }));

        this.setState({ products: data });
    };

    handleAddProduct = item => {
        const { addToCart } = this.props; // dispara as actions do redux
        addToCart(item);
    };

    renderProduct = ({ item }) => {
        const { amount } = this.props;
        return (
            <Product key={item.id}>
                <ProductImage source={{ uri: item.image }} />
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPrice>{formatPrice(item.price)}</ProductPrice>
                <AddButton onPress={() => this.handleAddProduct(item)}>
                    <ProductAmount>
                        <Icon name="add-shopping-cart" color="#FFF" size={20} />
                        <ProductAmountText>
                            {amount[item.id] || 0}
                        </ProductAmountText>
                    </ProductAmount>
                    <AddButtonText>ADICIONAR</AddButtonText>
                </AddButton>
            </Product>
        );
    };

    renderCategory = ({ item }) => {
        return (
            <Category key={item.id}>
                <CategoryImage source={{ uri: item.image }} />
                <CategoryTitle>{item.title}</CategoryTitle>
            </Category>
        );
    };

    render() {
        const { products, category } = this.state;
        return (
            <>
                <Back />
                <Container>
                    <FlatList
                        horizontal
                        data={category}
                        keyExtractor={item => String(item.id)}
                        renderItem={this.renderCategory}
                    />
                    <FlatList
                        horizontal
                        data={products}
                        extraData={this.props}
                        keyExtractor={item => String(item.id)}
                        renderItem={this.renderProduct}
                    />
                </Container>
            </>
        );
    }
}
const mapStateToProps = state => ({
    amount: state.cart.reduce((amount, product) => {
        amount[product.id] = product.amount;
        return amount;
    }, {}),
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
