export type typeProductCardListProps = {
    variant: string;
    saleName: string;
    saleValue: number;
    layout: string;
    type: string;
    goodsData: Array<{
        id: number;
        title?: string;
        subtitle?: string;
        price?: number;
        oldprice?: number;
        rating?: number;
        likes?: number;
    }>;
    style: 'default' | 'ten';
};
