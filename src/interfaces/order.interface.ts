export interface OrderItem {
    id:        string;
    quantity:  number;
    price:     number;
    size:      string;
    orderId:   string;
    productId: string;
    product:   ProductInOrder;
}

export interface ProductInOrder {
    id:          string;
    title:       string;
    description: string;
    inStock:     number;
    price:       number;
    sizes:       string[];
    slug:        string;
    tags:        string[];
    gender:      string;
    categoryId:  string;
    images:      Image[];
}

export interface Image {

    url:       string;
   
}


export interface OrderAdress {
    id:        string;
    name:      string;
    lastName:  string;
    address:   string;
    address2?:  string | null;
    zip:       string;
    city:      string;
    phone:     string;
    orderId:   string;
    countryId: string;
    country:   CountryOrder;
}

export interface CountryOrder {
    id:   string;
    name: string;
}

export interface Order{
    id: string;
    total: number;
    subtotal: number;
    tax: number;
    itemsInOrder: number;
    userId: string;
    isPaid: boolean;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    
 
  

}
