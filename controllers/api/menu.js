const router = require('express').Router();
const { json } = require('sequelize');
const sequelize = require('../../config/connection');
const PizzaToppings = require('../../models/PizzaToppings');
const { Categories, MenuItems, Modifiers  } = require('../../models');


/***** READ ******/
// Route to retireve all Menu Items & Categories
// GET method with endpoint '/api/menu'
router.get('/', async (req, res) => {
    try {
        const menu = await MenuItems.findAll();
        const items = menu.map((item) => item.get({ plain: true }));

        const cats = await Categories.findAll();
        const categories = cats.map((cat) => cat.get({ plain: true }));

        const menuObject = {
            Pizzas: [],
            Calzones: [],
            Strombolies: [], 
            Appetizers: [],
            Salads: [],
            Entrees: [],
            Pastas: [],
            Salads: [],
            HotSubs: [],
            ColdSubs: [],
            SideOrders: [],
            Desserts: [],
            Beverages: [],
            NY_Speacialies: []
        };

        for (let i = 0; i < items.length; i++) {
            if (items[i].categoryId == 1) {
                menuObject.Pizzas.push(items[i]);
            }
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].categoryId == 2) {
                menuObject.Calzones.push(items[i]);
            }
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].categoryId == 3) {
                menuObject.Strombolies.push(items[i]);
            }
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].categoryId == 4) {
                menuObject.Appetizers.push(items[i]);
            }
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].categoryId == 5) {
                menuObject.Salads.push(items[i]);
            }
        }
        
        for (let i = 0; i < items.length; i++) {
            if (items[i].categoryId == 6) {
                menuObject.Entrees.push(items[i]);
            }
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].categoryId == 7) {
                menuObject.Pastas.push(items[i]);
            }
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].categoryId == 8) {
                menuObject.HotSubs.push(items[i]);
            }
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].categoryId == 9) {
                menuObject.ColdSubs.push(items[i]);
            }
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].categoryId == 10) {
                menuObject.SideOrders.push(items[i]);
            }
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].categoryId == 11) {
                menuObject.Desserts.push(items[i]);
            }
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].categoryId == 12) {
                menuObject.Beverages.push(items[i]);
            }
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].categoryId == 13) {
                menuObject.NY_Speacialies.push(items[i]);
            }
        }

        res.render('menu', {
           items, categories, menuObject
        });
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// Route to get Categories
// GET route with endpoint '/api/menu/categories'
router.get('/categories', async (req, res) => {
    try {
        const menuItem = await Categories.findAll({
            include: [{ model: Modifiers }],
            attributes: {
                exclude: ['id'],
            }
        });
        res.status(200).json(menuItem);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// Route to retireve a single Menu Item
// GET method with endpoint '/api/menu/:menuItemId'
router.get('/:menuItemId', async (req, res) => {
    try {

        // const menuItem = await MenuItems.findByPk(req.params.menuItemId, {
        //     attributes: {
        //         exclude: ['id', 'createdAt', 'updatedAt', 'categoryId', 'employeeId', 'menuItemIds']
        //     }
        // });

        const menuItem = await MenuItems.findByPk(req.params.menuItemId);
        const pizzaToppings = await PizzaToppings.findAll();
        const topping = pizzaToppings.map((top) => top.get({ plain: true }));

        //const item = menuItem.map((x) => x.get({ plain: true }));
        //const item = menuItem => menuItem.get({plain: true})
        //console.log(json.item);

        const item = menuItem.get({plain: true});

        // const menuItem = await MenuItems.findByPk(req.params.menuItemId, {
        //     // Working to view the modifiers when viewing one menu item

        //     // include: [
        //     //     [
        //     //         sequelize.literal(`SELECT menuitems.*, modifiers.*
        //     //         FROM menuitems
        //     //         LEFT OUTER JOIN modifiers ON menuitems.id = modifiers.categoryId
        //     //         WHERE menuitems.id = ${req.params.menuItemId};`),
        //     //         'modifiers'
        //     //     ]
        //     // ],
            
        //     attributes: {
        //         exclude: ['id', 'createdAt', 'updatedAt', 'categoryId', 'employeeId', 'menuItemIds']
        //     }
        // });

        //res.status(200).json(menuItem);
        //res.status(200).json(topping);
        
        res.render('product-quick-view', {
            item,
            topping
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

/***** CREATE ******/
// Route to create new Menu Item
// GET method with endpoint '/api/menu/newitem'
router.post('/newitem', async (req, res) => {
    try {
        const newMenuItem = await MenuItems.create({
            categoryId: req.body.categoryId,
            employeeId: req.body.employeeId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        });
        res.status(201).json(newMenuItem);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// Route to create new Category
// GET method with endpoint '/api/menu/newcategory'
router.post('/newcategory', async (req, res) => {
    try {
        const newCategory = await Categories.create({
            name: req.body.name
        });
        res.status(201).json(newCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

/***** UPDATE ******/
// Route to update new Menu Item
// GET method with endpoint '/api/menu/updateMenuItem/:menuItemId'
router.put('/updateMenuItem/:menuItemId', async (req, res) => {
    try {
        const updatedMenuItem = await MenuItems.update(req.body, {
            where: {
                id: req.params.menuItemId
            },
        });
        console.log(updatedMenuItem);
        if (!updatedMenuItem[0]) return res.status(404).json({ message: 'No menu item found.' }); // 404 - Not Found
        res.status(202).json(updatedMenuItem);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// Route to update new Category
// GET method with endpoint '/api/menu/updateCategory/:categoryId'
router.put('/updateCategory/:categoryId', async (req, res) => {
    try {
        const updatedCategory = await Categories.update(req.body, {
            where: {
                id: req.params.categoryId
            },
        });
        console.log(updatedCategory);
        if (!updatedCategory[0]) return res.status(404).json({ message: 'No category found.' }); // 404 - Not Found
        res.status(202).json(updatedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

/***** DELETE ******/
// Route to delete Menu Item
// GET method with endpoint '/api/menu/deleteMenuItem/:menuItemId'
router.delete('/deleteMenuItem/:menuItemId', async (req, res) => {
    try {
        const deletedMenuItem = await MenuItems.destroy({
            where: {
                id: req.params.menuItemId
            },
        });
        console.log(deletedMenuItem);
        if (!deletedMenuItem) return res.status(404).json({ message: 'No menu item found.' }); // 404 - Not Found
        res.status(202).json(deletedMenuItem);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// Route to delete Menu Item
// GET method with endpoint '/api/menu/deleteCategory/:categoryId'
router.delete('/deleteCategory/:categoryId', async (req, res) => {
    try {
        const deletedCategory = await Categories.destroy({
            where: {
                id: req.params.categoryId
            },
        });
        console.log(deletedCategory);
        if (!deletedCategory) return res.status(404).json({ message: 'No category found.' }); // 404 - Not Found
        res.status(202).json(deletedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

module.exports = router;