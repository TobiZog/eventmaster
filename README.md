# HackMyCart

The most hackable Web Shop!

## How to use

### Prepare development environment

1. Install node.js

```bash
sudo apt install npm

# If outdated version:
sudo npm install -g n
sudo n stable
```

2. Download + extract the project
3. Open the root folder with VS Code (recommended)
4. Open the bash inside VS Code, navigate to the `software/` folder and install all necessary packages:

```bash
npm i
```

### Test/development

There are multiple commands to test parts or the whole project:

- `npm run dev`: Starts the Vue frontend only
- `npm run server`: Starts the ExpressJs backend only
- `npm run serve`: Starts front- and backend

The frontend runs on `http://localhost:5173/` and the backend on `http://localhost:3000/`

### Compile for production

TODO

## Structure

### Database
![database-erm](misc/images/database.png)


### Backend API endpoints

The application host it's data in a SQLite database. The access is managed by an [ExpressJs](https://expressjs.com/) server which offers many REST-API endpoints for the frontend. The REST-API server runs on port 3000.

---

#### Validate

<details>
<summary><code style="background-color:#69CA92"><b>POST</b></code> <code><b>/accounts/login</b></code> <code> (Login for user)</code></summary>

##### Parameters
> | name | type | data type | description |
> | --- | --- | --- | --- |
> | username |  required | string   | Username of the account  |
> | password |  required | string   | Password of the account  |

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `200` | `application/json` | `AccountObject` + `Addresses`, `Payments`, `AccountRole`  |
> | `400` | `application/json` | `{code: 400, message: "Bad Request"}` |
> | `401` | `application/json` | `{code: 401, message: "Unauthorized"}` |
</details>

---

#### Listing existing

<details>
<summary><code style="background-color:#70AFFD"><b>GET</b></code> <code><b>/products/</b></code> <code> (Get all products)</code>
</summary>

##### Parameters
> None

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `200` | `application/json` | `Array<ProductModel>` + `Category`, `Brand`  |
</details>

<details>
<summary><code style="background-color:#70AFFD"><b>GET</b></code> <code><b>/products/:id</b></code> <code> (Get a product by it's id)</code>
</summary>

##### Parameters
> | name | type | data type | description |
> | :---: | --- | --- | --- |
> | `id` |  required | string   | ID of product in the database  |

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `200` | `application/json` | `ProductModel` + `Category`, `Brand`  |
</details>

<details>
<summary><code style="background-color:#70AFFD"><b>GET</b></code> <code><b>/orders/:id</b></code> <code> (Get all orders of an user)</code>
</summary>

##### Parameters
> | name | type | data type | description |
> | --- | --- | --- | --- |
> | `id` |  required | string   | ID of userAccount in the database  |

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `200` | `application/json` | `ProductModel` + `Order`, `OrderItem`, `Product`  |
</details>

<details>
<summary><code style="background-color:#70AFFD"><b>GET</b></code> <code><b>/categories/</b></code> <code> (Get all Categories)</code>
</summary>

##### Parameters
> None

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `200` | `application/json` | `Array<Categories>` |
</details>

---

#### Creating new

<details>
<summary><code style="background-color:#69CA92"><b>POST</b></code> <code><b>/accounts/</b></code> <code> (Create a new account)</code>
</summary>

##### Parameters
> | name | type | data type | description |
> | :---: | --- | --- | --- |
> | None |  required | object (JSON) | Model of an Account |

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `201` | `application/json` | `AccountModel`  |
> | `400` | `application/json` | `{code: 400, message: "Username too short!"}` |
> | `400` | `application/json` | `{code: 400, message: "Password too short!"}` |
> | `409` | `application/json` | `{code: 409, message: "Username already in use"}` |
</details>


<details>
<summary><code style="background-color:#69CA92"><b>POST</b></code> <code><b>/products/</b></code> <code> (Create a new product)</code>
</summary>

##### Parameters
> | name | type | data type | description |
> | :---: | --- | --- | --- |
> | None |  required | object (JSON) | Model of a Product |

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `201` | `application/json` | `ProductModel`  |
> | `400` | `application/json` | `{code: 400, message: "..."}` |
</details>


<details>
<summary><code style="background-color:#69CA92"><b>POST</b></code> <code><b>/orders/</b></code> <code> (Create a new order)</code>
</summary>

##### Parameters
> | name | type | data type | description |
> | :---: | --- | --- | --- |
> | None |  required | object (JSON) | Model of an Order |

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `201` | `application/json` | `OrderModel`  |
</details>


<details>
<summary><code style="background-color:#69CA92"><b>POST</b></code> <code><b>/categories/</b></code> <code> (Create a new category)</code>
</summary>

##### Parameters
> | name | type | data type | description |
> | :---: | --- | --- | --- |
> | None |  required | object (JSON) | Model of a Category |

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `201` | `application/json` | `OrderModel`  |
> | `400` | `application/json` | `{code: 400, message: "..."}` |
</details>

---

#### Updating existing

<details>
<summary><code style="background-color:#F3A63D"><b>PATCH</b></code> <code><b>/accounts/</b></code> <code> (Update data of an existing account)</code>
</summary>

##### Parameters
> | name | type | data type | description |
> | :---: | --- | --- | --- |
> | None |  required | object (JSON) | Model of an Account |

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `200` | `application/json` | AccountModel  |
> | `400` | `application/json` | `{code: 400, message: "..."}` |
</details>

---

#### Delete existing

<details>
<summary><code style="background-color:#EB5246"><b>DELETE</b></code> <code><b>/product/:id</b></code> <code> (Delete a product)</code>
</summary>

##### Parameters
> | name | type | data type | description |
> | :---: | --- | --- | --- |
> | `id` |  required | string | ID of product in the database |

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `200` | `application/json` | `ProductModel`  |
> | `400` | `application/json` | `{code: 400, message: "..."}` |
</details>

<details>
<summary><code style="background-color:#EB5246"><b>DELETE</b></code> <code><b>/categories/:id</b></code> <code> (Delete a category)</code>
</summary>

##### Parameters
> | name | type | data type | description |
> | :---: | --- | --- | --- |
> | `id` |  required | string | ID of category in the database |

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `200` | `application/json` | `CategoryModel`  |
> | `400` | `application/json` | `{code: 400, message: "..."}` |
</details>

---

#### Miscs

<details>
<summary><code style="background-color:#70AFFD"><b>GET</b></code> <code><b>/api/</b></code> <code> (Check if server runs)</code>
</summary>

##### Parameters
> None

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `200` | None | None |
</details>

<details>
<summary><code style="background-color:#70AFFD"><b>GET</b></code> <code><b>/resetDatabase/</b></code> <code> (Reset the database to it's default values)</code>
</summary>

##### Parameters
> None

##### Responses
> | http code | content-type | response |
> | :---: | --- | --- |
> | `200` | None | None |
</details>