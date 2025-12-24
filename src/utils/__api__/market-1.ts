// MOCK API DATA FOR MARKET-1

const api = {
    getMainCarousel: async () => {
        return [
            {
                id: 1,
                title: "50% Off For Your First Shopping",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                buttonText: "Shop Now",
                imgUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
            },
            {
                id: 2,
                title: "Summer Collection 2024",
                description: "Discover the latest trends in fashion and accessories",
                buttonText: "Explore Now",
                imgUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200"
            },
            {
                id: 3,
                title: "New Arrivals",
                description: "Check out our newest products and exclusive deals",
                buttonText: "View Collection",
                imgUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200"
            }
        ]
    },

    getFlashDeals: async () => {
        return [
            {
                id: 1,
                slug: "flash-deal-1",
                title: "Smart Watch Series 7",
                price: 299,
                thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
                discount: 20,
                rating: 4.5
            },
            {
                id: 2,
                slug: "flash-deal-2",
                title: "Wireless Headphones",
                price: 149,
                thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
                discount: 30,
                rating: 4.8
            },
            {
                id: 3,
                slug: "flash-deal-3",
                title: "Laptop Backpack",
                price: 79,
                thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
                discount: 15,
                rating: 4.3
            },
            {
                id: 4,
                slug: "flash-deal-4",
                title: "Running Shoes",
                price: 120,
                thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
                discount: 25,
                rating: 4.6
            },
            {
                id: 5,
                slug: "flash-deal-5",
                title: "Sunglasses",
                price: 89,
                thumbnail: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
                discount: 40,
                rating: 4.4
            }
        ]
    },

    getTopCategories: async () => {
        return [
            {
                id: 1,
                name: "Electronics",
                slug: "electronics",
                description: "Latest gadgets and devices",
                image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400"
            },
            {
                id: 2,
                name: "Fashion",
                slug: "fashion",
                description: "Trending styles and apparel",
                image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400"
            },
            {
                id: 3,
                name: "Home & Living",
                slug: "home-living",
                description: "Furniture and decor",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
            },
            {
                id: 4,
                name: "Sports",
                slug: "sports",
                description: "Fitness and outdoor gear",
                image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400"
            }
        ]
    },

    getTopRatedBrand: async () => {
        return [
            {
                id: 1,
                name: "Apple",
                slug: "apple",
                image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400"
            },
            {
                id: 2,
                name: "Nike",
                slug: "nike",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
            },
            {
                id: 3,
                name: "Samsung",
                slug: "samsung",
                image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
            },
            {
                id: 4,
                name: "Adidas",
                slug: "adidas",
                image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400"
            }
        ]
    },

    getTopRatedProduct: async () => {
        return [
            {
                id: 1,
                title: "iPhone 14 Pro",
                slug: "iphone-14-pro",
                price: 999,
                thumbnail: "https://images.unsplash.com/photo-1678652512576-290b850cee0c?w=400",
                rating: 4.9,
                reviews: [1, 2, 3, 4, 5]
            },
            {
                id: 2,
                title: "MacBook Pro M2",
                slug: "macbook-pro-m2",
                price: 1999,
                thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
                rating: 4.8,
                reviews: [1, 2, 3, 4]
            },
            {
                id: 3,
                title: "AirPods Pro",
                slug: "airpods-pro",
                price: 249,
                thumbnail: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400",
                rating: 4.7,
                reviews: [1, 2, 3]
            },
            {
                id: 4,
                title: "iPad Air",
                slug: "ipad-air",
                price: 599,
                thumbnail: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
                rating: 4.6,
                reviews: [1, 2]
            }
        ]
    },

    getNewArrivalList: async () => {
        return [
            {
                id: 1,
                title: "Gaming Mouse",
                slug: "gaming-mouse",
                price: 59,
                thumbnail: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400"
            },
            {
                id: 2,
                title: "Mechanical Keyboard",
                slug: "mechanical-keyboard",
                price: 129,
                thumbnail: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400"
            },
            {
                id: 3,
                title: "Webcam HD",
                slug: "webcam-hd",
                price: 79,
                thumbnail: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400"
            },
            {
                id: 4,
                title: "USB-C Hub",
                slug: "usb-c-hub",
                price: 49,
                thumbnail: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400"
            },
            {
                id: 5,
                title: "Desk Lamp",
                slug: "desk-lamp",
                price: 39,
                thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"
            },
            {
                id: 6,
                title: "Phone Stand",
                slug: "phone-stand",
                price: 25,
                thumbnail: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400"
            }
        ]
    },

    getBigDiscountList: async () => {
        return [
            {
                id: 1,
                title: "Laptop Stand",
                slug: "laptop-stand",
                price: 45,
                thumbnail: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
                discount: 50
            },
            {
                id: 2,
                title: "Portable SSD",
                slug: "portable-ssd",
                price: 149,
                thumbnail: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400",
                discount: 45
            },
            {
                id: 3,
                title: "Bluetooth Speaker",
                slug: "bluetooth-speaker",
                price: 89,
                thumbnail: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
                discount: 40
            },
            {
                id: 4,
                title: "Fitness Tracker",
                slug: "fitness-tracker",
                price: 99,
                thumbnail: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
                discount: 35
            }
        ]
    },

    getCarBrandList: async () => {
        return [
            {
                id: 1,
                title: "Tesla",
                slug: "tesla",
                image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400"
            },
            {
                id: 2,
                title: "BMW",
                slug: "bmw",
                image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400"
            },
            {
                id: 3,
                title: "Mercedes",
                slug: "mercedes",
                image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400"
            },
            {
                id: 4,
                title: "Audi",
                slug: "audi",
                image: "https://images.unsplash.com/photo-1610768764270-790fbec18178?w=400"
            }
        ]
    },

    getMobileBrandList: async () => {
        return [
            {
                id: 1,
                title: "iPhone",
                slug: "iphone",
                image: "https://images.unsplash.com/photo-1592286927505-c616c6efd452?w=400"
            },
            {
                id: 2,
                title: "Samsung Galaxy",
                slug: "samsung-galaxy",
                image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
            },
            {
                id: 3,
                title: "Google Pixel",
                slug: "google-pixel",
                image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400"
            },
            {
                id: 4,
                title: "OnePlus",
                slug: "oneplus",
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
            }
        ]
    },

    getOpticsBrandList: async () => {
        return [
            {
                id: 1,
                title: "Ray-Ban",
                slug: "ray-ban",
                image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400"
            },
            {
                id: 2,
                title: "Oakley",
                slug: "oakley",
                image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400"
            },
            {
                id: 3,
                title: "Persol",
                slug: "persol",
                image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=400"
            },
            {
                id: 4,
                title: "Gucci",
                slug: "gucci",
                image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400"
            }
        ]
    },

    getWatchBrandList: async () => {
        return [
            {
                id: 1,
                title: "Rolex",
                slug: "rolex",
                image: "https://images.unsplash.com/photo-1587836374228-4c97812d1efe?w=400"
            },
            {
                id: 2,
                title: "Apple Watch",
                slug: "apple-watch",
                image: "https://images.unsplash.com/photo-1434493907317-a46b5bbe7834?w=400"
            },
            {
                id: 3,
                title: "Omega",
                slug: "omega",
                image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400"
            },
            {
                id: 4,
                title: "TAG Heuer",
                slug: "tag-heuer",
                image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400"
            }
        ]
    },

    getCategories: async () => {
        return [
            {
                id: 1,
                name: "All Categories",
                slug: "all",
                icon: "Category"
            },
            {
                id: 2,
                name: "Electronics",
                slug: "electronics",
                icon: "Electronics"
            },
            {
                id: 3,
                name: "Fashion",
                slug: "fashion",
                icon: "Fashion"
            },
            {
                id: 4,
                name: "Home & Garden",
                slug: "home-garden",
                icon: "Home"
            },
            {
                id: 5,
                name: "Sports",
                slug: "sports",
                icon: "Sports"
            }
        ]
    },

    getMoreItems: async () => {
        return [
            {
                id: 1,
                title: "Gaming Laptop",
                slug: "gaming-laptop",
                price: 1499,
                thumbnail: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
                rating: 4.7,
                discount: 10
            },
            {
                id: 2,
                title: "4K Monitor",
                slug: "4k-monitor",
                price: 599,
                thumbnail: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
                rating: 4.6,
                discount: 15
            },
            {
                id: 3,
                title: "Ergonomic Chair",
                slug: "ergonomic-chair",
                price: 349,
                thumbnail: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400",
                rating: 4.8,
                discount: 20
            },
            {
                id: 4,
                title: "Desk Organizer",
                slug: "desk-organizer",
                price: 29,
                thumbnail: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400",
                rating: 4.5,
                discount: 5
            }
        ]
    }
}

export default api

