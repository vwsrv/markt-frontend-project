export type typeProductCardProps = {
    variant: string;
    saleName: string;
    saleValue: number;
    layout: string;
    type?: string;
    productData: {
        id: number;
        title?: string;
        subtitle?: string;
        price?: number;
        oldprice?: number;
        rating?: number;
        likes?: number;
    };
    cardVariant: 'default' | 'small';
};