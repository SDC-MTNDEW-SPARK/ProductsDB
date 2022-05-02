![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

# Atelier Products API

This is a node/express application that provides a REST API for the Atelier ecommerce frontend.

## Install

```
npm install
```

## Run the App

```
npm start
```

# API Endpoints

All Queries take parameters as Query strings unless it is in the endpoint\
All responses should return status code `200 OK`

### `GET /products`
Retrieve a list of products

#### Parameters
| Parameter | Type    | Description                                               |
|-----------|---------|-----------------------------------------------------------|
| page      | Integer | Selects the page of results to return. Default 1.         |
| count     | Integer | Specifies how many results per page to return. Default 5.|

#### Response
```json
[
    {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": 140
    },
    {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": 69
    },
    {
        "id": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": 40
    }
]
```

### `GET /products/:product_id`
Returns all product level information for a specified product id.

#### Parameters
| Parameter  | Type    | Description                                       |
|------------|---------|---------------------------------------------------|
| product_id | Integer | Required ID of the product for which data should be returned. |

#### Response
```json
{
    "id": 1,
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": 140,
    "features": [
        {
            "feature": "Buttons",
            "value": "Brass"
        },
        {
            "feature": "Fabric",
            "value": "Canvas"
        }
    ]
}
```

### `GET /products/:product_id/styles`
Returns the all styles available for the given product.

#### Parameters
| Parameter  | Type    | Description                                       |
|------------|---------|---------------------------------------------------|
| product_id | Integer | Required ID of the product for which data should be returned |

#### Response
```json
{
    "product_id": "1",
    "results": [
        {
            "style_id": 1,
            "name": "Forest Green & Black",
            "original_price": 140,
            "sale_price": null,
            "default?": true,
            "photos": [
                {
                    "url": "placeholder/image.jpg",
                    "thumbnail_url": "placeholder/image_thumbnail.jpg"
                },
                {
                    "url": "placeholder/image.jpg",
                    "thumbnail_url": "placeholder/image_thumbnail.jpg"
                }
            ],
            "skus": {
                "1": {
                    "quantity": 8,
                    "size": "XS"
                },
                "2": {
                    "quantity": 16,
                    "size": "S"
                }
            }
        },
        {
            "style_id": 2,
            "name": "Desert Brown & Tan",
            "original_price": 140,
            "sale_price": null,
            "default?": false,
            "photos": [
                {
                    "url": "placeholder/image.jpg",
                    "thumbnail_url": "placeholder/image_thumbnail.jpg"
                },
                {
                    "url": "placeholder/image.jpg",
                    "thumbnail_url": "placeholder/image_thumbnail.jpg"
                }
            ],
            "skus": {
                "7": {
                    "quantity": 16,
                    "size": "S"
                },
                "8": {
                    "quantity": 8,
                    "size": "XS"
                }
            }
        }
    ]
}
```

### `GET /products/:product_id/related`
Returns the id's of products related to the product specified.

#### Parameters
| Parameter  | Type    | Description                                       |
|------------|---------|---------------------------------------------------|
| product_id | Integer | Required ID of the product for which data should be returned |

#### Response
```json
[
  2,
  3,
  8,
  7
]
```
